import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorHandler = () => {
    let navigate = useNavigate()
    console.log("This error is from Error Handler");
    return (
        <div className="bg-white flex w-screen h-screen items-center justify-center">
            
            <p onClick={() => {
                navigate('/')
            }}>error</p>
        </div>
    )
}

export default ErrorHandler
