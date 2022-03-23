import axios from 'axios';
import React, { useState } from 'react'
import Colors from '../Colors/Colors'
import jwt_decode from "jwt-decode";
import Loader from 'react-loader-spinner'

const YearlySalary = (props) => {
    localStorage.setItem("navState", 14)
    const [isLoading, setLoading] = useState(false)
    const [yearlyMoney, setYearlyMoney] = useState('')
    const calculateYearlyPrices = async () => {
        setLoading(true)
        const totalprice = parseFloat(yearlyMoney).toFixed(2)
        const min_30_price = parseFloat(totalprice / (260 * 14)).toFixed(2)
        const min_15_price = parseFloat(totalprice / (260 * 28)).toFixed(2)
        // this.props.back_drop_press(min_30_price, min_15_price);
        axios.put(process.env.REACT_APP_SERVER_PATH + `/professionals/${jwt_decode(localStorage.getItem("signup_token")).id}`, {
            session_price_15_min: min_15_price,
            session_price_30_min: min_30_price
        }).then((r) => {
            console.log(r);
            // props.setNavState(props.navState + 1)
            axios.get(`${process.env.REACT_APP_SERVER_PATH}/professionals/${jwt_decode(localStorage.getItem("signup_token")).id}`).then((response) => {
                console.log("from yearly price", response)
                props.setNavState(props.navState - 1)
            }).catch(e => {
                console.log(e)
            })
        }).catch(e => {
            console.log('Error');
        })
    };

    return (
        <div className="flex flex-col justify-center items-center text-gray-500 w-full">
            <p className="text-2xl font-bold mt-3 text-gray-700">Enter your annual salary</p>
            <div className="bg-gray-100 w-full rounded my-6 p-8 flex justify-center items-center">
                <div className='bg-gray-100 w-full font-bold text-4xl  ml-4 flex items-center'>
                    <p className='mx-2 text-gray-400'>£</p>
                    <input className="bg-gray-100 focus:outline-none p-2 w-full font-bold" value={yearlyMoney}
                        type="number"
                        onChange={(e) => { setYearlyMoney(e.target.value) }}
                        placeholder='Yearly income' />
                </div>
            </div>
            <button className="w-full py-2 rounded-lg text-white flex items-center justify-center" style={{ backgroundColor: yearlyMoney !== '' ? Colors.blue : Colors.gray, color: yearlyMoney !== '' ? 'white' : 'gray' }}
                onClick={calculateYearlyPrices}>Calculate {isLoading ? <span className='inline-block ml-4'><Loader
                    type="TailSpin"
                    color="white"
                    height={20}
                    width={20}
                // timeout={5000} //5 secs
                /></span> : null}</button>
            {/* <div className="w-full flex justify-between items-center mt-4 text-white">
                <button className="py-2  px-8 rounded-lg" style={{ backgroundColor: Colors.blue }}
                    onClick={() => { props.setNavState(props.navState - 1) }}>Back</button>
                <button className="py-2  px-8 rounded-lg flex" style={{ backgroundColor: Colors.blue }}
                    onClick={() => { props.setNavState(props.navState + 1) }}>
                    <p >Next</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div> */}
        </div>
    )
}

export default YearlySalary
