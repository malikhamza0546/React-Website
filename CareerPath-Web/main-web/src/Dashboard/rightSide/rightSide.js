import React from 'react'
import Activitys from './Activitys/Activitys'
import Reviews from './Reviews/Reviews'

const rightSide = (props) => {
    console.log(props.user,"user from right side")
    return (
        <div className="rounded">
            <div>
                <Reviews user={props.user} setNavState={props.setNavState} navState={props.navState} />
            </div>
            <div>
                <Activitys />
            </div>
        </div>
    )
}

export default rightSide
