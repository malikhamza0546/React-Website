import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import Colors from '../../../../Colors/Colors'
import Ratings from '../../../../Rating/Ratings'
import './ViewBookings.css'
import BookingPageMainContent from './BookingPageMainContent/BookingPageMainContent'
import { Route, Routes } from 'react-router-dom'
import BookingDetails from './BookingDetails/BookingDetails'

<Loader
    type="TailSpin"
    color={Colors.blue}
    height={200}
    width={200}
// timeout={5000} //5 secs
/>
const ViewBookings = (props) => {
    return (
        <div>
            <Routes>
                <Route path ="/" element={<BookingPageMainContent user={props.user} bookingNavState={props.bookingNavState}
                setBookingNavState={props.setBookingNavState}/>}/>
                <Route path =":id" element={<BookingDetails user={props.user} bookingNavState={props.bookingNavState}
                setBookingNavState={props.setBookingNavState}/>}/>    
            </Routes>
            {/* {ComponentToRender} */}
        </div>
    )
}

export default ViewBookings



