import React from 'react'
const popUp = (props) => {
    return (
        <div className={props.modal}>
            <div className={props.overlay} onClick={props.toggle}></div>
            <div className="w-screen h-screen flex items-center justify-center">
                <div className="w-1/4 h-36 bg-white border p-4 z-30 rounded">
                    <div className="flex">
                        <button className="bg-red-400 hover:text-white p-1 justify-center items-center flex rounded-full w-6 h-6 text-white" onClick={props.toggle}>x</button>
                    </div>
                    <p className="text-3xl mt-4 text-center text-red-400">Login Required</p>
                </div>
            </div>
        </div>
    )
}

export default popUp