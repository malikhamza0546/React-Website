import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Colors from '../../../../Colors/Colors'
import ExperienceInfo from './ExperienceInfo/ExperienceInfo'
import AddExperience from './AddExperience/AddExperience'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Experience from './Experience/Experience'
const ProfileExperience = (props) => {
    return (
        <div className="mt-6 mx-6">
            <div>
                <Routes>
                    <Route path='/' element={<ExperienceInfo id={props.user.User?.id} />} />
                    <Route path='add' element={<AddExperience userID={props.user.User?.id} />} />
                    <Route path=':id' element={<Experience user={props.user} />} />
                </Routes>
            </div>
        </div>
    )
}

export default ProfileExperience

