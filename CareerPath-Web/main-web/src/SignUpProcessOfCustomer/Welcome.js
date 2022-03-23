import React from 'react'
import Colors from '../Colors/Colors'


const Welcome = (props) => {
    localStorage.setItem("navState", 0)
    return (
        <div className="flex flex-col justify-center items-center text-gray-500 w-full">
            <img src="/CustomerFlow/Welcome.png" alt="welcome" className="w-24" />
            <p className="text-2xl font-bold mt-3 text-gray-800">Welcome to CareerPaths</p>
            <p className="text-xs mt-3">Follow these easy step by step instructions to </p>
            <p className="text-xs">get your profile set up</p>
            <button className="w-full py-3 rounded-lg text-sm text-white mt-3 flex items-center justify-center" style={{ backgroundColor: Colors.blue }}
                onClick={() => { props.setNavState(props.navState + 1) }}>
                <p className="text-sm">Let's Go</p>
            </button>
            <p className="text-sm text-blue-400 mt-3 underline">Do you have invite code?</p>
        </div>
    )
}

export default Welcome
