import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Colors from '../Colors/Colors'
import Education from '../Profile/Education/Education'
import jwt_decode from 'jwt-decode'
const EducationHistory = (props) => {
    localStorage.setItem("navState", 8)
    const [education, setEducation] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/education/${jwt_decode(localStorage.getItem("customer_signup_token")).id}`).then((response) => {
            console.log(response.data)
            setEducation(response.data)
        }).catch(e => {
            console.log(e)
        })
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/customers/${jwt_decode(localStorage.getItem("customer_signup_token")).id}`).then((response) => {
            console.log(response)
        }).catch(e => {
            console.log(e)
        })
    }, [])
    return (
        <div className="flex flex-col justify-center items-center text-gray-500 w-full">
            <img src="/addEducation.png" alt="workexperience" className="w-36" />
            <p className="text-2xl font-bold mt-3 text-gray-700">Education</p>
            <p className="text-xs mt-3 text-center">Add details about your relevent qualifications here</p>
            <div className="mt-6 w-full">
                {education.map(m => {
                    return <Education
                        universityImage="/avatar.png"
                        education_type={m.field_of_study}
                        universityName={m.school}
                        startDate={m.start_date}
                        endDate={m.end_date} />
                })}
            </div>
            <button className="w-full py-2 rounded-lg text-white mt-4" style={{ backgroundColor: Colors.blue }}
                onClick={() => { props.setNavState(props.navState - 1) }}>Add Education</button>
            <div className="w-full flex justify-end items-center mt-4 text-white">
                <button className="py-2  px-8 rounded-lg flex" style={{ backgroundColor: Colors.blue }}
                    onClick={() => { props.setNavState(props.navState + 1) }}>
                    <p >Next</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default EducationHistory
