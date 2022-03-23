import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const ViewBooking = ({ time, meeting_with, professionalImage, clientImage, backImage }) => {
    let navigate = useNavigate();

     const handleViewDetail = async () => {
        
      alert('hello')
        navigate('/');

        
      }



    return (
        <div className=" text-white py-6 px-10 m-2 bg-blue-200 rounded-xl flex flex-col items-center hover:shadow-2xl" style={{
            backgroundImage: `url(${backImage})`, backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            <div className="flex items-center" >
                <img src={professionalImage} alt="elo0n" className="z-20 w-16 h-16 rounded-full" />
                <img src={clientImage} alt="e" className="z-10 -m-4 w-14 h-14 rounded-full" />
            </div>
            <p className="text-sm">Tommorow at</p>
            <p className=" text-sm font-bold">{time}AM</p>
            <p className="text-xs mt-4">with {meeting_with}-15min</p>
            <button onClick={handleViewDetail} className="text-xs mt-4">View Details </button>
        </div>
    )
}

export default ViewBooking
