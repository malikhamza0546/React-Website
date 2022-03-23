import axios from 'axios'
import React, { useState } from 'react'
import Colors from '../Colors/Colors'
import moment from 'moment'
import jwt_decode from 'jwt-decode'
const WorkExperienceForm = (props) => {
    localStorage.setItem("navState", 8)
    const [companyName, setCompanyName] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [location, setLocation] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [description, setDescription] = useState('')
    const [current_job, setCurrentJob] = useState(true)
    const [date, setDate] = useState(new Date())

    const AddExperience = () => {

        const Data = {
            user_id: jwt_decode(localStorage.getItem("signup_token")).id,
            company: companyName,
            employement_type: "",
            image: "",
            job: jobTitle,
            location: location,
            title: jobTitle,
            current_job: current_job,
            start_date: `${startDate.getFullYear()}-${startDate.getMonth() + 1}`,
            end_date: current_job ? `${endDate.getFullYear()}-${endDate.getMonth() + 1}` : `${date.getFullYear()}-${date.getMonth() + 1}`,
            description: description,
            status: ""
        }
        console.log(Data)
        axios.post(`${process.env.REACT_APP_SERVER_PATH}/experience`, Data).then((response) => {
            console.log('Data Added Successfully')
            console.log(response);
            props.setNavState(props.navState + 1)
        }).catch(e => {
            console.log(e)
        })
    }

    const handleStartDate = (e) => {
        setStartDate(new Date(e.target.value))
    }
    const handleEndDate = (e) => {
        setEndDate(new Date(e.target.value))
    }
    return (
        <div className="font-bold text-xs w-full">
            <p className="text-2xl font-bold mt-3 text-gray-700">Add work experience</p>
            <div className="mb-4 mt-4">
                <label className="block text-gray-900 mb-2" for="company">
                    Company
                </label>
                <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="company" type="text" placeholder="Company"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-900 mb-2" for="job">
                    Job
                </label>
                <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="job" type="text" placeholder="Job title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-900 mb-2" for="location">
                    Location
                </label>
                <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="location" type="text" placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)} />
            </div>

            <div className="flex w-full justify-between">
                <div className="w-1/2">
                    <label className="block text-gray-900 mb-2" for="firstName">
                        Start Date
                    </label>
                    <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="firstName" type="date" placeholder="Enter first name"
                        onChange={handleStartDate} />
                </div>
                {current_job ? <div className="ml-2 w-1/2">
                    <label className="block text-gray-900 mb-2" for="firstName">
                        End Date
                    </label>
                    <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="firstName" type="date" placeholder="Enter first name"
                        onChange={handleEndDate} />
                </div> : null}
            </div>
            <div className="flex mb-4 items-center mt-4">
                <input type="checkbox"
                    value={current_job}
                    onChange={() => { setCurrentJob(!current_job) }} />
                <p className="ml-3 text-xs text-gray-500 font-light">Currently working</p>
            </div>
            <div className="my-4 w-full text-xs font-bold">
                <label className="block text-gray-900  mb-2" for="description">
                    Description
                </label>
                <textarea className="resize-none border border-gray-300 rounded-md w-full h-24 py-3 px-3 text-gray-700  focus:outline-none" id="description" type="text" placeholder="Description"
                    value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
            </div>
            <button className="w-full py-2 text-sm rounded-lg text-white" style={{ backgroundColor: Colors.blue }}
                onClick={AddExperience}>Save</button>
        </div>
    )
}

export default WorkExperienceForm
