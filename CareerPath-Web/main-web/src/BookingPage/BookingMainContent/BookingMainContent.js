import React, { useState } from 'react'
import MainContent from './MainContent/MainContent'
import SideContent from './SideContent/SideContent'

const BookingMainContent = (props) => {

    const [topicBooking, setTopicBooking] = useState(null)
    const [dateBooking, setDateBooking] = useState(null)
    const [timeSlotBooking, setTimeSlotBooking] = useState(null)
    const [propslocationprice, setPropslocationprice] = useState((props.location.price));

    const propsLocationPriceHandler = (x) => {

        // setPropslocationprice(x);
    }
    return (
        <div className="container mx-auto  px-56 py-2 flex">
            <SideContent
                location={props.location}
                topicBooking={topicBooking}
                setTopicBooking={setTopicBooking}
                dateBooking={dateBooking}
                setDateBooking={setDateBooking}
                timeSlotBooking={timeSlotBooking}
                setTimeSlotBooking={setTimeSlotBooking}
                propslocationprice={propslocationprice}
            />

            <MainContent
                location={props.location}
                Handler={propsLocationPriceHandler}
                topicBooking={topicBooking}
                setTopicBooking={setTopicBooking}
                dateBooking={dateBooking}
                setDateBooking={setDateBooking}
                timeSlotBooking={timeSlotBooking}
                setTimeSlotBooking={setTimeSlotBooking}
                propslocationprice={propslocationprice}
                id={props.id} />
        </div>
    )
}

export default BookingMainContent
