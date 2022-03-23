import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import Colors from '../../../../../Colors/Colors';

const BookingPageMainContent = (props) => {
    const [navState, setNavState] = useState(0)
    const [confirmed, setConfirmed] = useState([])
    const [pending, setPending] = useState([])
    const [expired, setExpired] = useState([])
    const [completed, setCompleted] = useState([])
    const [cancelled, setCancelled] = useState([])
    const [declined, setDeclined] = useState([])
    const [all, setAll] = useState([])
    let type = JSON.parse(localStorage.getItem('type'))
    const [isLoading, setLoading] = useState(false)
    const [backArray] = useState(['/backOrange.png', '/backBlue.png', '/backPurple.png', '/greenish.png'])
    useEffect(() => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/bookings?status=approved`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log('>>>upcomming calls from majid', response);
            console.log(response.data.message);
            setConfirmed(response.data.message)
            setLoading(false)
        })
    }, [])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/bookings?status=pending`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log('>>>upcomming calls from majid', response);
            console.log(response.data.message);
            setPending(response.data.message)
        })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/bookings?status=declined&limit=100`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log('>>>upcomming calls from majid', response);
            console.log(response.data.message);
            setDeclined(response.data.message)
        })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/bookings?status=expired&limit=100`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log('>>>upcomming calls from majid', response);
            console.log(response.data.message);
            setExpired(response.data.message)
        })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/bookings?status=cancelled&limit=100`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log('>>>upcomming calls from majid', response);
            console.log(response.data.message);
            setCancelled(response.data.message)
        })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/bookings?status=completed&limit=100`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log('>>>upcomming calls from majid', response);
            console.log(response.data.message);
            setCompleted(response.data.message)
        })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/bookings?limit=100`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log('>>>upcomming calls from majid', response);
            console.log(response.data.message);
            setAll(response.data.message)
        })
    }, [])


    let counter = 0
    return (
        <div className="bg-white rounded p-4 mb-8">
            <div className="flex flex-wrap">
                <button className="hover:bg-blue-500 bg-gray-200 px-3 py-2 text-sm hover:text-white text-gray-800 m-1 rounded-lg"
                    onClick={() => { setNavState(0) }}
                    style={{
                        backgroundColor: navState !== 0 ? '#F7F7F7' : '#00C4FF',
                        color: navState !== 0 ? 'black' : 'white'
                    }}>Confirmed</button>
                <button className="hover:bg-blue-500 bg-gray-200 px-3 py-2 text-sm hover:text-white text-gray-800 m-1 rounded-lg"
                    onClick={() => { setNavState(1) }}
                    style={{
                        backgroundColor: navState !== 1 ? '#F7F7F7' : '#00C4FF',
                        color: navState !== 1 ? 'black' : 'white'
                    }}>Pending</button>
                <button className="hover:bg-blue-500 bg-gray-200 px-3 py-2 text-sm hover:text-white text-gray-800 m-1 rounded-lg"
                    onClick={() => { setNavState(2) }}
                    style={{
                        backgroundColor: navState !== 2 ? '#F7F7F7' : '#00C4FF',
                        color: navState !== 2 ? 'black' : 'white'
                    }}>Declined</button>
                <button className="hover:bg-blue-500 bg-gray-200 px-3 py-2 text-sm hover:text-white text-gray-800 m-1 rounded-lg "
                    onClick={() => { setNavState(3) }}
                    style={{
                        backgroundColor: navState !== 3 ? '#F7F7F7' : '#00C4FF',
                        color: navState !== 3 ? 'black' : 'white'
                    }}>Expired</button>

                <button className="hover:bg-blue-500 bg-gray-200 px-3 py-2 text-sm hover:text-white text-gray-800 m-1 rounded-lg"
                    onClick={() => { setNavState(4) }}
                    style={{
                        backgroundColor: navState !== 4 ? '#F7F7F7' : '#00C4FF',
                        color: navState !== 4 ? 'black' : 'white'
                    }}>Cancelled</button>
                <button className="hover:bg-blue-500 bg-gray-200 px-3 py-2 text-sm hover:text-white text-gray-800 m-1 rounded-lg "
                    onClick={() => { setNavState(5) }}
                    style={{
                        backgroundColor: navState !== 5 ? '#F7F7F7' : '#00C4FF',
                        color: navState !== 5 ? 'black' : 'white'
                    }}>Completed</button>
                <button className="hover:bg-blue-500 bg-gray-200 px-3 py-2 text-sm hover:text-white text-gray-800 m-1 rounded-lg "
                    onClick={() => { setNavState(6) }}
                    style={{
                        backgroundColor: navState !== 6 ? '#F7F7F7' : '#00C4FF',
                        color: navState !== 6 ? 'black' : 'white'
                    }}>All</button>



            </div>
            {navState === 0 && <div className='flex flex-wrap'>
                {isLoading ? <div className='flex items-center justify-center w-full'>
                    <Loader
                        type="TailSpin"
                        color={Colors.blue}
                        height={200}
                        width={200}
                    />
                </div> : null}
                {confirmed.length > 0 ? confirmed.map((m) => {
                    let counter2 = counter
                    if (counter === 3) {
                        counter = 0
                    } else {
                        counter += 1
                    }
                    if (type === 'professional') {
                        return <Bookings
                            bookingID={m.id}
                            time={m.booking_time}
                            prof_firstName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.first_name : m.Professionals_Metadatum?.User?.first_name}
                            prof_lastName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.last_name : m.Professionals_Metadatum?.User?.last_name}
                            professionalImage={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.profile_photo : m.Professionals_Metadatum?.User?.profile_photo}
                            backImage={backArray[counter2]}
                            user={props.user}
                            session_duration={m.session_duration}
                            setBookingNavState={props.setBookingNavState}
                            setNavState={props.setNavState} />
                    } else if (type === 'customer') {
                        return <Bookings
                            bookingID={m.id}
                            time={m.booking_time}
                            prof_firstName={m.Professionals_Metadatum?.User?.first_name}
                            prof_lastName={m.Professionals_Metadatum?.User?.last_name}
                            professionalImage={m.Professionals_Metadatum?.User?.profile_photo}
                            backImage={backArray[counter2]}
                            user={props.user}
                            session_duration={m.session_duration}
                            setBookingNavState={props.setBookingNavState}
                            setNavState={props.setNavState} />
                    }

                }) : <div className='w-full'>
                    <p className='text-center text-blue-500 mt-4'>This is very beginning of your bookings with Career Paths.</p>
                    <p className='text-center text-xs mt-4'>Your first booking will appear here when you get a booking in-app.</p>
                </div>}
            </div>}

            {navState === 1 && <div className='flex flex-wrap'>
                {pending.length > 1 ? pending.map((m) => {
                    let counter2 = counter
                    if (counter === 3) {
                        counter = 0
                    } else {
                        counter += 1
                    }
                    console.log(m, 'm?.Professionals_Metadatum?.User?.profile_photo');
                    console.log(m?.User?.profile_photo, "upcomming")
                    if (type === 'professional') {
                        return <Bookings
                            bookingID={m.id}
                            time={m.booking_time}
                            prof_firstName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.first_name : m.Professionals_Metadatum?.User?.first_name}
                            prof_lastName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.last_name : m.Professionals_Metadatum?.User?.last_name}
                            professionalImage={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.profile_photo : m.Professionals_Metadatum?.User?.profile_photo}
                            backImage={backArray[counter2]}
                            user={props.user}
                            session_duration={m.session_duration}
                            setBookingNavState={props.setBookingNavState}
                            setNavState={props.setNavState} />
                    } else if (type === 'customer') {
                        return <Bookings
                            bookingID={m.id}
                            time={m.booking_time}
                            prof_firstName={m.Professionals_Metadatum?.User?.first_name}
                            prof_lastName={m.Professionals_Metadatum?.User?.last_name}
                            professionalImage={m.Professionals_Metadatum?.User?.profile_photo}
                            backImage={backArray[counter2]}
                            user={props.user}
                            session_duration={m.session_duration}
                            setBookingNavState={props.setBookingNavState}
                            setNavState={props.setNavState} />
                    }
                }) : <div className='w-full'>
                    <p className='text-center text-blue-500 mt-4'>This is very beginning of your bookings with Career Paths.</p>
                    <p className='text-center text-xs mt-4'>Your first booking will appear here when you get a booking in-app.</p>
                </div>}
            </div>}

            {navState === 2 && <div className='flex flex-wrap'>
                {declined.length > 0 ? declined.map((m) => {
                    let counter2 = counter
                    if (counter === 3) {
                        counter = 0
                    } else {
                        counter += 1
                    }
                    console.log(m, 'm?.Professionals_Metadatum?.User?.profile_photo');
                    console.log(m?.User?.profile_photo, "upcomming")
                    if (type === 'professional') {
                        return <Bookings
                            bookingID={m.id}
                            time={m.booking_time}
                            prof_firstName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.first_name : m.Professionals_Metadatum?.User?.first_name}
                            prof_lastName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.last_name : m.Professionals_Metadatum?.User?.last_name}
                            professionalImage={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.profile_photo : m.Professionals_Metadatum?.User?.profile_photo}
                            backImage={backArray[counter2]}
                            user={props.user}
                            session_duration={m.session_duration}
                            setBookingNavState={props.setBookingNavState}
                            setNavState={props.setNavState} />
                    } else if (type === 'customer') {
                        return <Bookings
                            bookingID={m.id}
                            time={m.booking_time}
                            prof_firstName={m.Professionals_Metadatum?.User?.first_name}
                            prof_lastName={m.Professionals_Metadatum?.User?.last_name}
                            professionalImage={m.Professionals_Metadatum?.User?.profile_photo}
                            backImage={backArray[counter2]}
                            user={props.user}
                            session_duration={m.session_duration}
                            setBookingNavState={props.setBookingNavState}
                            setNavState={props.setNavState} />
                    }

                }) : <div className='w-full'>
                    <p className='text-center text-blue-500 mt-4'>This is very beginning of your bookings with Career Paths.</p>
                    <p className='text-center text-xs mt-4'>Your first booking will appear here when you get a booking in-app.</p>
                </div>}
            </div>}

            {navState === 3 && <div className='flex flex-wrap'>
                {expired.length > 0 ? expired.map((m) => {
                    let counter2 = counter
                    if (counter === 3) {
                        counter = 0
                    } else {
                        counter += 1
                    }
                    console.log(m, 'm?.Professionals_Metadatum?.User?.profile_photo');
                    console.log(m?.User?.profile_photo, "upcomming")
                    if (type === 'professional') {
                        return <Bookings
                            bookingID={m.id}
                            time={m.booking_time}
                            prof_firstName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.first_name : m.Professionals_Metadatum?.User?.first_name}
                            prof_lastName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.last_name : m.Professionals_Metadatum?.User?.last_name}
                            professionalImage={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.profile_photo : m.Professionals_Metadatum?.User?.profile_photo}
                            backImage={backArray[counter2]}
                            user={props.user}
                            session_duration={m.session_duration}
                            setBookingNavState={props.setBookingNavState}
                            setNavState={props.setNavState} />
                    } else if (type === 'customer') {
                        return <Bookings
                            bookingID={m.id}
                            time={m.booking_time}
                            prof_firstName={m.Professionals_Metadatum?.User?.first_name}
                            prof_lastName={m.Professionals_Metadatum?.User?.last_name}
                            professionalImage={m.Professionals_Metadatum?.User?.profile_photo}
                            backImage={backArray[counter2]}
                            user={props.user}
                            session_duration={m.session_duration}
                            setBookingNavState={props.setBookingNavState}
                            setNavState={props.setNavState} />
                    }

                }) : <div className='w-full'>
                    <p className='text-center text-blue-500 mt-4'>This is very beginning of your bookings with Career Paths.</p>
                    <p className='text-center text-xs mt-4'>Your first booking will appear here when you get a booking in-app.</p>
                </div>}
            </div>}

            {navState === 4 && <div className='flex flex-wrap'>
                {cancelled.length > 0 ? cancelled.map((m) => {
                    let counter2 = counter
                    if (counter === 3) {
                        counter = 0
                    } else {
                        counter += 1
                    }
                    console.log(m, 'm?.Professionals_Metadatum?.User?.profile_photo');
                    console.log(m?.User?.profile_photo, "upcomming")
                    if (type === 'professional') {
                        return <Bookings
                            bookingID={m.id}
                            time={m.booking_time}
                            prof_firstName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.first_name : m.Professionals_Metadatum?.User?.first_name}
                            prof_lastName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.last_name : m.Professionals_Metadatum?.User?.last_name}
                            professionalImage={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.profile_photo : m.Professionals_Metadatum?.User?.profile_photo}
                            backImage={backArray[counter2]}
                            user={props.user}
                            session_duration={m.session_duration}
                            setBookingNavState={props.setBookingNavState}
                            setNavState={props.setNavState} />
                    } else if (type === 'customer') {
                        return <Bookings
                            bookingID={m.id}
                            time={m.booking_time}
                            prof_firstName={m.Professionals_Metadatum?.User?.first_name}
                            prof_lastName={m.Professionals_Metadatum?.User?.last_name}
                            professionalImage={m.Professionals_Metadatum?.User?.profile_photo}
                            backImage={backArray[counter2]}
                            user={props.user}
                            session_duration={m.session_duration}
                            setBookingNavState={props.setBookingNavState}
                            setNavState={props.setNavState} />
                    }

                }) : <div className='w-full'>
                    <p className='text-center text-blue-500 mt-4'>This is very beginning of your bookings with Career Paths.</p>
                    <p className='text-center text-xs mt-4'>Your first booking will appear here when you get a booking in-app.</p>
                </div>}
            </div>}

            {navState === 5 && <div className='flex flex-wrap'>
                {completed.length > 0 ? completed.map((m) => {
                    let counter2 = counter
                    if (counter === 3) {
                        counter = 0
                    } else {
                        counter += 1
                    }
                    console.log(m, 'm?.Professionals_Metadatum?.User?.profile_photo');
                    console.log(m?.User?.profile_photo, "upcomming")
                    if (type === 'professional') {
                        return <Bookings
                            bookingID={m.id}
                            time={m.booking_time}
                            prof_firstName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.first_name : m.Professionals_Metadatum?.User?.first_name}
                            prof_lastName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.last_name : m.Professionals_Metadatum?.User?.last_name}
                            professionalImage={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.profile_photo : m.Professionals_Metadatum?.User?.profile_photo}
                            backImage={backArray[counter2]}
                            user={props.user}
                            session_duration={m.session_duration}
                            setBookingNavState={props.setBookingNavState}
                            setNavState={props.setNavState} />
                    } else if (type === 'customer') {
                        return <Bookings
                            bookingID={m.id}
                            time={m.booking_time}
                            prof_firstName={m.Professionals_Metadatum?.User?.first_name}
                            prof_lastName={m.Professionals_Metadatum?.User?.last_name}
                            professionalImage={m.Professionals_Metadatum?.User?.profile_photo}
                            backImage={backArray[counter2]}
                            user={props.user}
                            session_duration={m.session_duration}
                            setBookingNavState={props.setBookingNavState}
                            setNavState={props.setNavState} />
                    }

                }) : <div className='w-full'>
                    <p className='text-center text-blue-500 mt-4'>This is very beginning of your bookings with Career Paths.</p>
                    <p className='text-center text-xs mt-4'>Your first booking will appear here when you get a booking in-app.</p>
                </div>}
            </div>}

            {navState === 6 && <div className='flex flex-wrap'>
                {all.length > 0 ? all.map((m) => {
                    let counter2 = counter
                    if (counter === 3) {
                        counter = 0
                    } else {
                        counter += 1
                    }
                    console.log(m, 'm?.Professionals_Metadatum?.User?.profile_photo');
                    console.log(m?.User?.profile_photo, "upcomming")
                    if (type === 'professional') {
                        return <Bookings
                            bookingID={m.id}
                            time={m.booking_time}
                            prof_firstName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.first_name : m.Professionals_Metadatum?.User?.first_name}
                            prof_lastName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.last_name : m.Professionals_Metadatum?.User?.last_name}
                            professionalImage={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.profile_photo : m.Professionals_Metadatum?.User?.profile_photo}
                            backImage={backArray[counter2]}
                            user={props.user}
                            session_duration={m.session_duration}
                            setBookingNavState={props.setBookingNavState}
                            setNavState={props.setNavState} />
                    } else if (type === 'customer') {
                        return <Bookings
                            bookingID={m.id}
                            time={m.booking_time}
                            prof_firstName={m.Professionals_Metadatum?.User?.first_name}
                            prof_lastName={m.Professionals_Metadatum?.User?.last_name}
                            professionalImage={m.Professionals_Metadatum?.User?.profile_photo}
                            backImage={backArray[counter2]}
                            user={props.user}
                            session_duration={m.session_duration}
                            setBookingNavState={props.setBookingNavState}
                            setNavState={props.setNavState} />
                    }

                }) : <div className='w-full'>
                    <p className='text-center text-blue-500 mt-4'>This is very beginning of your bookings with Career Paths.</p>
                    <p className='text-center text-xs mt-4'>Your first booking will appear here when you get a booking in-app.</p>
                </div>}
            </div>}
        </div>
    )
}

export default BookingPageMainContent;


const Bookings = ({ time, prof_firstName, prof_lastName, professionalImage, bookingID, session_duration, backImage }) => {
    return (
        <Link to={`${bookingID}`}>
            <div className="text-white hover:shadow-2xl p-2 pt-4 overflow-y-hidden bg-blue-200 rounded-xl flex flex-col items-center m-2 h-48" style={{
                backgroundImage: `url(${backImage})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width: '160px'
            }}>
                <div className="flex items-center" >
                    <img src={professionalImage ? professionalImage : '/avatar.png'} alt="elo0n" className="z-20 w-16 h-16 rounded-full object-cover" />
                    {/* <img src={user.profile_photo ? user.profile_photo : '/avatar.png'} alt="e" className="z-10 -m-4 w-12 h-12 object-cover rounded-full" /> */}
                </div>
                <p className="text-sm">Meeting at</p>
                <p className=" text-sm font-bold">{`${moment(time * 1000).format("hh:mm A")}`}</p>
                {/* <p className="text-lg mt-1">with</p> */}
                <p className="text-xs mt-1 text-center">with {`${prof_firstName} ${prof_lastName} `}-{session_duration} min</p>
                <button className="text-xs mt-4 flex items-center justify-center"
                // onClick={() => {
                //     // setBookingNavState(1)
                // }}
                >View Details <span className='ml-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg></span></button>
            </div>
        </Link>
    )
}