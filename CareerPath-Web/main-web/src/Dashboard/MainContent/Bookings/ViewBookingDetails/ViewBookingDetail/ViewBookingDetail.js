import React from 'react'

const ViewBookingDetail = () => {
    return (
        <div className="p-8 bg-white mt-4 rounded">
            <p className="font-bold mb-10 text-xl">Booking Details</p>
            <div>
                <p className="text-xs text-gray-500 ">Date Time:</p>
                <p className="text-sm text-gray-800 font-bold">March 04,2021 at 09:15 AM</p>
            </div>
            <hr className="my-7" />
            <p className="text-sm text-gray-800 font-bold">What is About</p>
            <p className="text-xs text-gray-500 mt-1">a quick vrown fox jumps over the lazy dog a quick vrown fox jumps over the lazy dog a quick vrown fox jumps over the lazy dog a quick vrown fox jumps over the lazy dog a quick vrown fox jumps over the lazy dog a quick vrown fox jumps over the lazy doga quick vrown fox jumps over the lazy dog</p>
            <hr className="my-7" />
            <div className="mb-8">
                <p className="text-xs text-gray-500 ">Topic</p>
                <p className="text-sm text-gray-800 font-bold">Career Advice</p>
            </div>
            <button className="bg-green-600 text-sm text-white w-full rounded py-3">Accept</button>
            <div  className="flex mt-4">
                <button className="bg-gray-800 text-sm text-white w-full rounded py-3">Reschedule</button>
                <button className="ml-4 bg-red-600 text-sm text-white w-full rounded py-3">Decline</button>
            </div>
        </div>
    )
}

export default ViewBookingDetail
