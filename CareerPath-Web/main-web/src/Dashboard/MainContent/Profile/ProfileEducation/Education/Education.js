import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from 'react-loader-spinner'

const AddEducation = (props) => {
    const [isLoading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const [imgUrl, setImageUrl] = useState('')
    const [showPicError, setShowPicError] = useState(false)
    const [fileInput, setFileInput] = useState()
    const [universityName, setUniversityName] = useState('')
    const [degreeName, setDegreeName] = useState('')
    const [subjectName, setSubjectName] = useState('')
    const [startDateToShow, setStartDateToShow] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDateToShow, setEndDateToShow] = useState('')
    const [endDate, setEndDate] = useState('')
    const [image, setImage] = useState(null)
    const [dateError, setDateError] = useState(false)
    const handleStartDate = (e) => {
        setDateError(false)
        setStartDate(new Date(e.target.value))
        console.log(e.target.value, "e.target.value")
        setStartDateToShow(e.target.value)
    }
    const handleEndDate = (e) => {
        setDateError(false)
        setEndDate(new Date(e.target.value))
        console.log(e.target.value, "e.target.value")
        setEndDateToShow(e.target.value)
    }
    const UploadImage = (id) => {
        const formDataExp = new FormData();
        formDataExp.append("file", image);
        formDataExp.append("education_id", id);
        if (image === null) {
            navigate('../../education')
            setLoading(false)
        } else {
            axios.post(process.env.REACT_APP_SERVER_PATH + `/document/education/`, formDataExp).then((response) => {
                console.log(response);
                console.log("image uploaded to education")
                navigate('../../education')
                setLoading(false)
            }).catch(e => {
                console.log("error is from uploading");
            })
        }
    }

    const UpdateEducation = () => {
        if ((!moment(startDate).isSameOrBefore(endDate, 'month')) || moment(startDate).isSame(endDate, 'month')) {
            setDateError(true)
        } else {
            setLoading(true)
            const Data = {
                school: universityName,
                degree: degreeName,
                field_of_study: subjectName,
                user_id: localStorage.getItem("id"),
                start_date: startDate,
                description: 'hello',
                end_date: endDate,
                status: ''
            }
            // console.table(Data, "data")
            console.log(Data)
            axios.put(`${process.env.REACT_APP_SERVER_PATH}/education/${id}`, Data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response.data)
                if (imgUrl === '') {
                    setLoading(false)
                    navigate('../../education')
                } else {
                    UploadImage(response.data.id)
                    console.log(response.data.id, "response.data.id")
                    console.log('Data Added Successfully')
                }
            }).catch(e => {
                console.log(e)
            })
        }

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

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/getEducation/${id}`).then((response) => {
            console.log(response.data.message[0], 'Educationnnnnnnn>>>>>>>>>')
            setSubjectName(response.data.message[0].field_of_study)
            setStartDate(response.data.message[0].start_date)
            setEndDate(response.data.message[0].end_date)
            setUniversityName(response.data.message[0].school)
            setImageUrl(response.data.message[0].profile_photo ? response.data.message[0].profile_photo : '/avatar.png')
            setStartDateToShow(moment(response.data.message[0].start_date).format('YYYY-MM-DD'))
            setEndDateToShow(moment(response.data.message[0].end_date).format('YYYY-MM-DD'))
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
                <label className="block text-gray-900 text-sm mb-2" for="university">
                    University
                </label>
                <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="school" type="text" placeholder="University" value={universityName}
                    onChange={(e) => { setUniversityName(e.target.value) }} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-900 text-sm mb-2" for="subject">
                    Subject
                </label>
                <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="job" type="text" placeholder="Subject"
                    value={subjectName}
                    onChange={(e) => { setSubjectName(e.target.value) }} />
            </div>
            <div className="flex w-full justify-between">
                <div className="w-1/2">
                    <label className="block text-gray-900 text-sm mb-2" for="firstName">
                        Start Date
                    </label>
                    <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="firstName" type="date" placeholder="Enter first name" value={startDateToShow} onChange={handleStartDate} />
                </div>
                <div className="ml-2 w-1/2">
                    <label className="block text-gray-900 text-sm mb-2" for="firstName">
                        End Date
                    </label>
                    <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="firstName" type="date" placeholder="" value={endDateToShow} onChange={handleEndDate} />
                </div>
            </div>
            {dateError && <p className='text-sm font-bold text-red-500 my-1'>Start date should be less than the end date</p>}
            <button className="bg-blue-500 text-white text-center w-full text-sm rounded flex items-center justify-center mt-3 py-3 hover:bg-blue-300" style={{ backgroundColor: '#00C4FF' }}
                onClick={UpdateEducation}>Next{isLoading ? <span className='ml-4'>
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

export default AddEducation
