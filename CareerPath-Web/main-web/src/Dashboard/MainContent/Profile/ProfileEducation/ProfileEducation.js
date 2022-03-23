import React, { useEffect, useState } from 'react'
import AddEducation from './AddEducation/AddEducation'
import axios from 'axios'
import Colors from '../../../../Colors/Colors'
import EducationInfo from './EducationInfo/EducationInfo'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Education from './Education/Education'
const ProfileEducation = (props) => {
    return (
        <div className="mt-6 mx-6">
            <div>
                <Routes>
                    <Route path='/' element={<EducationInfo id={props.user.User?.id} />} />
                    <Route path='add' element={<AddEducation id={props.user.User?.id} />} />
                    <Route path=':id' element={<Education user={props.user} />} />
                </Routes>
            </div>
        </div>
    )
}

export default ProfileEducation
