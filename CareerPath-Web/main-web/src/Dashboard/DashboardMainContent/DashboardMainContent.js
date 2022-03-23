import React from 'react'
import MainContent from '../MainContent/MainContent'
import RightSide from '../rightSide/rightSide'
import Sidebar from '../Sidebar/Sidebar'

const DashboardMainContent = () => {
    return (
        <div className="container mx-auto px-5 my-6 flex justify-between">
            <div className="w-1/4 ">
                <Sidebar/>
            </div>
            <div className="w-2/4 mx-6">
                <MainContent/>
            </div>
            <div className="w-1/4">
                <RightSide/>
            </div>
        </div>
    )
}

export default DashboardMainContent
