import axios from 'axios';
import React, { useState } from 'react';
import Colors from '../Colors/Colors';
import jwt_decode from 'jwt-decode'
import Loader from "react-loader-spinner";

const CareerInsights = (props) => {
    localStorage.setItem("navState", 3)
    const [isLoading,setLoading]=useState(false)
    const [bio, setBio] = useState('')
    const upDateUser = () => {
        if (bio !== '') {
            setLoading(true)
            axios.put(process.env.REACT_APP_SERVER_PATH + `/users/${jwt_decode(localStorage.getItem("customer_signup_token")).id}`, {
                bio: bio
            }).then((r) => {
                console.log(r);
                props.setNavState(props.navState + 1)
            }).catch(e => {
                console.log('Error');
            })
        }
    }
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <img src="/CustomerFlow/Career insights.png" alt="location" className="w-36" />
            <p className="text-2xl font-bold mt-3 text-gray-800">Career Insights</p>
            <p className="text-xs mt-3 text-center">Tell us what type of insights you're after from a carerr mentor?</p>
            <div className="my-4 w-full text-xs font-bold">
                <label className="block text-gray-900  mb-2" for="bio">
                    Areas of development (280 charactors maximum)
                </label>
                <textarea className="resize-none border border-gray-300 rounded-md  border  w-full h-24 py-3 px-3 text-gray-700  focus:outline-none" id="bio" type="text" placeholder="I would like my mentor to help me with..."
                    value={bio} onChange={(e) => { setBio(e.target.value) }}></textarea>
            </div>
            <div className="w-full flex justify-end items-center mt-4 text-white">
                <button className="py-2  px-8 rounded-lg flex" style={{ backgroundColor: bio !== ''? Colors.blue:Colors.gray,color:bio !== ''?'white':'gray' }}
                    onClick={upDateUser}>
                    <p >Next {isLoading?<span className='inline-block ml-4'><Loader
                                type="TailSpin"
                                color="white"
                                height={20}
                                width={20}
                                // timeout={5000} //5 secs
                              /></span>:null}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
};

export default CareerInsights;
