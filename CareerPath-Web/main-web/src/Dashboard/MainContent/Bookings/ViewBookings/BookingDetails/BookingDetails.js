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
    const [style_, setStyle] = useState(false)
    const [reviewsCount, setReviewsCount] = useState(null)
    const [rating, setRating] = useState(null)
    const [reviewsCountOfProfessional, setReviewsCountOfProfessional] = useState(null)
    const [ratingOfProfessional, setRatingOfProfessional] = useState(null)
    const navigate = useNavigate()
    console.log(props.user.User, "props.user from booking Details")
    const toggleDecline = () => {
        setDecline(!decline)
    }

    const toggleCancel = () => {
        setCancelled(!cancelled)
        setStyle(false)
    }
    const startCall = () => {
        navigate(`/dashboard/booking/call/hello/${bookingDetails.id}`)
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

            axios.get(`${process.env.REACT_APP_SERVER_PATH}/customers/${response.data.User?.id}`).then(response => {
                console.log(response.data, ">>>>>>data of customer in booking details")
                setReviewsCount(response.data.reviewCount)
                setRating(response.data.avgRating)
            })
            axios.get(`${process.env.REACT_APP_SERVER_PATH}/professionals/${response.data.Professionals_Metadatum?.user_id}`).then(response => {
                console.log(response.data, ">>>>>>data of professionals in booking details")
                setReviewsCountOfProfessional(response.data.reviewCount)
                setRatingOfProfessional(response.data.avgRating)
            })
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

    const ChangeStatus = (status, text) => {
        axios.post(`${process.env.REACT_APP_SERVER_PATH}/bookings/${id}/update_status`, { status: status, data: text }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response.data, ">>>>>>>>>>>>>>>>")
            setStatus(response.data.message.status)
            console.log('Status Changed Successfully')
            getBooking()
        })
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
                    <div className='dropdown' onClick={() => setStyle(!style_)}>
                        <span className="dropbtn">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </span>
                        {style_ ? <div>
                            <div className="dropdown-content rounded-lg overflow-hidden">
                                {status !== 'cancelled' && status2 !== 'cancelled' && status !== 'declined' && status2 !== 'declined' && <div className='text-sm hover:bg-gray-300 flex w-full items-center p-2 text-red-700 cursor-pointer' onClick={toggleCancel}>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </span>
                                    <p className='ml-6'>Cancel</p>
                                </div>}
                                <a href='https://careerpaths.io/support' rel="noreferrer" target="_blank">
                                    <div className='text-sm  hover:bg-gray-300 flex w-full items-center p-2 text-black cursor-pointer'>

                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </span>
                                        <p className='ml-6'>Help</p>
                                    </div>
                                </a>
                            </div>
                        </div> : null}

                    </div>
                </div>

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
                        {props.user.User?.id === bookingDetails.Professionals_Metadatum?.user_id ? <div className='mt-4 flex'>
                            <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                            <div className='flex flex-col'>
                                <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>
                                    {`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name} Requested a call of ${bookingDetails.session_duration}  min`} </p>
                                <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                            </div>
                        </div> : <div>
                            <div className='flex justify-end'>
                                <div className='flex flex-row-reverse'>
                                    <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                    <div className='flex flex-col'>
                                        <p className='text-sm text-white bg-black p-2 px-6 flex items-center justify-center mr-2 rounded-l-full rounded-br-full h-12' style={{ backgroundColor: Colors.blue }}>{`You've requested a 30 minutes session request`} </p>
                                        <div className='flex justify-end'>
                                            <p className='text-xs text-gray-500 mt-2 mr-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}

                        {props.user.User?.id === bookingDetails.Professionals_Metadatum?.user_id ? <div>
                            <div className='mx-auto mt-4 SShadow p-6 rounded-xl w-96'>
                                <div className='flex'>
                                    <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                    <div className='flex flex-col ml-4'>
                                        <p className='font-bold text-lg text-gray-800 -mb-2'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name}`}</p>
                                        <div className='flex items-center justify-center'>
                                            {rating ? <div>
                                                <Ratings
                                                    value={Math.trunc(rating)} />
                                            </div> : <Ratings
                                                value={0} />}
                                            {reviewsCount ? <p className='text-xs text-gray-800 mt-1'>{reviewsCount} reviews</p> :
                                                <p className='text-xs text-gray-800 mt-1'>{0} reviews</p>}
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

                            <div>
                                <div className='flex justify-end'>
                                    <div className='mt-8 flex flex-row-reverse'>
                                        <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                        <div className='flex flex-col'>
                                            <p className='text-sm text-white bg-black p-2 px-6 flex items-center justify-center mr-2 rounded-l-full rounded-br-full h-12' style={{ backgroundColor: Colors.blue }}>{`You've accepted session request`} </p>
                                            <div className='flex justify-end'>
                                                <p className='text-xs text-gray-500 mt-2 mr-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex w-full justify-center items-center mt-8 '>
                                <button className='py-2 rounded-full flex items-center justify-center text-white w-3/4' style={{ backgroundColor: Colors.blue }}><span className='mr-2'><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg></span> Add Reminder to Calender</button>
                            </div>

                            <div className='flex w-full justify-center items-center mt-2 '>
                                <div className='SShadow flex w-3/4 rounded-lg bg-white p-8'>
                                    <div >
                                        <p className='text-sm text-gray-500'>Start Video Call button will be enabled after 5 minutes before scheduled time</p>
                                        <button className='py-2 mt-4 text-white flex justify-center items-center text-sm rounded-full w-full bg-gray-400' style={{ backgroundColor: Colors.blue }} onClick={startCall}>
                                            <span className='mr-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg></span>
                                            Start Video Call with John Doe</button>
                                    </div>
                                </div>
                            </div>
                        </div> : <div>
                            <div className='mx-auto mt-4 SShadow p-6 rounded-xl w-96'>
                                <div className='flex'>
                                    <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                    <div className='flex flex-col ml-4'>
                                        <p className='font-bold text-lg text-gray-800 -mb-2'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name}`}</p>
                                        <div className='flex items-center justify-center'>
                                            {rating ? <div>
                                                <Ratings
                                                    value={Math.trunc(rating)} />
                                            </div> : <Ratings
                                                value={0} />}
                                            {reviewsCount ? <p className='text-xs text-gray-800 mt-1'>{reviewsCount} reviews</p> :
                                                <p className='text-xs text-gray-800 mt-1'>{0} reviews</p>}
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

                            <div>
                                <div className='flex'>
                                    <div className='mt-8 flex'>
                                        <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                        <div className='flex flex-col ml-2'>
                                            <p className='text-sm text-black bg-gray-100 p-2 px-6 flex items-center justify-center mr-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.Professionals_Metadatum?.User?.first_name} ${bookingDetails.Professionals_Metadatum?.User?.last_name} accepted session request`} </p>
                                            <div className='flex'>
                                                <p className='text-xs text-gray-500 mt-2 mr-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex w-full justify-center items-center mt-8 '>
                                <button className='py-2 rounded-full flex items-center justify-center text-white w-3/4' style={{ backgroundColor: Colors.blue }}><span className='mr-2'><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg></span> Add Reminder to Calender</button>
                            </div>

                            <div className='flex w-full justify-center items-center mt-2 '>
                                <div className='SShadow flex w-3/4 rounded-lg bg-white p-8'>
                                    <div >
                                        <p className='text-sm text-gray-500'>Start Video Call button will be enabled after 5 minutes before scheduled time</p>
                                        <button className='py-2 mt-4 text-white flex justify-center items-center text-sm rounded-full w-full bg-gray-400' style={{ backgroundColor: Colors.blue }} onClick={startCall}>
                                            <span className='mr-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg></span>
                                            Start Video Call with John Doe</button>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div> : null}



                {/* Booking Status Pending */}
                {console.log(props.user.User?.id === bookingDetails.Professionals_Metadatum?.user_id, "props.user.User?.id === bookingDetails.Professionals_Metadatum?.user_id")}
                {bookingDetails.status === 'pending' ? <div className='p-4'>
                    {props.user.User?.id === bookingDetails.Professionals_Metadatum?.user_id ? <div className='mt-4 flex'>
                        <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                        <div className='flex flex-col'>
                            <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name} Requested a call of ${bookingDetails.session_duration}  min`} </p>
                            <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                        </div>
                    </div> : <div>
                        <div className='flex justify-end'>
                            <div className='flex flex-row-reverse'>
                                <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                <div className='flex flex-col'>
                                    <p className='text-sm text-white bg-black p-2 px-6 flex items-center justify-center mr-2 rounded-l-full rounded-br-full h-12' style={{ backgroundColor: Colors.blue }}>{`You've requested a 30 minutes session request`} </p>
                                    <div className='flex justify-end'>
                                        <p className='text-xs text-gray-500 mt-2 mr-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}

                    {props.user.User?.id === bookingDetails.Professionals_Metadatum?.user_id ? <div className='mx-auto mt-4 SShadow p-6 rounded-xl w-96'>
                        <div className='flex'>
                            <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                            <div className='flex flex-col ml-4'>
                                <p className='font-bold text-lg text-gray-800 -mb-2'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name}`}</p>
                                <div className='flex items-center justify-center'>
                                    {rating ? <div>
                                        <Ratings
                                            value={Math.trunc(rating)} />
                                    </div> : <Ratings
                                        value={0} />}
                                    {reviewsCount ? <p className='text-xs text-gray-800 mt-1'>{reviewsCount} reviews</p> :
                                        <p className='text-xs text-gray-800 mt-1'>{0} reviews</p>}
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

                        <div className='flex mt-4'>
                            <button className='border border-gray-300 text-white py-2 flex justify-center items-center text-sm rounded-full w-1/2 ' style={{ backgroundColor: Colors.blue }} onClick={() => ChangeStatus('approved')}>Accept</button>
                            <button className='border border-gray-300 text-white bg-gray-800  py-2 flex justify-center items-center text-sm rounded-full w-1/2 ml-2'
                                onClick={toggleDecline}>Decline</button>
                        </div>
                    </div> : <div className='mx-auto mt-4 SShadow p-6 rounded-xl w-96'>
                        <div className='flex'>
                            <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                            <div className='flex flex-col ml-4'>
                                <p className='font-bold text-lg text-gray-800 -mb-2'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name}`}</p>
                                <div className='flex items-center justify-center'>
                                    {rating ? <div>
                                        <Ratings
                                            value={Math.trunc(rating)} />
                                    </div> : <Ratings
                                        value={0} />}
                                    {reviewsCount ? <p className='text-xs text-gray-800 mt-1'>{reviewsCount} reviews</p> :
                                        <p className='text-xs text-gray-800 mt-1'>{0} reviews</p>}
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

                        {/* <div className='flex mt-4'>
                            <button className='border border-gray-300 text-white py-2 flex justify-center items-center text-sm rounded w-1/2 ' style={{ backgroundColor: Colors.blue }} onClick={() => ChangeStatus('approved')}>Accept</button>
                            <button className='border border-gray-300 text-gray-600  py-2 flex justify-center items-center text-sm rounded w-1/2 ml-2'
                                onClick={toggleDecline}>Decline</button>
                        </div> */}
                    </div>}
                </div> : null}


                {/* Decline Booking */}


                {bookingDetails.status === 'declined' ? <div className='p-4'>
                    {props.user.User?.id === bookingDetails.Professionals_Metadatum?.user_id ? <div className='mt-4 flex'>
                        <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                        <div className='flex flex-col'>
                            <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name} Requested a call of ${bookingDetails.session_duration}  min`} </p>
                            <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                        </div>
                    </div> : <div>
                        <div className='flex justify-end'>
                            <div className='mt-2 flex flex-row-reverse'>
                                <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                <div className='flex flex-col'>
                                    <p className='text-sm text-white bg-black p-2 px-6 flex items-center justify-center mr-2 rounded-l-full rounded-br-full h-12' style={{ backgroundColor: Colors.blue }}>{`You've requested a ${bookingDetails.session_duration} minutes session`} </p>
                                    <div className='flex justify-end'>
                                        <p className='text-xs text-gray-500 mt-2 mr-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}

                    {props.user.User?.id === bookingDetails.Professionals_Metadatum?.user_id ? <div>
                        <div className='ml-14 mt-4 SShadow p-6 rounded-xl w-96'>
                            <div className='flex'>
                                <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                <div className='flex flex-col ml-4'>
                                    <p className='font-bold text-lg text-gray-800 -mb-2'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name}`}</p>
                                    <div className='flex items-center justify-center'>
                                        {rating ? <div>
                                            <Ratings
                                                value={Math.trunc(rating)} />
                                        </div> : <Ratings
                                            value={0} />}
                                        {reviewsCount ? <p className='text-xs text-gray-800 mt-1'>{reviewsCount} reviews</p> :
                                            <p className='text-xs text-gray-800 mt-1'>{0} reviews</p>}
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

                        <div className='mt-6'>
                            <div className='flex justify-end'>
                                <div className='mt-2 flex flex-row-reverse'>
                                    <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                    <div className='flex flex-col mr-2'>
                                        <p className='text-sm text-white p-2 px-6 flex items-center justify-center ml-2 rounded-l-full rounded-br-full h-12' style={{ backgroundColor: Colors.blue }}>You have declined the request of {`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name} Reason : ${bookingDetails.BookingLogs[1].action_data}`} </p>
                                        <div className='flex justify-end'>
                                            <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> : <div>
                        <div className='mx-auto mt-4 SShadow p-6 rounded-xl w-96'>
                            <div className='flex'>
                                <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                <div className='flex flex-col ml-4'>
                                    <p className='font-bold text-lg text-gray-800 -mb-2'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name}`}</p>
                                    <div className='flex items-center justify-center'>
                                        {rating ? <div>
                                            <Ratings
                                                value={Math.trunc(rating)} />
                                        </div> : <Ratings
                                            value={0} />}
                                        {reviewsCount ? <p className='text-xs text-gray-800 mt-1'>{reviewsCount} reviews</p> :
                                            <p className='text-xs text-gray-800 mt-1'>{0} reviews</p>}
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

                        {bookingDetails.BookingLogs.length === 1 ? <div className='mt-8 flex'>
                            <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                            <div className='flex flex-col'>
                                <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.Professionals_Metadatum?.User?.first_name} ${bookingDetails.Professionals_Metadatum?.User?.last_name} declined the session request Reason:${bookingDetails.BookingLogs[0].action_data}`} </p>
                                <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                            </div>
                        </div> : null}

                        {bookingDetails.BookingLogs.length === 2 ? <div className='mt-8 flex'>
                            <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                            <div className='flex flex-col'>
                                <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.Professionals_Metadatum?.User?.first_name} ${bookingDetails.Professionals_Metadatum?.User?.last_name} declined the session request Reason:${bookingDetails.BookingLogs[1].action_data}`} </p>
                                <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                            </div>
                        </div> : null}

                        {bookingDetails.BookingLogs.length === 3 ? <div className='mt-8 flex'>
                            <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                            <div className='flex flex-col'>
                                <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.Professionals_Metadatum?.User?.first_name} ${bookingDetails.Professionals_Metadatum?.User?.last_name} declined the session request Reason:${bookingDetails.BookingLogs[2].action_data}`} </p>
                                <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                            </div>
                        </div> : null}

                        {bookingDetails.BookingLogs.length === 4 ? <div className='mt-8 flex'>
                            <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                            <div className='flex flex-col'>
                                <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.Professionals_Metadatum?.User?.first_name} ${bookingDetails.Professionals_Metadatum?.User?.last_name} declined the session request Reason:${bookingDetails.BookingLogs[3].action_data}`} </p>
                                <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                            </div>
                        </div> : null}
                    </div>}
                </div> : null}

                {/* Completed Booking */}
                {bookingDetails.status === 'completed' ? <div className='p-4'>
                    {props.user.User?.id === bookingDetails.Professionals_Metadatum?.user_id ? <div className='mt-4 flex'>
                        <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                        <div className='flex flex-col'>
                            <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name} Requested a call of ${bookingDetails.session_duration}  min`} </p>
                            <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                        </div>
                    </div> : <div>
                        <div className='flex justify-end'>
                            <div className='mt-2 flex flex-row-reverse'>
                                <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                <div className='flex flex-col'>
                                    <p className='text-sm text-white bg-black p-2 px-6 flex items-center justify-center mr-2 rounded-l-full rounded-br-full h-12' style={{ backgroundColor: Colors.blue }}>{`You've requested a ${bookingDetails.session_duration} minutes session`} </p>
                                    <div className='flex justify-end'>
                                        <p className='text-xs text-gray-500 mt-2 mr-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}

                    {props.user.User?.id === bookingDetails.Professionals_Metadatum?.user_id ? <div>
                        <div className='ml-14 mt-4 SShadow p-6 rounded-xl w-96'>
                            <div className='flex'>
                                <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                <div className='flex flex-col ml-4'>
                                    <p className='font-bold text-lg text-gray-800 -mb-2'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name}`}</p>
                                    <div className='flex items-center justify-center'>
                                        {rating ? <div>
                                            <Ratings
                                                value={Math.trunc(rating)} />
                                        </div> : <Ratings
                                            value={0} />}
                                        {reviewsCount ? <p className='text-xs text-gray-800 mt-1'>{reviewsCount} reviews</p> :
                                            <p className='text-xs text-gray-800 mt-1'>{0} reviews</p>}
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

                        <div className='mt-6'>
                            <div className='flex justify-end'>
                                <div className='mt-2 flex flex-row-reverse'>
                                    <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                    <div className='flex flex-col mr-2'>
                                        <p className='text-sm text-white p-2 px-6 flex items-center justify-center ml-2 rounded-l-full rounded-br-full h-12' style={{ backgroundColor: Colors.blue }}>You have accepted the session request </p>
                                        <div className='flex justify-end'>
                                            <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Call Started */}
                        <div className='w-full items-center justify-center mt-2'>
                            <div className='flex flex-col w-1/2 mx-auto'>
                                <p className='text-sm text-white p-2 px-6 flex flex-col items-center justify-center ml-2 rounded-l-full rounded-br-full h-12 bg-gray-500'>Call started<div className='flex justify-end'>
                                    <p>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                </div> </p>

                            </div>
                        </div>
                        {/* Call Ended */}
                        <div className='w-full items-center justify-center mt-2'>
                            <div className='flex flex-col w-1/2 mx-auto'>
                                <p className='text-sm text-white p-2 px-6 flex flex-col items-center justify-center ml-2 rounded-l-full rounded-br-full h-12 bg-gray-500'>Call ended<div className='flex justify-end'>
                                    <p>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                </div> </p>

                            </div>
                        </div>



                    </div> : <div>
                        <div className='mx-auto mt-4 SShadow p-6 rounded-xl w-96'>
                            <div className='flex'>
                                <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                <div className='flex flex-col ml-4'>
                                    <p className='font-bold text-lg text-gray-800 -mb-2'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name}`}</p>
                                    <div className='flex items-center justify-center'>
                                        {rating ? <div>
                                            <Ratings
                                                value={Math.trunc(rating)} />
                                        </div> : <Ratings
                                            value={0} />}
                                        {reviewsCount ? <p className='text-xs text-gray-800 mt-1'>{reviewsCount} reviews</p> :
                                            <p className='text-xs text-gray-800 mt-1'>{0} reviews</p>}
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

                        <div className='mt-8 flex'>
                            <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                            <div className='flex flex-col'>
                                <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.Professionals_Metadatum?.User?.first_name} ${bookingDetails.Professionals_Metadatum?.User?.last_name} accepted the session request`} </p>
                                <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                            </div>
                        </div>

                        {/* Call Started */}
                        <div className='w-full items-center justify-center mt-2'>
                            <div className='flex flex-col w-1/2 mx-auto'>
                                <p className='text-sm text-white p-2 px-6 flex flex-col items-center justify-center ml-2 rounded-l-full rounded-br-full h-12 bg-gray-500'>Call started<div className='flex justify-end'>
                                    <p>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                </div> </p>

                            </div>
                        </div>
                        {/* Call Ended */}
                        <div className='w-full items-center justify-center mt-2'>
                            <div className='flex flex-col w-1/2 mx-auto'>
                                <p className='text-sm text-white p-2 px-6 flex flex-col items-center justify-center ml-2 rounded-l-full rounded-br-full h-12 bg-gray-500'>Call ended<div className='flex justify-end'>
                                    <p>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                </div> </p>

                            </div>
                        </div>


                    </div>}
                </div> : null}

                {/* Cancel Booking */}

                {bookingDetails.status === 'cancelled' ? <div className='p-4'>
                    {props.user.User?.id === bookingDetails.Professionals_Metadatum?.user_id ? <div className='mt-4 flex'>
                        <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                        <div className='flex flex-col'>
                            <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name} Requested a call of ${bookingDetails.session_duration}  min`} </p>
                            <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                        </div>
                    </div> : <div>
                        <div className='flex justify-end'>
                            <div className='mt-2 flex flex-row-reverse'>
                                <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                <div className='flex flex-col'>
                                    <p className='text-sm text-white bg-black p-2 px-6 flex items-center justify-center mr-2 rounded-l-full rounded-br-full h-12' style={{ backgroundColor: Colors.blue }}>{`You've requested a ${bookingDetails.session_duration} minutes session`} </p>
                                    <div className='flex justify-end'>
                                        <p className='text-xs text-gray-500 mt-2 mr-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}

                    {props.user.User?.id === bookingDetails.Professionals_Metadatum?.user_id ? <div>
                        <div className='mx-auto mt-4 SShadow p-6 rounded-xl w-96'>
                            <div className='flex'>
                                <img src={bookingDetails.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                <div className='flex flex-col ml-4'>
                                    <p className='font-bold text-lg text-gray-800 -mb-2'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name}`}</p>
                                    <div className='flex items-center justify-center'>
                                        {rating ? <div>
                                            <Ratings
                                                value={Math.trunc(rating)} />
                                        </div> : <Ratings
                                            value={0} />}
                                        {reviewsCount ? <p className='text-xs text-gray-800 mt-1'>{reviewsCount} reviews</p> :
                                            <p className='text-xs text-gray-800 mt-1'>{0} reviews</p>}
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

                        {bookingDetails.BookingLogs.length > 2 ? <div>
                            <div>
                                <div className='flex justify-end'>
                                    <div className='mt-8 flex flex-row-reverse'>
                                        <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                        <div className='flex flex-col'>
                                            <p className='text-sm text-white bg-black p-2 px-6 flex items-center justify-center mr-2 rounded-l-full rounded-br-full h-12' style={{ backgroundColor: Colors.blue }}>{`You've accepted ${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name} request`} </p>
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
                                            <p className='text-sm text-white bg-black p-2 px-6 flex items-center justify-center mr-2 rounded-l-full rounded-br-full h-12' style={{ backgroundColor: Colors.blue }}>{`You've cancelled the session. Reason: ${bookingDetails.BookingLogs[2].action_data}`} </p>
                                            <div className='flex justify-end'>
                                                <p className='text-xs text-gray-500 mt-2 mr-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : <div>
                            <div className='flex justify-end'>
                                <div className='mt-8 flex flex-row-reverse'>
                                    <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                    <div className='flex flex-col'>
                                        <p className='text-sm text-white bg-black p-2 px-6 flex items-center justify-center mr-2 rounded-l-full rounded-br-full h-12' style={{ backgroundColor: Colors.blue }}>{`You've cancelled the session Reason:${bookingDetails.BookingLogs[1].action_data}`} </p>
                                        <div className='flex justify-end'>
                                            <p className='text-xs text-gray-500 mt-2 mr-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div> : <div>
                        <div className='mx-auto mt-4 SShadow p-6 rounded-xl w-96'>
                            <div className='flex'>
                                <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                <div className='flex flex-col ml-4'>
                                    <p className='font-bold text-lg text-gray-800 -mb-2'>{`${bookingDetails.User?.first_name} ${bookingDetails.User?.last_name}`}</p>
                                    <div className='flex items-center justify-center'>
                                        {rating ? <div>
                                            <Ratings
                                                value={Math.trunc(rating)} />
                                        </div> : <Ratings
                                            value={0} />}
                                        {reviewsCount ? <p className='text-xs text-gray-800 mt-1'>{reviewsCount} reviews</p> :
                                            <p className='text-xs text-gray-800 mt-1'>{0} reviews</p>}
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

                        {bookingDetails.BookingLogs.length > 2 ? <div>
                            <div className='mt-8 flex'>
                                <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                <div className='flex flex-col'>
                                    <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.Professionals_Metadatum?.User?.first_name} ${bookingDetails.Professionals_Metadatum?.User?.last_name} accepted the session request`} </p>
                                    <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                </div>
                            </div>

                            <div className='mt-8 flex'>
                                <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                                <div className='flex flex-col'>
                                    <p className='text-sm text-gray-800 bg-gray-100 py-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full'>{`${bookingDetails.Professionals_Metadatum?.User?.first_name} ${bookingDetails.Professionals_Metadatum?.User?.last_name} cancelled the session Reason: ${bookingDetails.BookingLogs[2].action_data}`} </p>
                                    <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                                </div>
                            </div>
                        </div> : <div className='mt-8 flex'>
                            <img src={bookingDetails.Professionals_Metadatum?.User?.profile_photo ? bookingDetails.Professionals_Metadatum?.User?.profile_photo : '/elon.png'} alt="elonmusk" className='w-12 h-12 rounded-full object-cover' />
                            <div className='flex flex-col'>
                                <p className='text-sm text-gray-800 bg-gray-100 p-2 px-6 flex items-center justify-center ml-2 rounded-r-full rounded-bl-full h-12'>{`${bookingDetails.Professionals_Metadatum?.User?.first_name} ${bookingDetails.Professionals_Metadatum?.User?.last_name} cancelled the session request Reason:${bookingDetails.BookingLogs[1].action_data}`} </p>
                                <p className='text-xs text-gray-500 mt-2 ml-2'>{`${moment(bookingDetails.createdAt).format("MMMM DD,YYYY")} at ${moment(bookingDetails.createdAt).format("hh:mm A")}`}</p>
                            </div>
                        </div>}
                    </div>}

                </div> : null}
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
                                    props.ChangeStatus('declined', declineText)
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
                                    props.ChangeStatus('cancel', cancelText)
                                    props.toggle()
                                }
                            }}>Cancel Booking</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
