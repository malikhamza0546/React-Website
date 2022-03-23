import React from 'react'

const Activity = ({ activityImage, activityName, activityDescription }) => {
    return (
        <div className="flex justify-between items-start mt-8">
            <div className="flex items-start">
                    <img src={activityImage} alt="sss" className="object-none w-12 h-12 rounded-full" />
                <div className="flex flex-col ml-3">
                    <p className="text-lg">{activityName}</p>
                    <p className="text-xs text-gray-400">{activityDescription}</p>
                </div>
            </div>
            <div>
                <p className="text-sm ml-2 text-gray-400">2d</p>
            </div>
        </div>
    )
}

export default Activity
