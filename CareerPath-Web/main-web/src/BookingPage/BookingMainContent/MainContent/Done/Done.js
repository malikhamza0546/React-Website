import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '@culturehq/add-to-calendar/dist/styles.css';
import AddToCalendar from '@culturehq/add-to-calendar';
import moment from 'moment';
import { number, string } from 'yup/lib/locale';
import "./AddToCalender.css";

const Done = (props) => {

    let navigate = useNavigate();
    let monthValue = "";
    let booking_date = new Date(props.dateBooking);
    const booking_time = props.timeSlot.split(" ");
    let hours_mint = booking_time[0].split(":");
    if (booking_time[1] === "PM") {
        hours_mint[0] = parseInt(hours_mint[0]) + 12;
    }
    booking_date = booking_date.setHours((hours_mint[0]), hours_mint[1]);
    let booking_date_end = new Date(booking_date).setMinutes(parseInt(props.sessionDuration) + parseInt(hours_mint[1]));
    let dateString = props.dateBooking.getFullYear() + "-" + monthValue + '-';
    dateString = new Date(dateString);
    let AfterConvertingtoUTC = moment(booking_date).utcOffset('GMT-06:00').format();

    return (
        <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold mt-8">Your Request has</p>
            <p className="text-2xl font-bold">been Sent</p>
            <p className="text-sm text-gray-500 mt-3">Your Request was sent to Elon Musk.You</p>
            <p className="text-sm text-gray-500">should recieve an Email Shortly</p>
            <div style={{ color: "black" }}>
                <AddToCalendar className="chq-atc--button "
                    event={{
                        name: props.selectedOption.label,
                        details: props.textBody,

                        startsAt: AfterConvertingtoUTC,
                        endsAt: booking_date_end
                    }}
                />
            </div>

            <button onClick={() => { navigate('/dashboard/home') }} className="border rounded px-4 py-4 w-1/2 mt-3">Done</button>
        </div>
    )
}

export default Done
