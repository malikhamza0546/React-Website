import React from 'react'
import Navbar from '../../Navbar/Navbar'
// import Navbar from '../../Navbar/Navbar'
import ProfileTop from '../MainContent/Profile/ProfileTop/ProfileTop'
import RightSide from '../rightSide/rightSide'
import Sidebar from '../Sidebar/Sidebar'
import ProfileExperience from '../MainContent/Profile/ProfileExperience/ProfileExperience'

const DashboardProfileExperience = () => {
    return (
        <div className="bg-gray-200 w-full h-full">
            <Navbar />
            <hr />
        <div className="container mx-auto px-5 my-6 flex justify-between">
            <div className="w-1/4 ">
                <Sidebar/>
            </div>
            <div className="w-2/4 mx-6">
            <ProfileTop />
            <ProfileExperience/>
            </div>
            <div className="w-1/4">
                <RightSide/>
            </div>
        </div>
        </div>
    )
}

export default DashboardProfileExperience