import React, { useState } from 'react'
import Activity from './Activity/Activity';

const Activitys = () => {
    const [activity] = useState([
        { activityImage: '/calendar.png', activityName: 'Booking Request', activityDescription: 'you are going to book a request' },
        { activityImage: '/user.png', activityName: 'Upload a profile pic and all', activityDescription: 'upload a profile pic' },
        { activityImage: '/heart.png', activityName: 'Welcome to CareerPaths', activityDescription: 'Welocome to Careers Path' }
    ])

    return (
        <div className="p-7 bg-white rounded mt-6">
            <p className="text-2xl font-bold">Activity</p>
            {
                activity.map((m) => {
                    return <Activity
                        activityImage={m.activityImage}
                        activityName={m.activityName}
                        activityDescription={m.activityDescription} />
                })
            }
        </div>
    )
}

export default Activitys
