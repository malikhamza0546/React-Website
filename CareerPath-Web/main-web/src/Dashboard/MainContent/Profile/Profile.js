//import React from 'react'
//import ChangeEmail from '../ChangeEmail/ChangeEmail'
//import ChangeEmailCode from '../ChangeEmail/ChangeEmailCode/ChangeEmailCode'
//import CongratulationEmail from '../ChangeEmail/CongratulationEmail/CongratulationEmail'
//import ChangePassword from '../ChangePassword/ChangePassword'
//import CongratulationPassword from '../ChangePassword/CongratulationPassword/CongratulationPassword'
//import MainProfileData from './mainProfileData/mainProfileData'
import ProfileBio from './ProfileBio/ProfileBio'
import ProfileExperience from './ProfileExperience/ProfileExperience'
// import ProfileTop from './ProfileTop/ProfileTop'
import ProfileEducation from './ProfileEducation/ProfileEducation'
import { useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'

const Profile = (props) => {
    let navigate = useNavigate()
    const [navState, setNavState] = useState(0)
    const [general, setGeneral] = useState(true)
    const [education, setEducation] = useState(false)
    const [experience, setExperience] = useState(false)
    const toggleGeneral = () => {
        setGeneral(true)
        setEducation(false)
        setExperience(false)
    }
    const toggleEducation = () => {
        setGeneral(false)
        setEducation(true)
        setExperience(false)
    }
    const toggleExperience = () => {
        setGeneral(false)
        setEducation(false)
        setExperience(true)
    }
    let ComponentToRender = null
    switch (navState) {
        case 0:
            ComponentToRender = <ProfileBio user={props.user} />
            break;
        case 1:
            ComponentToRender = (<div>
                <ProfileEducation user={props.user} />
            </div>
            )
            break;
        case 2:
            ComponentToRender = (<div>
                <ProfileExperience user={props.user} />
            </div>
            )
            break;
        default:
            return null
    }

    return (
        <div className="bg-white rounded pt-1 pb-4 my-6">
            <div>
                <div className="mx-6 my-6 flex">
                    <Link to=''>
                        <button className="px-4 py-2 bg-blue-500 rounded-lg text-sm"
                            onClick={toggleGeneral}
                            style={{
                                backgroundColor: (general && !education && !experience) ? '#00C4FF' : '#F7F7F7',
                                color: (general && !education && !experience) ? 'white' : 'black'
                            }}>General</button>
                    </Link>
                    <Link to='education'>
                        <button className="px-4 py-2 bg-blue-500 rounded-lg mx-4 text-sm"
                            onClick={toggleEducation}
                            style={{
                                backgroundColor: (!general && education && !experience) ? '#00C4FF' : '#F7F7F7',
                                color: (!general && education && !experience) ? 'white' : 'black'
                            }}>Education</button>
                    </Link>
                    <Link to='experience'>
                        <button className="px-4 py-2 bg-blue-500 rounded-lg text-sm "
                            onClick={toggleExperience}
                            style={{
                                backgroundColor: (!general && !education && experience) ? '#00C4FF' : '#F7F7F7',
                                color: (!general && !education && experience) ? 'white' : 'black'
                            }}>Experience</button></Link>

                </div>
                <div>
                    <Routes>
                        <Route path='/' element={<ProfileBio user={props.user} />} />
                        <Route path='education/*' element={<ProfileEducation user={props.user} />} />
                        <Route path='experience/*' element={<ProfileExperience user={props.user} />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Profile
