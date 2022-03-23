import React from 'react'
import Switch from 'react-switch'
import Colors from '../Colors/Colors'

const AddWeekHoursEmpty = (props) => {
    localStorage.setItem("navState", 16)
    return (
        <div className="flex flex-col justify-center items-center text-gray-500 w-full">
            <img src="setHours.png" alt="setHours" className="w-56" />
            <p className="text-2xl font-bold mt-3 text-gray-700">Set your weekly hours</p>
            <p className="text-xs mt-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry </p>
            <div className="w-full mt-4">
                <Weekday />
                <Weekday />
                <Weekday />
                <Weekday />
                <Weekday />
                <Weekday />
                <Weekday />
            </div>
            <div className="w-full flex justify-between items-center mt-4 text-white">
                <button className="py-2  px-8 rounded-lg" style={{ backgroundColor: Colors.blue }}
                    onClick={() => { props.setNavState(props.navState - 1) }}>Back</button>
                <button className="py-2  px-8 rounded-lg flex" style={{ backgroundColor: Colors.blue }}
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


const Weekday = (props) => {
    return (
        <div className="w-full bg-gray-100 rounded p-3 flex justify-between items-center mb-4">
            <div>
                <p className="text-gray-800 text-lg">Saturday</p>
                <p className="text-gray-400 text-xs">Unavailable</p>
            </div>
            <div>
                <Switch
                    checked={false} uncheckedIcon={false}
                    checkedIcon={false}
                    height={24}
                    width={48}
                    onColor={Colors.blue}
                />
            </div>
        </div>
    )
}


export default AddWeekHoursEmpty