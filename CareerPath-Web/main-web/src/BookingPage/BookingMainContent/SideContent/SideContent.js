import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { pricetoDecimal } from '../../../price'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const SideContent = (props) => {
    const [profile, setProfile] = useState([]);
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/professionals/${props.location.id}`).then((response) => {
            setProfile(response.data)
        })
    }, [])

    // useEffect(() => {
    //     let token=JSON.parse(localStorage.getItem("token"))
    //     console.log(token);
    //     axios.get(`https://dev.careerpaths.io/api/professionals/2/topics_of_discussion`,{
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer '+token
    //         }  
    //     }).then((response) => {
    //         console.log(response.data.message);
    //         // setProfile(response)
    //     })
    // }, [])
    return (
        <div className="w-1/3 rounded bg-white p-6 px-8">
            {/* Back Buttons */}
            <button className="bg-gray-300 hover:bg-gray-200 rounded-full" onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-1" fill="none" viewBox="0 0 24 24" stroke="gray">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
            </button>
            {/* Profile and Name */}
            <div className="flex items-center mt-4">
                <div className="w-20 h-20 rounded-full border border-blue-400 flex items-center justify-center">
                    <img src={profile.User?.profile_photo ? profile.User?.profile_photo : '/avatar.png'} alt="alon" className="w-20 h-20 rounded-full p-1 object-cover" />
                </div>
                <p className="text-2xl font-bold text-gray-900 ml-3 truncate">{profile.User?.first_name} {profile.User?.last_name}</p>
            </div>
            {/* Text */}
            <div className="mt-4">
                <p className="text-lg font-bold text-gray-800">CareerPaths live video calls with {profile.User?.first_name} {profile.User?.last_name}</p>
            </div>
            {/* Time and Money */}
            <div className="mt-4">
                <div className="flex">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="gray">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <p className="text-sm text-gray-800 ml-3">{props.location.minutes} min</p>
                </div>
                <div className="flex mt-1">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="gray">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <p className="text-sm text-gray-800 ml-3">{pricetoDecimal(props.propslocationprice)}</p>
                </div>
            </div>
            {props.topicBooking !== null ? <div className="mt-2 flex">
                {/* <p className="text-sm text-gray-700">Web Conferencing details provided upon confirmation</p> */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="gray">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-gray-800 ml-3">{props.topicBooking !== null ? props.topicBooking.label : ''}</p>
            </div> : null}
            {props.dateBooking !== null ? <div className="flex mt-2">
                {/* <p className="text-sm text-gray-700">Web Conferencing details provided upon confirmation</p> */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="gray">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <p className="ml-3 text-sm text-gray-800">{props.dateBooking !== null ? `${moment(props.dateBooking).format('dddd')}, ${props.dateBooking.getDate()} ${moment(props.dateBooking).format('MMMM')},${props.timeSlotBooking !== null ? props.timeSlotBooking : ''} ` : ''}</p>
            </div> : null}
        </div>
    )
}

export default SideContent
