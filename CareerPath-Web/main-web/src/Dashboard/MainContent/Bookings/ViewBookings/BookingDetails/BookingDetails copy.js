import React, { useEffect, useState } from 'react';
import Colors from '../../../../../Colors/Colors';
import Ratings from '../../../../../Rating/Ratings';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import Loader from "react-loader-spinner";
import './BookingDetails.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const BookingDetails = (props) => {
    const [value, setValue] = useState(null);
    const [timeSlot, setTimeSlot] = useState(null)
    const [slots, setSlots] = useState([])
    const [bookingDetails, setBookingDetails] = useState([])
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [decline, setDecline] = useState(false)
    const [cancelled, setCancelled] = useState(false)
    const [status, setStatus] = useState(null)
    const [status2, setStatus2] = useState(null)
    const [calender, setCalender] = useState(true)
    const navigate = useNavigate()
    console.log(props.user.User?.type, "props.user from booking Details")
    const toggleDecline = () => {
        setDecline(!decline)
    }

    const toggleCancel = () => {
        setCancelled(!cancelled)
    }
    const { id } = useParams()
    console.log(id, "i am parqams")


    const getBooking = () => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/bookings/${id}`).then(response => {
            console.log(response.data, "dataaaaa for majid")
            console.log(response.data.User?.id, "dataaaaa")
            setLoading(false)
            setUser(response.data.User)
            setStatus2(response.data.status)
            console.log(response.data.status, "response.data.status")
            setBookingDetails(response.data)
            console.log(moment(response.data.booking_time * 1000).format("MMM,DD YYYY"))
            console.log(moment(response.data.booking_time * 1000).format("hh:mm A"))

            // axios.get(`${process.env.REACT_APP_SERVER_PATH}/customers/${response.data.User?.id}`).then(response => {
            //     console.log(response.data, ">>>>>>data")
            // })
        })
    }

    if (decline) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    if (cancelled) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const combineDateAndTime = function (date, time12h) {
        const [time, modifier] = time12h.split(' ');

        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }

        let finalDate = new Date(date);

        let timeString = hours + ':' + minutes + ':00';

        let year = finalDate.getFullYear();
        let month = finalDate.getMonth() + 1; // Jan is 0, dec is 11
        let day = finalDate.getDate();
        let dateString = '' + year + '-' + month + '-' + day;
        let combined = new Date(dateString + ' ' + timeString);
        return (combined.getTime()) / 1000;
    };

    const ChangeStatus = (status) => {
        axios.post(`${process.env.REACT_APP_SERVER_PATH}/bookings/${id}/update_status`, { status: status }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response.data, ">>>>>>>>>>>>>>>>")
            setStatus(response.data.message.status)
            console.log('Status Changed Successfully')
            setCalender(true)
            getBooking()
        })
    }



    const ChangeStatusReschedule = (status) => {
        console.log(combineDateAndTime(value, timeSlot), "date isssss")
        axios.post(`${process.env.REACT_APP_SERVER_PATH}/bookings/${id}/update_status`, {
            status: status,
            data: moment(
                moment(combineDateAndTime(value, timeSlot) * 1000),
                'YYYY-MM-DD hh:mm A',
            ).unix()
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response.data, ">>>>>>>>>>>>>>>>")
            setStatus(response.data.message.status)
            console.log('Status Changed Successfully')
            setCalender(true)
            getBooking()
        })
    }
    const makeDic = async (available_slots, month, e) => {
        let dictionary = {}
        let value = e
        for (const time of available_slots) {
            const dateTime = moment(time * 1000);
            if (dateTime.month() === month - 1) {
                const time = dateTime.format('LT');
                const date = dateTime.format('DD-MM-YYYY');
                if (dictionary[date]) dictionary[date].push(time);
                else dictionary[date] = [time];
            }
        }
        console.log(dictionary);
        for (let i in dictionary) {
            // console.log('i is from',i);
            // console.log(dictionary[i.toString()]);
            // console.log(i, `${value.getDate().toString()}-${(value.getMonth() + 1).toString()}-${value.getFullYear().toString()}`);
            if (value !== undefined) {
                if (i === `${moment(value).format('DD').toString()}-${moment(value).format('MM').toString()}-${value.getFullYear().toString()}`) {
                    console.log(i);
                    console.log(`${value.getDate().toString()}-${(value.getMonth() + 1).toString()}-${value.getFullYear().toString()}`);
                    setSlots(dictionary[i])
                }
            }
        }
    }

    const getSlots = (month, year, e) => {
        let token = localStorage.getItem('token')
        let duration = bookingDetails.session_duration
        token = JSON.parse(token)

        axios.get(`${process.env.REACT_APP_SERVER_PATH}/professionals/${bookingDetails.professional_id}/available_slots?month=${month}&year=${year}&slot_duration=${duration}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(result => {
                if (
                    result &&
                    result.data &&
                    result.data.message &&
                    result.data.message.availableSlots
                ) {
                    makeDic(result.data.message.availableSlots, month, e);

                }

                //  setSlots(result.data.message.availableSlots)

            })
            .catch(err => {
                console.log('err', err)
            })

    }

    const handleTimeSlot = (timeSlot) => {
        setTimeSlot(timeSlot)
    }

    const goTo = () => {
        ChangeStatusReschedule('request-reschedule')
    }
    const setDate = (e) => {
        console.log(e)
        setValue(e)
        console.log(e, 'monitor');
        let month = e.getMonth() + 1
        let year = e.getFullYear()
        getSlots(month, year, e)
        console.log(month, year);

    }
    const Reschedule = () => {
        setCalender(!calender)
    }

    useEffect(() => {
        getBooking()
    }, [])
    return (
        <div>
            {cancelled && (
                <CancelReasonBox
                    toggle={toggleCancel}
                    overlay="overlay"
                    modal="modal"
                    modalcontent="modal-content"
                    closeModal="close-modal"
                    modalValue={decline}
                    ChangeStatus={ChangeStatus} />
            )}
            {decline && (
                <DeclinedReasonBox
                    toggle={toggleDecline}
                    overlay="overlay"
                    modal="modal"
                    modalcontent="modal-content"
                    closeModal="close-modal"
                    modalValue={decline}
                    ChangeStatus={ChangeStatus} />
            )}
            <div className="bg-white rounded pb-4">
                <div className='flex py-4 rounded-t items-center justify-between text-white text-xl w-full px-4' style={{ backgroundColor: Colors.blue }}>
                    <div className='cursor-pointer'>
                        <span onClick={() => { navigate(-1) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </span>
                    </div>
                    <div className="w-5/6 flex items-center justify-center">
                        <p>Booking Details</p>
                    </div>
                    <div className='dropdown'>
                        <span className="dropbtn">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </span>
                        <div className="dropdown-content rounded-lg">
                            {status !== 'cancelled' && status2 !== 'cancelled' && <div className='text-sm hover:bg-gray-300 flex w-full items-center p-2 text-red-700' onClick={toggleCancel}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </span>
                                <p className='ml-6'>Cancel</p>
                            </div>}
                            <div className='text-sm  hover:bg-gray-300 flex w-full items-center p-2 text-black'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                <p className='ml-6'>Help</p>
                            </div>
                        </div>

                    </div>
                </div>


                {calender ? <div>
                    {isLoading ? <div className='w-full flex mt-8 items-center justify-center'>
                        <Loader
                            type="TailSpin"
                            color={Colors.blue}
                            height={200}
                            width={200}
                        // timeout={5000} //5 secs
                        />
                    </div> : bookingDetails.status === 'approved' ?
                        <div className='p-4'>
                            {/* Professional Booking Details */}
                            <div className='mt-4 flex'>
                                <img src={props.user.User?.type === 'professional' ? bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png' :
                                    bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                <div className='flex flex-col'>
                                    {props.user.User?.type === 'professional' ? <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>
                                        {`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name} Requested a call of ${bookingDetails.session_duration}  min`} </p> :
                                         <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>
                                        {`You have Requested a ${bookingDetails.session_duration} minutes session`} </p>}
                                    <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                </div>
                            </div>

                            <div className='ml-14 mt-4 SShadow p-6 rounded-xl w-96'>
                                <div className='flex'>
                                    <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                    <div className='flex flex-col ml-4'>
                                        <p className='font-bold text-lg text-gray-800 -mb-2'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name}`}</p>
                                        <div className='flex'>
                                            {/* <Ratings
                                            value={3} /> */}
                                            {/* {getUser(bookingDetails.User?.id)} */}
                                            <p className='text-xs text-gray-800 mt-1'>0 reviews</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='flex mt-4 items-center'>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </span>
                                        <p className='text-sm text-gray-700 ml-2 font-bold'>{`${moment((bookingDetails.booking_time) * 1000).format("MMMM DD,YYYY")} at ${moment((bookingDetails.booking_time) * 1000).format("hh:mm A")}`}</p>
                                    </div>
                                    <div className='flex mt-4 items-center'>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                            </svg>
                                        </span>
                                        <p className='text-sm text-gray-700 ml-2 font-bold'>{bookingDetails.topic}</p>
                                    </div>
                                    <div className='flex mt-4 items-center'>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </span>
                                        <p className='text-sm text-gray-700 ml-2 font-bold'>Call Request Notes</p>
                                    </div>
                                </div>
                                <div className='text-xs text-gray-500 mt-4'>
                                    {bookingDetails.notes}
                                </div>

                            </div>

                            {bookingDetails.BookingLogs.length > 2 && bookingDetails.BookingLogs[2].action === 'REQUEST_RESCHEDULE_ACCEPTED' ? <div>
                                <div className='flex justify-end'>
                                    <div className='mt-8 flex flex-row-reverse'>
                                        <img src={props.user.User?.type==='professional'?bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png':
                                    bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                        <div className='flex flex-col'>
                                            {props.user.User?.type==='professional'?<p className='text-sm text-white bg-black p-2 px-6 flex items-center justify-center mr-2 rounded-l-full rounded-br-full h-12'>{`You've requested to reschedule the session`} </p>:
                                            <p className='text-sm text-white bg-black p-2 px-6 flex items-center justify-center mr-2 rounded-l-full rounded-br-full h-12'>{`${bookingDetails.Professionals_Metadatum?.User?.first_name} ${bookingDetails.Professionals_Metadatum?.User?.last_name} requested to reschedule the session`} </p>}
                                            <div className='flex justify-end'>
                                                <p className='text-xs text-gray-500 mt-2 mr-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='ml-14 mt-4 bg-gray-200 p-4 rounded-xl w-96'>
                                    <p className='text-sm text-gray-800 font-bold'>New Proposed Time</p>
                                    <div className='flex items-center mt-2 '>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </span>
                                        {console.log(bookingDetails.BookingLogs[1].action_data, ">>>>>>>>date")}
                                        <p className='text-sm text-gray-800 font-bold ml-2'>Time: {moment(bookingDetails.BookingLogs[1].action_data * 1000).format('MMMM DD,YYYY h:mm A')}</p>
                                    </div>
                                </div>

                                <div className='p-4'>
                                    <div className='mt-4 flex'>
                                        <img src={props.user.User?.type==='professional'?bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png':
                                        bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                        <div className='flex flex-col'>
                                            {props.user.User?.type==='professional'?<p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name} accepted the request to reschedule the session`} </p>:
                                            <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`You have accepted the request to reschedule the session`} </p>}
                                            <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div> : <div>
                                <div className='flex justify-end'>
                                    <div className='mt-8 flex flex-row-reverse'>
                                        <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                        <div className='flex flex-col'>
                                            <p className='text-sm text-white bg-black p-2 px-6 flex items-center justify-center mr-2 rounded-l-full rounded-br-full h-12'>{`You've accepted ${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name} request`} </p>
                                            <div className='flex justify-end'>
                                                <p className='text-xs text-gray-500 mt-2 mr-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                         


                            <div className='flex w-full justify-center items-center mt-8 '>
                                <div className='SShadow flex w-3/4 rounded-lg bg-white p-8'>
                                    <div >
                                        <p className='text-sm text-gray-500'>Start Video Call button will be enabled after 5 minutes before scheduled time</p>
                                        <button className='py-2 mt-4 text-white flex justify-center items-center text-sm rounded w-full bg-gray-400' style={{ backgroundColor: Colors.blue }}>
                                            <span className='mr-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg></span>
                                            Start Video Call with John Doe</button>
                                    </div>
                                </div>
                            </div>
                        </div> : null}



                    {/* Booking Status Pending */}



                    {bookingDetails.status === 'pending' ? <div className='p-4'>
                        <div className='mt-4 flex'>
                            <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                            <div className='flex flex-col'>
                                <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name} Requested a call of ${bookingDetails.session_duration}  min`} </p>
                                <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                            </div>
                        </div>

                        <div className='ml-14 mt-4 SShadow p-6 rounded-xl w-96'>
                            <div className='flex'>
                                <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                <div className='flex flex-col ml-4'>
                                    <p className='font-bold text-lg text-gray-800 -mb-2'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name}`}</p>
                                    <div className='flex items-center justify-center'>
                                        <Ratings
                                            value={3} />
                                        {/* {getUser(bookingDetails.User?.id)} */}
                                        <p className='ml-2 text-xs text-gray-800'>{user.id}reviews</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex mt-4 items-center'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    <p className='text-sm text-gray-700 ml-2 font-bold'>{`${moment((bookingDetails.booking_time) * 1000).format("MMMM DD,YYYY")} at ${moment((bookingDetails.booking_time) * 1000).format("hh:mm A")}`}</p>
                                </div>
                                <div className='flex mt-4 items-center'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                        </svg>
                                    </span>
                                    <p className='text-sm text-gray-700 ml-2 font-bold'>{bookingDetails.topic}</p>
                                </div>
                                <div className='flex mt-4 items-center'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </span>
                                    <p className='text-sm text-gray-700 ml-2 font-bold'>Call Request Notes</p>
                                </div>
                            </div>
                            <div className='text-xs text-gray-500 mt-4'>
                                {bookingDetails.notes}
                            </div>
                            {bookingDetails.BookingLogs.length > 1 ? !bookingDetails.BookingLogs[1].action === 'REQUEST_RESCHEDULE' && <div>
                                <button className='py-2 mt-4 text-white flex justify-center items-center text-sm rounded w-full ' style={{ backgroundColor: Colors.blue }}
                                    onClick={() => ChangeStatus('approved')}>Accept</button>
                                <div className='flex mt-4'>
                                    <button className='border border-gray-300 text-gray-600 py-2 flex justify-center items-center text-sm rounded w-1/2 '
                                        onClick={Reschedule}>Reschedule</button>
                                    <button className='border border-gray-300 text-gray-600  py-2 flex justify-center items-center text-sm rounded w-1/2 ml-2'
                                        onClick={toggleDecline}>Decline</button>
                                </div>
                            </div> : bookingDetails.BookingLogs[0].action === 'BOOKING_REQUESTED' && <div>
                                <button className='py-2 mt-4 text-white flex justify-center items-center text-sm rounded w-full ' style={{ backgroundColor: Colors.blue }}
                                    onClick={() => ChangeStatus('approved')}>Accept</button>
                                <div className='flex mt-4'>
                                    <button className='border border-gray-300 text-gray-600 py-2 flex justify-center items-center text-sm rounded w-1/2 '
                                        onClick={Reschedule}>Reschedule</button>
                                    <button className='border border-gray-300 text-gray-600  py-2 flex justify-center items-center text-sm rounded w-1/2 ml-2'
                                        onClick={toggleDecline}>Decline</button>
                                </div>
                            </div>}
                        </div>

                        {bookingDetails.BookingLogs.length > 1 && bookingDetails.BookingLogs[1].action === 'REQUEST_RESCHEDULE' && <div className='w-full mt-4'>

                            <div className='p-4'>
                                <div className='mt-4 flex'>
                                    <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                    <div className='flex flex-col'>
                                        <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>You have Requested for reschedule of session</p>
                                        <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='ml-14 mt-4 bg-gray-200 p-4 rounded-xl w-96'>
                                <p className='text-sm text-gray-800 font-bold'>New Proposed Time</p>
                                <div className='flex items-center mt-2 '>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    {console.log(bookingDetails.BookingLogs[1].action_data, ">>>>>>>>date")}
                                    <p className='text-sm text-gray-800 font-bold ml-2'>Time: {moment(bookingDetails.BookingLogs[1].action_data * 1000).format('MMMM DD,YYYY h:mm A')}</p>
                                </div>
                            </div>
                        </div>}




                        {/* <div>
                    <div className='flex justify-end'>
                        <div className='mt-8 flex flex-row-reverse'>
                            <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                            <div className='flex flex-col'>
                                <p className='text-sm text-white bg-black p-2 px-6 flex items-center justify-center mr-2 rounded-l-full rounded-br-full h-12'>{`You've accepted ${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name} request`} </p>
                                <div className='flex justify-end'>
                                    <p className='text-xs text-gray-500 mt-2 mr-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex w-full justify-center items-center mt-8 '>
                        <div className='SShadow flex w-3/4 rounded-lg bg-white p-8'>
                            <div >
                                <p className='text-sm text-gray-500'>Start Video Call button will be enabled after 5 minutes before scheduled time</p>
                                <button className='py-2 mt-4 text-white flex justify-center items-center text-sm rounded w-full bg-gray-400'>
                                    <span className='mr-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg></span>
                                    Start Video Call with John Doe</button>
                            </div>
                        </div>
                    </div> */}
                    </div> : null}


                    {/* Decline Booking */}


                    {bookingDetails.status === 'declined' ? <div className='p-4'>
                        <div className='mt-4 flex'>
                            <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                            <div className='flex flex-col'>
                                <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name} Requested a call of ${bookingDetails.session_duration}  min`} </p>
                                <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                            </div>
                        </div>

                        <div className='ml-14 mt-4 SShadow p-6 rounded-xl w-96'>
                            <div className='flex'>
                                <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                <div className='flex flex-col ml-4'>
                                    <p className='font-bold text-lg text-gray-800 -mb-2'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name}`}</p>
                                    <div className='flex items-center justify-center'>
                                        <Ratings
                                            value={3} />
                                        {/* {getUser(bookingDetails.User?.id)} */}
                                        <p className='ml-2 text-xs text-gray-800'>{user.id}reviews</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex mt-4 items-center'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    <p className='text-sm text-gray-700 ml-2 font-bold'>{`${moment((bookingDetails.booking_time) * 1000).format("MMMM DD,YYYY")} at ${moment((bookingDetails.booking_time) * 1000).format("hh:mm A")}`}</p>
                                </div>
                                <div className='flex mt-4 items-center'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                        </svg>
                                    </span>
                                    <p className='text-sm text-gray-700 ml-2 font-bold'>{bookingDetails.topic}</p>
                                </div>
                                <div className='flex mt-4 items-center'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </span>
                                    <p className='text-sm text-gray-700 ml-2 font-bold'>Call Request Notes</p>
                                </div>
                            </div>
                            <div className='text-xs text-gray-500 mt-4'>
                                {bookingDetails.notes}
                            </div>
                            {/* <div>
                            <button className='py-2 mt-4 text-white flex justify-center items-center text-sm rounded w-full ' style={{ backgroundColor: Colors.blue }}
                                onClick={() => ChangeStatus('approved')}>Accept</button>
                            <div className='flex mt-4'>
                                <button className='border border-gray-300 text-gray-600 py-2 flex justify-center items-center text-sm rounded w-1/2 '>Reschedule</button>
                                <button className='border border-gray-300 text-gray-600  py-2 flex justify-center items-center text-sm rounded w-1/2 ml-2'
                                    onClick={toggleDecline}>Decline</button>
                            </div>
                        </div> */}
                        </div>


                        {bookingDetails.BookingLogs.length > 2 && bookingDetails.BookingLogs[2].action === 'REQUEST_DECLINED' ? <div>
                            <div className='flex justify-end'>
                                <div className='mt-8 flex flex-row-reverse'>
                                    <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                    <div className='flex flex-col'>
                                        <p className='text-sm text-white bg-black p-2 px-6 flex items-center justify-center mr-2 rounded-l-full rounded-br-full h-12'>{`You've requested to reschedule the session`} </p>
                                        <div className='flex justify-end'>
                                            <p className='text-xs text-gray-500 mt-2 mr-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='ml-14 mt-4 bg-gray-200 p-4 rounded-xl w-96'>
                                <p className='text-sm text-gray-800 font-bold'>New Proposed Time</p>
                                <div className='flex items-center mt-2 '>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    {console.log(bookingDetails.BookingLogs[1].action_data, ">>>>>>>>date")}
                                    <p className='text-sm text-gray-800 font-bold ml-2'>Time: {moment(bookingDetails.BookingLogs[1].action_data * 1000).format('MMMM DD,YYYY h:mm A')}</p>
                                </div>
                            </div>

                            <div className='p-4'>
                                <div className='mt-4 flex'>
                                    <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                    <div className='flex flex-col'>
                                        <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name} declined the request`} </p>
                                        <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div> : <div className='mt-8 flex'>
                            <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                            <div className='flex flex-col'>
                                <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>You have declined the request of {`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name}`} </p>
                                <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                            </div>
                        </div>}




                    </div> : null}


                    {/* Cancel Booking */}


                    {bookingDetails.status === 'cancelled' ? <div className='p-4'>
                        <div className='mt-4 flex'>
                            <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                            <div className='flex flex-col'>
                                <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name} Requested a call of ${bookingDetails.session_duration}  min`} </p>
                                <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                            </div>
                        </div>

                        <div className='ml-14 mt-4 SShadow p-6 rounded-xl w-96'>
                            <div className='flex'>
                                <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                <div className='flex flex-col ml-4'>
                                    <p className='font-bold text-lg text-gray-800 -mb-2'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name}`}</p>
                                    <div className='flex items-center justify-center'>
                                        <Ratings
                                            value={3} />
                                        {/* {getUser(bookingDetails.User?.id)} */}
                                        <p className='ml-2 text-xs text-gray-800'>{user.id}reviews</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex mt-4 items-center'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    <p className='text-sm text-gray-700 ml-2 font-bold'>{`${moment((bookingDetails.booking_time) * 1000).format("MMMM DD,YYYY")} at ${moment((bookingDetails.booking_time) * 1000).format("hh:mm A")}`}</p>
                                </div>
                                <div className='flex mt-4 items-center'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                        </svg>
                                    </span>
                                    <p className='text-sm text-gray-700 ml-2 font-bold'>{bookingDetails.topic}</p>
                                </div>
                                <div className='flex mt-4 items-center'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </span>
                                    <p className='text-sm text-gray-700 ml-2 font-bold'>Call Request Notes</p>
                                </div>
                            </div>
                            <div className='text-xs text-gray-500 mt-4'>
                                {bookingDetails.notes}
                            </div>
                            {/* <div>
                        <button className='py-2 mt-4 text-white flex justify-center items-center text-sm rounded w-full ' style={{ backgroundColor: Colors.blue }}
                            onClick={() => ChangeStatus('approved')}>Accept</button>
                        <div className='flex mt-4'>
                            <button className='border border-gray-300 text-gray-600 py-2 flex justify-center items-center text-sm rounded w-1/2 '>Reschedule</button>
                            <button className='border border-gray-300 text-gray-600  py-2 flex justify-center items-center text-sm rounded w-1/2 ml-2'
                                onClick={() => ChangeStatus('declined')}>Decline</button>
                        </div>
                    </div> */}
                        </div>

                        <div>
                            <div className='flex justify-end'>
                                <div className='mt-8 flex flex-row-reverse'>
                                    <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                    <div className='flex flex-col'>
                                        <p className='text-sm text-white bg-black p-2 px-6 flex items-center justify-center mr-2 rounded-l-full rounded-br-full h-12'>{`You've accepted ${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name} request`} </p>
                                        <div className='flex justify-end'>
                                            <p className='text-xs text-gray-500 mt-2 mr-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='flex justify-end'>
                                <div className='mt-8 flex flex-row-reverse'>
                                    <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                    <div className='flex flex-col'>
                                        <p className='text-sm text-white bg-black p-2 px-6 flex items-center justify-center mr-2 rounded-l-full rounded-br-full h-12'>{`You've cancelled the session`} </p>
                                        <div className='flex justify-end'>
                                            <p className='text-xs text-gray-500 mt-2 mr-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> : null}

                </div> : <div className='flex flex-col items-center justify-center'>
                    <div className="flex justify-center items-center mt-8">
                        <Calendar
                            onChange={setDate}
                            value={value}
                            showNavigation={true}
                            // tileClassName="text-gray-500 text-sm hover:text-white hover:bg-blue-200 rounded-full w-12 h-12"
                            showNeighboringMonth={false}
                            next2Label={null}
                            prev2Label={null}
                            // style={{ backgroundColor: Colors.blue }}
                            minDate={new Date()}

                        // prevLabel={<LeftArrow/>}
                        // nextLabel={<RightArrow/>}
                        // selectRange={true}
                        />
                    </div>
                    <div className='mx-6 flex flex-col h-80 overflow-auto w-2/3 mt-8'>
                        {slots === undefined ? <p className='text-3xl text-center text-blue-300'>No slots Available</p> : (slots.map((timeSlot) => {
                            return <p key={timeSlot} className="p-3 border text-center border-blue-300 rounded hover:bg-blue-300 hover:text-white h-12 active:bg-green-400 w-full mb-2"
                                onClick={() => handleTimeSlot(timeSlot)}>{timeSlot}</p>
                        }))}
                    </div>
                    <button onClick={goTo} className="w-full py-2 rounded-lg text-sm" style={{ backgroundColor: Colors.blue }}>Next</button>
                </div>}
            </div>
        </div>
    )
};

