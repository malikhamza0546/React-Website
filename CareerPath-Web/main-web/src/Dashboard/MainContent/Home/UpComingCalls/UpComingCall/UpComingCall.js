import React from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const UpComingCall = ({ time, prof_firstName, prof_lastName, professionalImage,bookingID, user,setNavState,setBookingNavState, session_duration, backImage }) => {
    const navigate=useNavigate()
    return (
        <div className="text-white hover:shadow-2xl p-2 pt-4 overflow-y-hidden bg-blue-200 rounded-xl flex flex-col items-center h-48 m-2" style={{
            backgroundImage: `url(${backImage})`, backgroundPosition: 'center',
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
            <p className="text-xs mt-1 text-center">with {`${prof_firstName} ${prof_lastName} `}-{session_duration}min</p>
            <button className="text-xs mt-4 flex items-center justify-center"
            onClick={()=>{
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


export default UpComingCall
