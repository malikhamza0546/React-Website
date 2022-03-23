import React from 'react'
// import ProfileBio from '../ProfileBio/ProfileBio'
import HasEducation from '../ProfileEducation/HasEducation/HasEducation'
// import HasExperienced from '../ProfileExperience/HasExperienced/HasExperienced'
// import ProfileEducation from '../ProfileEducation/ProfileEducation'
// import ProfileExperience from '../ProfileExperience/ProfileExperience'
// import { Routes, Route, Link } from "react-router-dom";

const mainProfileData = () => {
    return (
        <div className="mt-4 p-4 bg-white rounded">
            <div className="flex">
                <button className="text-sm rounded px-5 py-2  text-white bg-blue-500">Bio</button>
                <button className="text-sm rounded px-5 py-2 text-gray-800 hover:text-white hover:bg-blue-500 bg-gray-100 mx-3">Education</button>
                <button className="text-sm rounded px-5 py-2 text-gray-800 hover:text-white hover:bg-blue-500 bg-gray-100">Experience</button>
            </div>
            {/* <ProfileBio /> */}
            <HasEducation/>
            {/* <HasExperienced/> */}
             {/* <ProfileEducation /> */}
            {/* <ProfileExperience /> */}
        </div>
    )
}

export default mainProfileData