export default BookingDetails;


const DeclinedReasonBox = (props) => {
    const [declineText, setDeclineText] = useState('')
    return (
        <div className={props.modal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className={props.overlay} onClick={props.toggle}></div>
            <div className='flex w-1/3 z-20 '>
                <div className='SShadow flex w-3/4 rounded-lg bg-white p-8'>
                    <div className='w-full'>
                        <p className='text-sm text-gray-500 w-full font-bold'>Note</p>
                        <textarea className='w-full border focus:outline-none mt-2 rounded-lg h-36 text-xs p-2' placeholder='Write here' value={declineText} onChange={(e) => { setDeclineText(e.target.value) }}></textarea>
                        <button className='py-2 mt-4 text-white bg-black flex justify-center items-center text-sm rounded w-full '
                            onClick={() => {
                                if (declineText !== '') {
                                    props.toggle()
                                    props.ChangeStatus('declined')
                                }
                            }}>Decline</button>
                    </div>
                </div>
            </div>
        </div>

    )
}


const CancelReasonBox = (props) => {
    const [cancelText, setCancelText] = useState('')
    return (
        <div className={props.modal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className={props.overlay} onClick={props.toggle}></div>
            <div className='flex w-1/3 z-20 '>
                <div className='SShadow flex w-3/4 rounded-lg bg-white p-8'>
                    <div className='w-full'>
                        <p className='text-sm text-gray-500 w-full font-bold'>Note</p>
                        <textarea className='w-full border focus:outline-none mt-2 rounded-lg h-36 text-xs p-2' placeholder='Write here' value={cancelText} onChange={(e) => { setCancelText(e.target.value) }}></textarea>
                        <button className='py-2 mt-4 text-white bg-black flex justify-center items-center text-sm rounded w-full '
                            onClick={() => {
                                if (cancelText !== '') {
                                    props.ChangeStatus('cancel')
                                    props.toggle()
                                }
                            }}>Cancel Booking</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
