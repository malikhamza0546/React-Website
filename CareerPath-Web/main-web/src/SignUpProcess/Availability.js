import React from 'react'
import Colors from '../Colors/Colors'
const Availability = (props) => {
    return (
        <div className="w-full">
            Available
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

export default Availability
