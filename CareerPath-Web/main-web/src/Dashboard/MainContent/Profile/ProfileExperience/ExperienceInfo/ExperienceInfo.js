import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Colors from '../../../../../Colors/Colors'
import moment from 'moment'
import Loader from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

const ExperiencedInfo = (props) => {
    let navigate = useNavigate()
    const [experience, setExperience] = useState([])
    const [isLoading, setLoading] = useState(true)
    // console.log(props.id)
    const getExperience = () => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/experience/${+localStorage.getItem('id')}`).then((response) => {
            console.log("response from profile experience", response.data);
            setExperience(response.data)
            setLoading(false)
            console.log("i am ruuning fro expoerience")
        })
    }
    useEffect(() => {
        getExperience()
    }, [])
    return (
        <div className="mt-8">
            {isLoading ? <div className='flex justify-center items-center'> <Loader
                type="TailSpin"
                color={Colors.blue}
                height={100}
                width={100}
            /> </div> : null}
            {experience.length < 1 ? <div className="flex items-center flex-col justify-center">
                <img src='/Nothing.png' alt='images' className="w-96" />
                <p className="mt-4">No Experience to Show</p>
                <button className="w-full py-2 flex items-center text-white rounded justify-center mt-4"
                    style={{ backgroundColor: Colors.blue }}
                    onClick={() => navigate('add')}>Add Experience</button>
            </div> : <div>
                {experience.map((p) => {
                    return <Experience
                        companyImage={p.profile_photo}
                        position={p.title}
                        companyName={p.company}
                        description={p.description}
                        startDate={p.start_date}
                        endDate={p.end_date}
                        location={p.location}
                        currentJob={p.current_job}
                        experience_id={p.id}
                        getExperience={getExperience}
                    />
                })}
                <button className="w-full py-2 flex items-center text-white rounded justify-center mt-4"
                    style={{ backgroundColor: Colors.blue }}
                    onClick={() => navigate('add')}>Add Experience</button></div>}

        </div>
    )
}

export default ExperiencedInfo

const Experience = (props) => {
    let navigate = useNavigate()
    const [alert_, setAlert] = useState(false)
    const toggleAlert = () => {
        setAlert(!alert_)
    }
    if (alert_) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    // console.log("curent job ", props.currentJob);

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
            {alert_ && (
                <Alert
                    toggle={toggleAlert}
                    overlay="overlay"
                    modal="modal"
                    modalcontent="modal-content"
                    closeModal="close-modal"
                    modalValue={alert_}
                    id={props.experience_id}
                    setNavState={props.setNavState}
                    getExperience={props.getExperience} />
            )}
            <div className='flex justify-between items-center'>
                <div className="py-2">
                    <div className="flex flex-row ">
                        <img src={props.companyImage ? props.companyImage : '/avatar.png'} alt="" className="w-20 h-20 rounded-full object-cover" />
                        <div className="flex flex-col ml-5" >
                            <p className="text-lg text-gray-500 font-bold">{props.position}</p>
                            <p className="text-sm text-black">{props.companyName} - {props.location}</p>
                            <div className='flex items-center  w-full'>
                                <p className="text-sm text-gray-400"> {`${moment(props.startDate).format("MMM YYYY")} - `}</p>
                                {props.currentJob === "1" ? <p className="text-sm text-gray-400">&nbsp;Present</p> : <p className="text-sm text-gray-400">&nbsp;{`${moment(props.endDate).format("MMM YYYY")}`}</p>}
                                <p className='text-gray-400 '>&nbsp;&nbsp;•&nbsp;&nbsp;</p>
                                <p className="text-sm text-gray-400">  {
                                    props.currentJob === "1"
                                        ?
                                        calcDate(new Date(props.startDate), new Date())
                                        :
                                        calcDate(new Date(props.startDate), new Date(props.endDate))
                                }
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='flex'>
                    <button className='text-lg p-2 text-white rounded-lg bg-green-500 hover:bg-green-800' onClick={() => navigate(`${props.experience_id}`)}>
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
            <hr className="mt-4" />
        </div>
    )
}

const Alert = (props) => {
    let navigate = useNavigate()
    const deleteExperience = () => {
        axios.delete(`${process.env.REACT_APP_SERVER_PATH}/experience/${props.id}`).then((response) => {
            console.log("Succesfully Deleted Education")
            props.getExperience()
            props.toggle()
            // navigate('../../experience')
        }).catch(e => {
            console.log('Error in delete Experience Api')
        })
    }
    return (
        <div className={props.modal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className={props.overlay} onClick={props.toggle}></div>
            <div className='flex flex-col z-20 bg-white rounded p-6'>
                <p className='text-2xl font-bold'>Do you want to delete experience</p>
                <div className='flex items-center justify-between mt-4 w-full'>
                    <button className='px-5 text-lg py-2 text-white rounded-lg bg-green-500 hover:bg-green-800' onClick={props.toggle}>No</button>
                    <button className='px-5 text-lg py-2 ml-2 text-white rounded-lg bg-red-500 hover:bg-red-800' onClick={deleteExperience}>Yes</button>
                </div>
            </div>
        </div>
    )
}

