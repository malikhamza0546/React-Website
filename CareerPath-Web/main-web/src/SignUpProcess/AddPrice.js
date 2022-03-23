import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Colors from '../Colors/Colors'
import jwt_decode from "jwt-decode";

const AddPrice = (props) => {
    localStorage.setItem("navState", 13)
    const [session_15_price, setSession_15_price] = useState(null)
    const [session_30_price, setSession_30_price] = useState(null)
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/professionals/${jwt_decode(localStorage.getItem("signup_token")).id}`).then((response) => {
            console.log(response)
            setSession_15_price(response.data.session_price_15_min)
            setSession_30_price(response.data.session_price_30_min)
        }).catch(e => {
            console.log(e)
        })
    }, [])

    return (
        <div className="flex flex-col justify-center items-center text-gray-500 w-full">
            <img src="/addPrice.png" alt="workexperience" className="w-36" />
            <p className="text-2xl font-bold mt-3 text-gray-700">Pricing</p>
            <p className="text-xs mt-3 text-center">Let your customers know how much a session with you will cost. Remember you can always use our auto price calculator if you need help!</p>
            <div className="w-full flex mt-4">
                <div className="w-1/2">
                    <label className="block text-gray-900 text-sm mb-2" for="15min">
                        15 min
                    </label>
                    <div className="flex border border-gray-300 rounded-lg ">
                        <p className="bg-blue-500 px-4 flex items-center justify-center rounded text-white" style={{ backgroundColor: Colors.darkBlue }}>£</p>
                        <input className="text-sm rounded-lg w-full  py-2 px-3 text-gray-700  focus:outline-none" type="number" placeholder="150.00" value={session_15_price}
                            onChange={(e) => {
                                    setSession_15_price(e.target.value)
                            }} />
                    </div>
                </div>
                <div className="w-1/2 ml-1">
                    <label className="block text-gray-900 text-sm mb-2" for="30min">
                        30 min
                    </label>
                    <div className="flex border border-gray-300 rounded-lg ">
                        <p className="bg-blue-500 px-4 flex items-center justify-center rounded text-white" style={{ backgroundColor: Colors.darkBlue }}>£</p>
                        <input className="text-sm rounded-lg w-full  py-2 px-3 text-gray-700  focus:outline-none" type="number" placeholder="300.00"
                            value={session_30_price}
                            onChange={(e) => {
                                    setSession_30_price(e.target.value)
                            }} />
                    </div>
                </div>
            </div>
            <div>
                 <p className='text-xs mt-2 w-full text-center italic'>Note: Please remember to take into account that CareerPaths will deduct 25% commission from your quoted price.</p>
            </div>
            <button className="mt-4 font-light underline" style={{ color: Colors.blue }}
                onClick={() => { props.setNavState(props.navState + 1) }}>Let us adjust your price accordingly</button>
            <div className="w-full flex justify-end items-center mt-4 text-white">
                <button className="py-2  px-8 rounded-lg flex" style={{ backgroundColor: Colors.blue }}
                    onClick={
                        () => {
                            if (session_15_price !== null && session_30_price !== null) {
                                props.setNavState(16)
                            }
                        }
                    }>
                    <p>Next</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>

        </div>
    )
}

export default AddPrice
