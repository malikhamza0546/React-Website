import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import Loader from 'react-loader-spinner'

const Experience = (props) => {
    const [isLoading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const [imgUrl, setImageUrl] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [location, setLocation] = useState('')
    const [startDateToShow, setStartDateToShow] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDateToShow, setEndDateToShow] = useState('')
    const [endDate, setEndDate] = useState(new Date())
    const [description, setDescription] = useState('')
    const [currentlyWorking, setCurrentlyWorking] = useState(true)
    const [showPicError, setShowPicError] = useState(false)
    const [fileInput, setFileInput] = useState()
    const [image, setImage] = useState(null)
    const [date, setDate] = useState(new Date())

    const UploadImage = (id) => {
        console.log('hi billy')
        const formDataExp = new FormData();
        formDataExp.append("file", image);
        console.log(image, 'imagesss')
        formDataExp.append("experience_id", id);
        if (image === null) {
            navigate('../../experience')
            setLoading(false)
        } else {
            axios.post(process.env.REACT_APP_SERVER_PATH + `/document/experience/`, formDataExp).then((response) => {
                console.log('Data Added Successfully')
                navigate('../../experience')
                setLoading(false)
            }).catch(e => {
                console.log("error is from uploading");
            })
        }

    }

    const UpdateExperience = () => {
        setLoading(true)
        console.log(currentlyWorking, 'CurrentlyWorkinghahaha')
        console.log(`${endDate.getFullYear()}-${endDate.getMonth() + 1}`, 'sdsdsdsd')
        const Data = {
            user_id: JSON.parse(localStorage.getItem("id")),
            company: companyName,
            job: jobTitle,
            title: jobTitle,
            employement_type: "full time",
            location: location,
            current_job: currentlyWorking ? '1' : '0',
            start_date: `${startDate.getFullYear()}-${startDate.getMonth() + 1}`,
            end_date: currentlyWorking ? `${endDate.getFullYear()}-${endDate.getMonth() + 1}` : `${endDate.getFullYear()}-${endDate.getMonth() + 1}`,
            description: description,
            status: ""
        }
        console.log(Data)
        axios.put(`${process.env.REACT_APP_SERVER_PATH}/experience/${id}`, Data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response.data, "hello update")
            console.log(imgUrl, 'imgUrl')
            if (imgUrl === '') {
                // props.setNavState(0)
                setLoading(false)
                navigate('../../experience')
                console.log('Data Added Successfully no image')
            } else {
                UploadImage(response.data.id)
            }
        }).catch(e => {
            console.log(e)
        })
        // navigate('../../experience')
    }

    const handleImg = (event) => {
        console.log(event.target.files[0]);
        if (event.target.files[0].type === 'image/jpeg'
            || event.target.files[0].type === 'image/png') {
            setShowPicError(false)
            setImageUrl(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            setShowPicError(true)
        }

    }
    const handleStartDate = (e) => {
        setStartDate(new Date(e.target.value))
        setStartDateToShow(moment(new Date(e.target.value)).format('YYYY-MM-DD'))
    }
    const handleEndDate = (e) => {
        setEndDate(new Date(e.target.value))
        setEndDateToShow(moment(new Date(e.target.value)).format('YYYY-MM-DD'))
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/getExperience/${id}`).then((response) => {
            console.log(response.data.message[0], 'Experience>>>>>>>>>')
            console.log(response.data.message[0].current_job, 'Experience>>>>>>>>>')
            setImageUrl(response.data.message[0].profile_photo ? response.data.message[0].profile_photo : '/avatar.png')
            setStartDateToShow(moment(response.data.message[0].start_date).format('YYYY-MM-DD'))
            setEndDateToShow(moment(response.data.message[0].end_date).format('YYYY-MM-DD'))
            setStartDate(new Date(response.data.message[0].start_date))
            setEndDate(new Date(response.data.message[0].end_date))
            setDescription(response.data.message[0].description)
            setJobTitle(response.data.message[0].job)
            setLocation(response.data.message[0].location)
            setCompanyName(response.data.message[0].company)
            setCurrentlyWorking(response.data.message[0].current_job === '1' ? true : false)
            console.log(moment(response.data.message[0].end_date).format('MM-DD-YYYY'), "moment(response.data.message[0].end_date).format('MM-DD-YYYY')")
        }).catch(e => {
            console.log(e)
        })
    }, [])

    return (
        <div>
            <div className="w-full flex items-center justify-center flex-col">
                <input className="text-xs text-white ml-2" type="file" onChange=
                    {handleImg}
                    ref={fileinput => setFileInput(fileinput)}
                    style={{ display: 'none' }} />
                <img src={imgUrl ? imgUrl : '/avatar.png'} alt="images" className="w-16 h-16 rounded-full object-cover" />
                <button className="mt-3" onClick={() => {
                    fileInput.click()
                }}>Add Logo</button>
            </div>
            <div className="mb-4">
                <label className="block text-gray-900 text-sm mb-2" for="company">
                    Company
                </label>
                <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="company" type="text" placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-900 text-sm mb-2" for="job">
                    Job
                </label>
                <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="job" type="text" placeholder="Enter Job title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-900 text-sm mb-2" for="location">
                    Location
                </label>
                <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="location" type="text" placeholder="Enter location name"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)} />
            </div>

            <div className="flex w-full justify-between">
                <div className="w-1/2">
                    <label className="block text-gray-900 text-sm mb-2" for="firstName">
                        Start Date
                    </label>
                    <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="firstName" type="date" placeholder="Enter first name" value={startDateToShow} onChange={handleStartDate} />
                </div>
                {!currentlyWorking ? <div className="ml-2 w-1/2">
                    <label className="block text-gray-900 text-sm mb-2" for="firstName">
                        End Date
                    </label>
                    <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="firstName" type="date" placeholder="" value={endDateToShow} onChange={handleEndDate} />
                </div> : null}
            </div>
            <div className="flex mb-4 items-center">
                <input type="checkbox"
                    value={currentlyWorking}
                    checked={currentlyWorking}
                    onChange={() => { setCurrentlyWorking(!currentlyWorking) }} />
                <p className=" ml-3 text-sm text-gray-700">Currently working here</p>
            </div>
            <div className="my-4">
                <label className="block text-gray-900 text-sm mb-2" for="location">
                    Description
                </label>
                <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="description" type="text" placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button className="bg-blue-500 text-white text-center w-full text-sm rounded mt-3 py-3 flex items-center justify-center hover:bg-blue-300" style={{ backgroundColor: '#00C4FF' }}
                onClick={UpdateExperience}>Next{isLoading ? <span className='ml-4'>
                    <Loader
                        type="TailSpin"
                        color="white"
                        height={20}
                        width={20}
                    // timeout={5000} //5 secs
                    /></span> : null}</button>
        </div>
    )
}

export default Experience
