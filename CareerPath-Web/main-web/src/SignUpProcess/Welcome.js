import React from 'react'
import Colors from '../Colors/Colors'


const Welcome = (props) => {
    localStorage.setItem("navState", 0)
    return (
        <div className="flex flex-col justify-center items-center text-gray-500 w-full">
            <img src="/welcome.png" alt="welcome" className="w-24" />
            <p className="text-2xl font-bold mt-3 text-gray-800">Welcome to CareerPaths</p>
            <p className="text-xs mt-3">Follow these easy step by step instructions to </p>
            <p className="text-xs">get your profile set up</p>
            <button className="w-full py-3 rounded-lg text-sm text-white mt-3 flex items-center justify-center" style={{ backgroundColor: Colors.blue }}
                onClick={() => { props.setNavState(props.navState + 1) }}>
                <p className="text-sm">Next</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-4 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </button>
        </div>
    )
}

export default Welcome
