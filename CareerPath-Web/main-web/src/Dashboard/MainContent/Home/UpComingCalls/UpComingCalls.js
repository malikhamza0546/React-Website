import moment from 'moment';
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import RightArrow from '../../../../Arrows/RightArrow'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LeftArrow from '../../../../Arrows/LeftArrow';
const UpComingCalls = (props) => {
    const [backArray] = useState(['/backOrange.png', '/backBlue.png', '/backPurple.png', '/greenish.png'])
    const [settings] = useState({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: props.upCommingCalls.length < 3 ? props.upCommingCalls.length : 3,
        slidesToScroll: 1,
        arrows: false
    })
    let type = JSON.parse(localStorage.getItem('type'))
    const Ref = useRef(null);
    let counter = 0
    const SlickNext = () => {
        Ref.current.slickNext()
    }
    const SlickPrev = () => {
        Ref.current.slickPrev()
    }
    return (
        <div className="p-4 pt-6 w-full">
            <div>
                {props.upCommingCalls.length < 3 ? <div className="text-white">
                    <div className="flex justify-between items-center w-full mx-1">
                        <div className="flex items-center">
                            <p className="text-gray-800 text-lg ml-1 font-bold">{type === 'professional' ? 'Your Upcoming Calls' : 'Confirmed bookings'}</p>
                        </div>
                    </div>
                    <div className="w-full flex mt-4">
                        {console.log(props.upCommingCalls, "props.upCommingCalls")}
                        {props.upCommingCalls.map(m => {
                            let counter2 = counter
                            if (counter === 3) {
                                counter = 0
                            } else {
                                counter += 1
                            }
                            if (type === 'professional') {
                                return <UpComingCall
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
                                    arrLength={props.upCommingCalls.length}
                                />
                            } else if (type === 'customer') {
                                return <UpComingCall
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
                                    arrLength={props.upCommingCalls.length}
                                />
                            }
                        })}
                    </div>
                </div> : <div className="text-white">
                    <div className="flex justify-between items-center w-full mx-1">
                        <div className="flex items-center">
                            <p className="text-gray-800 text-lg ml-1 font-bold">{props.user.User?.type === 'professional' ? 'Your Upcoming Calls' : 'Confirmed bookings'}</p>
                        </div>
                        <div className="text-md text-gray-600 flex flex-row items-center mr-2">
                            <LeftArrow click={SlickPrev} />
                            <RightArrow click={SlickNext} />
                        </div>
                    </div>
                    <div className="w-full flex mt-4">
                        {console.log(props.upCommingCalls, "props.upCommingCalls")}
                        <Slider className="w-full" {...settings}
                            ref={Ref}>
                            {props.upCommingCalls.map(m => {
                                let counter2 = counter
                                if (counter === 3) {
                                    counter = 0
                                } else {
                                    counter += 1
                                }
                                if (type === 'professional') {
                                    return <UpComingCall
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
                                        arrLength={props.upCommingCalls.length}
                                    />
                                } else if (type === 'customer') {
                                    return <UpComingCall
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
                                        arrLength={props.upCommingCalls.length}
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

export default UpComingCalls

const UpComingCall = ({ time, prof_firstName, prof_lastName, professionalImage, arrLength, bookingID, user, setNavState, setBookingNavState, session_duration, backImage }) => {
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
