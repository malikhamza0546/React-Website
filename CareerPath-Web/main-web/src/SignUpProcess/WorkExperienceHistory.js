import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Colors from '../Colors/Colors'
import jwt_decode from 'jwt-decode'
import moment from 'moment'
const WorkExperienceHistory = (props) => {
    localStorage.setItem("navState", 9)
    const [experience, setExperience] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/experience/${jwt_decode(localStorage.getItem("signup_token")).id}`).then((response) => {
            console.log("all experience", response.data);
            setExperience(response.data)
        }).catch(e => {
            console.log(e)
        })
    }, [])
    return (
        <div className="flex flex-col justify-center items-center text-gray-500 w-full">
            <img src="/addWorkExperience.png" alt="workexperience" className="w-36" />
            <p className="text-2xl font-bold mt-3 text-gray-700">Work experience</p>
            <p className="text-xs mt-3 text-center">Show off your work experience and increase your chances of being booked</p>
            <div className="mt-6 w-full">
                {
                    experience.map((m, i) => {
                        return <Experience
                            key={i}
                            companyImage=""
                            position={m.title}
                            companyName={m.company}
                            startDate={m.start_date}
                            endDate={m.end_date}
                            location={m.location}
                            description={m.description}
                            currentJob={m.current_job} />
                    })
                }
            </div>
            <button className="w-full py-2 rounded-lg text-white mt-4" style={{ backgroundColor: Colors.blue }}
                onClick={() => { props.setNavState(props.navState - 1) }}>Add Work Experience</button>
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

export default WorkExperienceHistory


const Experience = (props) => {
    console.log("curent job ", props.currentJob);

    const calcDate = (date1, date2) => {
        let diff = Math.floor(date1.getTime() - date2.getTime()) * -1;
        let day = 1000 * 60 * 60 * 24;

        let days = Math.floor(diff / day);
        let months = Math.floor(days / 31);
        let years = Math.floor(months / 12);
        let rem = months % 12;
        let message = years + " yrs "

        message += rem + " mos "

        return message
    }

    return (
        <div className="py-2">
            <div className="flex flex-row ">
                <img src={props.companyImage ? props.companyImage : '/avatar.png'} alt="" className="w-20 h-20 rounded-full object-cover" />
                <div className="flex flex-col ml-5" >
                    <p className="text-lg text-gray-500 font-bold">{props.position}</p>
                    <p className="text-sm text-black">{props.companyName} - {props.location}</p>
                    <div className='flex items-center justify-between w-full'>
                        <p className="text-sm text-gray-400"> {`${moment(props.startDate).format("MMM YYYY")} - `}</p>
                        {props.currentJob === "0" ? <p className="text-sm text-gray-400">&nbsp;Present</p> : <p className="text-sm text-gray-400">&nbsp;{`${moment(props.endDate).format("MMM YYYY")}`}</p>}
                        <p>&nbsp;&nbsp;•&nbsp;&nbsp;</p>
                        <p className="text-sm text-gray-400">  {
                            props.currentJob === "0"
                                ?
                                calcDate(new Date(props.startDate), new Date())
                                :
                                calcDate(new Date(props.startDate), new Date(props.endDate))
                        }
                        </p>
                    </div>

                </div>
            </div>
            <hr className="mt-4" />
        </div>
    )
}