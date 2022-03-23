import React, { Component, useState, useRef } from 'react'
import LeftArrow from '../../../../../Arrows/LeftArrow'
import RightArrow from '../../../../../Arrows/RightArrow'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import moment from 'moment';
import Colors from '../../../../../Colors/Colors';
import { useNavigate } from 'react-router-dom';

const ProfileTopUpcoming = (props) => {
    const [colors] = useState(['#faab35', '#28bbfa', '#8a6ce0'])
    const [settings] = useState({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: props.upCommingCalls.length < 2 ? props.upCommingCalls.length : 2,
        slidesToScroll: 1,
        arrows: false
    })
    const Ref = useRef(null);
    let counter = 0
    let type = JSON.parse(localStorage.getItem('type'))
    console.log(props.upCommingCalls.length, "props.upCommingCalls.length")
    const SlickNext = () => {
        Ref.current.slickNext()
    }
    const SlickPrev = () => {
        Ref.current.slickPrev()
    }
    return (
        <div className="text-white">
            <div className="flex justify-between items-center w-full mx-1">
                <div className="flex items-center">
                    <button className="px-3 py-2 text-sm bg-blue-400 hover:bg-blue-600 rounded text-white " style={{ backgroundColor: Colors.blue }}>{type === 'professional' ? 'Your Upcoming Calls' : 'Confirmed bookings'}</button>
                    <button className="px-3 py-2 rounded hover:bg-gray-100 text-sm mx-2 text-gray-800" onClick={() => { props.setNavStateProfileTop(1) }}>{type === 'professional' ? 'Booking Requests' : 'Waiting for confirmation'}</button>
                </div>
                <div className="text-md text-gray-600 flex flex-row items-center mr-2">
                    <LeftArrow click={SlickPrev} />
                    <RightArrow click={SlickNext} />
                </div>
            </div>
            <div className="w-full flex">
                {console.log(props.upCommingCalls, "props.upCommingCalls")}
                <Slider className="w-full" {...settings}
                    ref={Ref}>
                    {props.upCommingCalls.map(m => {
                        let counter2 = counter
                        if (counter === 2) {
                            counter = 0
                        } else {
                            counter += 1
                        }
                        if (type === 'professional') {
                            return <UpCommingCall
                                bookingID={m.id}
                                time={m.booking_time}
                                prof_firstName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.first_name : m.Professionals_Metadatum?.User?.first_name}
                                prof_lastName={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.last_name : m.Professionals_Metadatum?.User?.last_name}
                                professionalImage={props.user.user_id === m.Professionals_Metadatum?.user_id ? m.User?.profile_photo : m.Professionals_Metadatum?.User?.profile_photo}
                                user={props.user}
                                session_duration={m.session_duration}
                                backColor={colors[counter2]}
                                setBookingNavState={props.setBookingNavState}
                                setNavState={props.setNavState}
                                arrLength={props.upCommingCalls.length}
                            />
                        } else if (type === 'customer') {
                            return <UpCommingCall
                                bookingID={m.id}
                                time={m.booking_time}
                                prof_firstName={m.Professionals_Metadatum?.User?.first_name}
                                prof_lastName={m.Professionals_Metadatum?.User?.last_name}
                                professionalImage={m.Professionals_Metadatum?.User?.profile_photo}
                                user={props.user}
                                session_duration={m.session_duration}
                                backColor={colors[counter2]}
                                setBookingNavState={props.setBookingNavState}
                                setNavState={props.setNavState}
                                arrLength={props.upCommingCalls.length}
                            />
                        }
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default ProfileTopUpcoming


const UpCommingCall = ({ time, prof_firstName, prof_lastName, professionalImage, bookingID, user, arrLength, setNavState, setBookingNavState, session_duration, backColor }) => {
    // console.log(time, prof_firstName, prof_lastName, professionalImage, session_duration,backColor, "dataaaa")
    const navigate = useNavigate()
    return (
        // <Link to={`${bookingID}`}>
        <div className="rounded flex items-center justify-center mx-1 h-20 mt-3" style={{ backgroundColor: backColor, width: arrLength < 2 ? '50%' : '' }}>
            <div >
                <img src={professionalImage ? professionalImage : '/avatar.png'} alt="elo0n" className="w-10 h-10 rounded-full object-cover" />
                {/* <img src={professionalImage} alt="e" className="z-10 -m-4 w-10 h-10 rounded-full object-cover" /> */}
            </div>
            <div className="text-xs ml-4">
                <p>Meeting at</p>
                <p className="font-bold text-sm">{`${moment(time * 1000).format("hh:mm A")}`}</p>
                <p className="text-xs">With {prof_firstName} {prof_lastName}-{session_duration}min</p>
            </div>
            <div className="ml-6">
                <button className="rounded-full bg-white"
                    onClick={() => {
                        navigate(`/dashboard/bookings/${bookingID}`)
                        // setNavState(2)
                        // setBookingNavState(1)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="gray">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="bg-white rounded-full h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="black">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg> */}
                </button>
            </div>
        </div>
        // </Link>
    )
}

