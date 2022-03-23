import React from 'react'
import Navbar from "../Navbar/Navbar";
import DashboardMainContent from './DashboardMainContent/DashboardMainContent';
const Dashboard = () => {
    return (
        <div className="bg-gray-200 w-full h-screen">
            <Navbar />
            <hr />
            <div>
                <DashboardMainContent />
            </div>
        </div>
    )
}

export default Dashboard