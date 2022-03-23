import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Colors from '../../../../../Colors/Colors'
import Loader from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
const EducationInfo = (props) => {
    let navigate = useNavigate()
    const [education, setEducation] = useState([])
    const [isLoading, setLoading] = useState(true)
    const getEducation = () => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/education/${+localStorage.getItem('id')}`).then((response) => {
            setEducation(response.data)
            setLoading(false)
        }).catch(e => {
            console.log("error")
        })
    }
    useEffect(() => {
        getEducation()
    }, [])

    // console.log(education.length, "education.length");
    return (
        <div className="mt-8">
            {isLoading ? <div className='flex justify-center items-center'> <Loader
                type="TailSpin"
                color={Colors.blue}
                height={100}
                width={100}
            /> </div> : null}
            {education.length < 1 ? <div className="flex items-center flex-col justify-center">
                <img src='/Nothing.png' alt='images' className="w-96" />
                <p className="mt-4">No Experience to Show</p>
                <button className="w-full py-2 flex items-center text-white rounded justify-center mt-4"
                    style={{ backgroundColor: Colors.blue }}
                    onClick={() => navigate('add')}
                >Add Education</button>
            </div> : <div>
                {education.map((m, i) => {
                    return (
                        <div>
                            <Education
                                key={i}
                                universityImage={m.profile_photo}
                                education_type={m.field_of_study}
                                universityName={m.school}
                                startDate={m.start_date}
                                endDate={m.end_date}
                                education_id={m.id}
                                setNavState={props.setNavState}
                                getEducation={getEducation}
                            />
                            <hr />
                        </div>
                    )
                })}
                <button className="w-full py-2 flex items-center text-white rounded justify-center mt-4"
                    style={{ backgroundColor: Colors.blue }}
                    onClick={() => navigate('add')}>Add Education</button>
            </div>}


        </div>
    )
}

export default EducationInfo


const Education = (props) => {
    const navigate = useNavigate()
    const [alert_, setAlert] = useState(false)
    const toggleAlert = () => {
        setAlert(!alert_)
    }
    if (alert_) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const EditEducation = (id) => {
        navigate(`${id}`)
    }
    return (
        <div>
            {alert_ && (
                <Alert
                    toggle={toggleAlert}
                    overlay="overlay"
                    modal="modal"
                    modalcontent="modal-content"
                    closeModal="close-modal"
                    modalValue={alert_}
                    id={props.education_id}
                    setNavState={props.setNavState}
                    getEducation={props.getEducation} />
            )}
            <div className="py-2">
                <div className='flex justify-between items-center'>
                    <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full bg-white border flex justify-center items-center">
                            <img src={props.universityImage ? props.universityImage : '/dummy.png'} alt="" className="w-16 h-16 rounded-full object-cover " />
                        </div>
                        <div className="flex flex-col ml-5 " >
                            <p className="text-lg  text-gray-500 font-bold">{props.universityName}</p>
                            <p className="text-sm text-black">{props.education_type}</p>
                            <p className="text-sm text-gray-400">{`${moment(props.startDate).format("MMM-YYYY")} - ${moment(props.endDate).format("MMM-YYYY")}`}</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <button className='text-lg p-2 text-white rounded-lg bg-green-500 hover:bg-green-800' onClick={() => EditEducation(props.education_id)}>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </span>
                        </button>
                        <button className='text-lg p-2 ml-2 text-white rounded-lg bg-red-500 hover:bg-red-800' onClick={toggleAlert}>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Alert = (props) => {
    const deleteEducation = () => {
        axios.delete(`${process.env.REACT_APP_SERVER_PATH}/education/${props.id}`).then((response) => {
            console.log("Succesfully Deleted Education")
            props.getEducation()
            props.toggle()
        }).catch(e => {
            console.log('Error in delete Education Api')
        })
    }
    return (
        <div className={props.modal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className={props.overlay} onClick={props.toggle}></div>
            <div className='flex flex-col z-20 bg-white rounded p-6'>
                <p className='text-2xl font-bold'>Do you want to delete education</p>
                <div className='flex items-center justify-between mt-4 w-full'>
                    <button className='px-5 text-lg py-2 text-white rounded-lg bg-green-500 hover:bg-green-800' onClick={props.toggle}>No</button>
                    <button className='px-5 text-lg py-2 ml-2 text-white rounded-lg bg-red-500 hover:bg-red-800' onClick={deleteEducation}>Yes</button>
                </div>
            </div>
        </div>
    )
}