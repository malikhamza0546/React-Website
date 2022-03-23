import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import BookingMainContent from './BookingMainContent/BookingMainContent'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import Colors from '../Colors/Colors'

const BookingPage = () => {
    const [profile, setProfile] = useState([])
    const location = useLocation();

    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/professionals/${id}`).then((response) => {
            setProfile(response.data)
            console.log(response.data, "response data")
            console.log("iddd");
        }).catch(e => {
            console.log('Error in Booking page Professional Api')
        })
    }, [])

    return (
        <div className="bg-gray-100 h-screen w-full"
            style={{ backgroundColor: Colors.gray }}>
            <Navbar />
            <hr />
            <div className="container mx-auto  px-56 py-2">
                <p className="text-2xl font-bold mt-6"> Well this is exciting! You're about to meet with {profile.User?.first_name} {profile.User?.last_name}</p>
            </div>
            <BookingMainContent location={location.state}
                id={id} />
        </div>
    )
}

export default BookingPage
