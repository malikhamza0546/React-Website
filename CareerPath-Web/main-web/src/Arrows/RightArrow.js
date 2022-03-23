import React from 'react'

const RightArrow = (props) => {
    return (
        <button className="hover:bg-gray-200 border rounded-full border-gray-400" onClick={props.click}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    )
}

export default RightArrow
