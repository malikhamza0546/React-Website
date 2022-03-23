import React, { useState } from 'react'
import Colors from '../Colors/Colors'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import Loader from "react-loader-spinner";
const AddLocation = (props) => {
    localStorage.setItem("navState", 4)
    const [isLoading, setLoading] = useState(false)
    const [location, setLocation] = useState('')
    const [error, setError] = useState(false)
    const LocationAdded = () => {
        if (location !== '') {
            const body = {
                user_id: jwt_decode(localStorage.getItem("customer_signup_token")).id,
                location: location
            }
            setLoading(true)
            axios.post(process.env.REACT_APP_SERVER_PATH + `/customers`, body).then((r) => {
                console.log(r);
                props.setNavState(props.navState + 1)
                setLoading(false)
            }).catch(e => {
                console.log('Error');
            })
        } else {
            setError(true)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <img src="/CustomerFlow/Add your Location.png" alt="location" className="w-36" />
            <p className="text-2xl font-bold mt-3 text-gray-800">Add your Location</p>
            <p className="text-xs mt-3 text-center">this allows us to connect you with career mentors in your area</p>
            <div className="w-full text-xs font-bold mt-4">
                <label className="block text-gray-900 text-xs mb-2" for="location">
                    Location
                </label>
                <div className="border flex border-gray-300 rounded-lg items-center justify-between py-1 px-2">
                    <input className="text-sm rounded-lg w-full py-2 px-3 text-gray-700  focus:outline-none" id="location" type="text" placeholder="Enter Location" value={location} onChange={(e) => {
                        setError(false)
                        setLocation(e.target.value)
                    }} />
                </div>
                {error ? <p className='text-red-500 mt-2'>Location is emplty</p> : null}
            </div>
            <div className="w-full flex justify-end items-center mt-4 text-white">
                <button className="py-2  px-8 rounded-lg flex" style={{ backgroundColor: location !== '' ? Colors.blue : Colors.gray, color: location !== '' ? 'white' : 'gray' }}
                    onClick={LocationAdded}>
                    <p>Next {isLoading ? <span className='inline-block ml-4'><Loader
                        type="TailSpin"
                        color="white"
                        height={20}
                        width={20}
                    // timeout={5000} //5 secs
                    /></span> : null}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default AddLocation
