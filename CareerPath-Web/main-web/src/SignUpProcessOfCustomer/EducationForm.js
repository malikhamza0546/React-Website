import axios from 'axios'
import React, { useState } from 'react'
import Colors from '../Colors/Colors'
import jwt_decode from 'jwt-decode'
const EducationForm = (props) => {
    localStorage.setItem("navState", 7)
    const [schoolName, setSchoolName] = useState('')
    const [degreeName, setDegreeName] = useState('')
    const [subjectName, setSubjectName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const AddEducation = () => {
        const Data = {
            school: schoolName,
            degree: degreeName,
            field_of_study: subjectName,
            user_id: jwt_decode(localStorage.getItem("customer_signup_token")).id,
            start_date: startDate,
            description: 'hello',
            end_date: endDate,
            status: ''
        }
        console.log(Data)
        axios.post(`${process.env.REACT_APP_SERVER_PATH}/education`, Data).then((response) => {
            console.log('education Added Successfully for customer')
            props.setNavState(props.navState + 1)
        }).catch(e => {
            console.log(e)
        })
    }

    const handleStartDate = (e) => {
        setStartDate(new Date(e.target.value))
        // setStartDate(moment(e.target.value).format("MM YYYY"))

    }
    const handleEndDate = (e) => {
        setEndDate(new Date(e.target.value))
        // setEndDate(moment(e.target.value).format("MM YYYY"))
    }
    return (
        <div className="font-bold w-full">
            <p className="text-2xl font-bold mt-3 text-gray-700">Add Education</p>
            <div className="mb-4 mt-4">
                <label className="block text-gray-900 text-sm mb-2" for="schoolName">
                    School
                </label>
                <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="schoolName" type="text" placeholder="School" value={schoolName}
                    onChange={(e) => { setSchoolName(e.target.value) }} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-900 text-sm mb-2" for="degree">
                    Degree
                </label>
                <input className="text-xs border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="degree" type="text" placeholder="Degree"
                    value={degreeName}
                    onChange={(e) => { setDegreeName(e.target.value) }} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-900 text-xs mb-2" for="subject">
                    Subject
                </label>
                <input className="text-xs border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="job" type="text" placeholder="Subject"
                    value={subjectName}
                    onChange={(e) => { setSubjectName(e.target.value) }} />
            </div>
            <div className="flex w-full justify-between">
                <div className="w-1/2">
                    <label className="block text-gray-900 text-xs mb-2" for="firstName">
                        Start Date
                    </label>
                    <input className="text-xs border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="firstName" type="date" placeholder="Enter first name" onChange={handleStartDate} />
                </div>
                <div className="ml-2 w-1/2">
                    <label className="block text-gray-900 text-xs mb-2" for="firstName">
                        End Date
                    </label>
                    <input className="text-xs border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="firstName" type="date" placeholder="" onChange={handleEndDate} />
                </div>
            </div>
            <button className="text-white w-full py-2 mt-4 rounded-lg"
                style={{ backgroundColor: Colors.blue }}
                onClick={AddEducation}>Save</button>
        </div>
    )
}

export default EducationForm
