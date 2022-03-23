import moment from 'moment';
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import RightArrow from '../../../Arrows/RightArrow'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LeftArrow from '../../../Arrows/LeftArrow';
const BookingRequests = (props) => {
    const [backArray] = useState(['/backOrange.png', '/backBlue.png', '/backPurple.png', '/greenish.png'])
    const [settings] = useState({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: props.bookingRequests.length < 3 ? props.bookingRequests.length : 3,
        slidesToScroll: 1,
        arrows: false
    })
    const Ref = useRef(null);
    let counter = 0
    let type = JSON.parse(localStorage.getItem('type'))
    const SlickNext = () => {
        Ref.current.slickNext()
    }
    const SlickPrev = () => {
        Ref.current.slickPrev()
    }
    return (
        <div className="p-4 pt-6 w-full">
            <div className="text-white">
                {props.bookingRequests.length < 3 ? <div>
                    <div className="flex justify-between items-center w-full mx-1">
                        <div className="flex items-center">
                            <p className="text-gray-800 text-lg ml-1 font-bold">{type === 'professional' ? 'Booking Requests' : 'Waiting for confirmation'}</p>
                        </div>
                    </div>
                    <div className="w-full flex mt-4">
                        {console.log(props.bookingRequests, "props.bookingRequests")}
                        {props.bookingRequests.map(m => {
                            let counter2 = counter
                            if (counter === 3) {
                                counter = 0
                            } else {
                                counter += 1
                            }
                            if (type === 'professional') {
                                return <BookingRequest
                                    bookingID={m.id}
                                    time={m.booking_time}
                                    prof_firstName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.first_name : m.Professionals_Metadatum?.User?.first_name}
                                    prof_lastName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.last_name : m.Professionals_Metadatum?.User?.last_name}
                                    professionalImage={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.profile_photo : m.Professionals_Metadatum?.User?.profile_photo}
                                    user={props.user}
                                    session_duration={m.session_duration}
                                    backImage={backArray[counter2]}
                                    setBookingNavState={props.setBookingNavState}
                                    setNavState={props.setNavState}
                                    arrLength={props.bookingRequests.length}
                                />
                            } else if (type === 'customer') {
                                return <BookingRequest
                                    bookingID={m.id}
                                    time={m.booking_time}
                                    prof_firstName={m.Professionals_Metadatum?.User?.first_name}
                                    prof_lastName={m.Professionals_Metadatum?.User?.last_name}
                                    professionalImage={m.Professionals_Metadatum?.User?.profile_photo}
                                    user={props.user}
                                    session_duration={m.session_duration}
                                    backImage={backArray[counter2]}
                                    setBookingNavState={props.setBookingNavState}
                                    setNavState={props.setNavState}
                                    arrLength={props.bookingRequests.length}
                                />
                            }
                        })}
                    </div>
                </div> : <div>
                    <div className="flex justify-between items-center w-full mx-1">
                        <div className="flex items-center">
                            <p className="text-gray-800 text-lg ml-1 font-bold">{type === 'professional' ? 'Booking Requests' : 'Waiting for confirmation'}</p>
                        </div>
                        <div className="text-md text-gray-600 flex flex-row items-center mr-2">
                            <LeftArrow click={SlickPrev} />
                            <RightArrow click={SlickNext} />
                        </div>
                    </div>
                    <div className="w-full flex mt-4">
                        <Slider className="w-full" {...settings}
                            ref={Ref}>
                            {props.bookingRequests.map(m => {
                                let counter2 = counter
                                if (counter === 3) {
                                    counter = 0
                                } else {
                                    counter += 1
                                }
                                if (type === 'professional') {
                                    return <BookingRequest
                                        bookingID={m.id}
                                        time={m.booking_time}
                                        prof_firstName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.first_name : m.Professionals_Metadatum?.User?.first_name}
                                        prof_lastName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.last_name : m.Professionals_Metadatum?.User?.last_name}
                                        professionalImage={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.profile_photo : m.Professionals_Metadatum?.User?.profile_photo}
                                        session_duration={m.session_duration}
                                        backImage={backArray[counter2]}
                                        arrLength={props.bookingRequests.length}
                                    />
                                } else if (type === 'customer') {
                                    return <BookingRequest
                                        bookingID={m.id}
                                        time={m.booking_time}
                                        prof_firstName={m.Professionals_Metadatum?.User?.first_name}
                                        prof_lastName={m.Professionals_Metadatum?.User?.last_name}
                                        professionalImage={m.Professionals_Metadatum?.User?.profile_photo}
                                        session_duration={m.session_duration}
                                        backImage={backArray[counter2]}
                                        arrLength={props.bookingRequests.length}
                                    />
                                }
                            })}
                        </Slider>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default BookingRequests

const BookingRequest = ({ time, prof_firstName, prof_lastName, professionalImage, arrLength, bookingID, session_duration, backImage }) => {
    const navigate = useNavigate()
    return (
        <div className="hover:shadow text-white p-2 pt-4 overflow-y-hidden bg-blue-200 rounded-xl flex flex-col items-center h-48 m-2" style={{
            backgroundImage: `url(${backImage})`, backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: arrLength < 3 ? '180px' : ''
        }}>
            <div className="flex items-center" >
                <img src={professionalImage ? professionalImage : '/avatar.png'} alt="elo0n" className="w-16 h-16 rounded-full object-cover" />
                {/* <img src={user.profile_photo ? user.profile_photo : '/avatar.png'} alt="e" className="z-10 -m-4 w-12 h-12 object-cover rounded-full" /> */}
            </div>
            <p className="text-sm">Meeting at</p>
            <p className=" text-sm font-bold">{`${moment(time * 1000).format("hh:mm A")}`}</p>
            {/* <p className="text-lg mt-1">with</p> */}
            <p className="text-xs mt-1 text-center">with {`${prof_firstName} ${prof_lastName} `}-{session_duration}min</p>
            <button className="text-xs mt-4 flex items-center justify-center"
                onClick={() => {
                    navigate(`/dashboard/bookings/${bookingID}`)
                    // setNavState(2)
                    // setBookingNavState(1)
                }
                }>View Details <span className='ml-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg></span></button>
        </div>
    )
}

