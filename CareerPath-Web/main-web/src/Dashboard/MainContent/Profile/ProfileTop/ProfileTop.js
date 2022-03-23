import React, { useEffect, useState } from 'react'
import ProfileTopUpcoming from './ProfileTopUpcoming/ProfileTopUpcoming'
import ProfileBookingRequests from './ProfileTopBookingRequests/ProfileTopBookingRequests'
import Loader from 'react-loader-spinner'
import Colors from '../../../../Colors/Colors'
import axios from 'axios'

const ProfileTop = (props) => {
    const [navStateProfileTop, setNavStateProfileTop] = useState(0)
    const [upCommingCalls, setUpcommingCalls] = useState([])
    const [bookingRequests, setBookingRequests] = useState([])
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/bookings?status=approved&limit=100`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log('>>>upcomming calls from majid', response);
            console.log(response.data.message);
            setUpcommingCalls(response.data.message)
            setLoading(false)
        })
    }, [])
    console.log(props.user);
    useEffect(() => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/bookings?status=pending&limit=100`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log('>>>', response.data.message);
            console.log('>>>', response);
            setBookingRequests(response.data.message)
            setLoading(false)
        })
    }, [])
    let ComponentToRender = null
    switch (navStateProfileTop) {
        case 0:
            ComponentToRender = isLoading ? <div className='flex justify-center items-center'> <Loader
                type="TailSpin"
                color={Colors.blue}
                height={100}
                width={100}
            /> </div> : upCommingCalls.length > 0 ? <ProfileTopUpcoming
                user={props.user}
                setNavStateProfileTop={setNavStateProfileTop}
                upCommingCalls={upCommingCalls}
                setUpcommingCalls={setUpcommingCalls}
                setBookingNavState={props.setBookingNavState}
                setNavState={props.setNavState} /> : <div className='font-bold p-4 text-2xl'>No upcomming calls to Show</div>
            break;
        case 1:
            ComponentToRender = isLoading ? <div className='flex justify-center items-center'> <Loader
                type="TailSpin"
                color={Colors.blue}
                height={100}
                width={100}
            /> </div> : bookingRequests.length > 0 ? <ProfileBookingRequests
                user={props.user}
                setNavStateProfileTop={setNavStateProfileTop}
                bookingRequests={bookingRequests}
                setBookingRequests={setBookingRequests}
                setBookingNavState={props.setBookingNavState}
                setNavState={props.setNavState} /> : <div className='font-bold p-4 text-2xl'>No booking requests to Show</div>
            break;
        default:
            return null

    }
    return (
        <div className="p-4 rounded bg-white">
            <div className="mt-2">
                {ComponentToRender}
            </div>
        </div>
    )
}


export default ProfileTop
