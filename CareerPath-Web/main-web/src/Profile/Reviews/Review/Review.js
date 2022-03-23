import React from 'react'
import Ratings from '../../../Rating/Ratings'
const Review = (props) => {
    return (
        <div className="flex flex-col bg-gray-100 rounded text-gray-500 m-2 mt-0 p-6 h-28" style={{ width: props.arrLength < 3 ? '400px' : '' }}>
            <div className='flex items-center'>
                <Ratings value={+props.reviewer_points} />
                <p className="ml-2 text-gray-700">{props.reviewer_points.toFixed(1)}</p>
            </div>
            <div className="mt-3 text-xs text-gray-500 italic">
                <p>{props.reviewer_description ? `"${props.reviewer_description}"` : 'No review description'}</p>
            </div>
        </div>
    )
}

export default Review
