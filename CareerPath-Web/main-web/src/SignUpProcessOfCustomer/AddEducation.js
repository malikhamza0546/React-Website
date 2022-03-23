import React from 'react'
import Colors from '../Colors/Colors'

const AddEducation = (props) => {
    localStorage.setItem("navState", 6)
    return (
        <div className="flex flex-col justify-center items-center text-gray-500 w-full">
            <img src="/CustomerFlow/Add education.png" alt="addVideo" className="w-36" />
            <p className="text-2xl font-bold mt-3 text-gray-700">Add Education</p>
            <p className="text-xs mt-3 text-center">Adding this detail will help your mentor understand your educational background</p>
            <button className="w-full rounded-lg text-white py-2 mt-4" style={{ backgroundColor: Colors.blue }}
                onClick={() => { props.setNavState(props.navState + 1) }}>Add Education</button>
            <button className="w-full rounded-lg text-black py-2 mt-4"
            onClick={() => { props.setNavState(9) }}>Skip</button>
            <div className="w-full flex justify-end items-center mt-4 text-white">
                <button className="py-2  px-8 rounded-lg flex" disabled style={{ backgroundColor: Colors.gray,color:'gray' }}
                    onClick={() => { props.setNavState(props.navState + 1) }}>
                    <p >Next</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default AddEducation
