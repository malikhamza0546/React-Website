import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookingRequests from '../BookingRequests/BookingRequests'
import UpComingCalls from './UpComingCalls/UpComingCalls'
import Loader from 'react-loader-spinner'
import Colors from '../../../Colors/Colors'

const Home = (props) => {
    const [isLoading, setLoading] = useState(false)
    const [bookingRequests, setBookingRequests] = useState([])
    const [upCommingCalls, setUpcommingCalls] = useState([])

    useEffect(() => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/bookings?status=approved&limit=100`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            setUpcommingCalls(response.data.message)
            console.log(response.data.message, 'response.data.message')
            setLoading(false)
        })
    }, [])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/bookings?status=pending&limit=100`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            setBookingRequests(response.data.message)
            console.log(response.data.message, "response.data.message")
        })
    }, [])

    return (
        <div className="bg-white pb-8 mb-4 rounded">
            {isLoading ? <div className='flex justify-center items-center'> <Loader
                type="TailSpin"
                color={Colors.blue}
                height={100}
                width={100}
            /> </div> : upCommingCalls.length > 0 ? <UpComingCalls user={props.user} upCommingCalls={upCommingCalls}
                setBookingNavState={props.setBookingNavState}
                setNavState={props.setNavState} /> : <div className='font-bold p-4 text-2xl'>No upcomming calls to Show</div>}

            {bookingRequests.length > 0 ? <BookingRequests user={props.user} bookingRequests={bookingRequests}
                setBookingNavState={props.setBookingNavState}
                setNavState={props.setNavState} /> : <div className='font-bold p-4 text-2xl'>No booking requests to Show</div>}
        </div>
    )
}

export default Home
