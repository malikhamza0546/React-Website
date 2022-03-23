import React from 'react'
import './Notification.css'
const Notification = () => {
    return (
        <div className="flex justify-between">
            <div className="text-lg  text-gray-500">
                New Booking Requests
            </div>
            <div>
                <label for="toggleB" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input type="checkbox" id="toggleB" className="sr-only" />
                        <div id="back" className="block bg-blue-500 w-10 h-6 rounded-full"></div>
                        <div className="shadow-2xl dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                    </div>
                </label>
            </div>
        </div>
    )
}

export default Notification
