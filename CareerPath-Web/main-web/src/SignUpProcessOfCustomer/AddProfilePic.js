import React, { useEffect, useState } from 'react'
import Colors from '../Colors/Colors'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const AddProfilePic = (props) => {
    localStorage.setItem("navState", 5)
    const [imgUrl, setImageUrl] = useState('')
    const [fileInput, setFileInput] = useState()
    const [disabled, setDisabled] = useState(true)
    const [showPicError, setShowPicError] = useState(false)
    const getCustomer = () => {
        axios.get(process.env.REACT_APP_SERVER_PATH + `/customers/${jwt_decode(localStorage.getItem("customer_signup_token")).id}`)
            .then((response) => {
                console.log(response.data.User.profile_photo)
                if (response.data.User.profile_photo !== null) {
                    setImageUrl(response.data.User.profile_photo)
                    setDisabled(false)
                } else {
                    setImageUrl('/CustomerFlow/Profile.png')
                }

            }).catch(e => {
                console.log("error occured");
            })
    }
    useEffect(() => {
        getCustomer()
    }, [])
    const handleImg = (event) => {
        setDisabled(true)
        console.log(event.target.files[0]);
        if (event.target.files[0].type === 'image/jpeg'
            || event.target.files[0].type === 'image/png') {
            setShowPicError(false)
            setImageUrl(URL.createObjectURL(event.target.files[0]))
            const formDataExp = new FormData();
            formDataExp.append("file", event.target.files[0]);
            formDataExp.append("user_id", jwt_decode(localStorage.getItem("customer_signup_token")).id);
            axios.post(process.env.REACT_APP_SERVER_PATH + `/document/user/`, formDataExp).then((response) => {
                console.log(response);
                console.log('Customer Picture Added brother');
                setDisabled(false)
                getCustomer()
            }).catch(e => {
                console.log("error is from uploading");
            })
        } else {
            setShowPicError(true)
        }

    }
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <img src='/CustomerFlow/Add your Location-1.png' alt="profilePic" className="w-24" />
            <p className="text-2xl font-bold mt-3 text-gray-800">Add your profile photo</p>
            <p className="text-xs mt-3 text-center">Put a face to the name and let your career mentors know who they're speaking to</p>
            {showPicError ? <p className='text-red-500 mt-2 text-center'>Failed to uplaod image;the format is not supported</p> : null}
            <div className="w-20 h-20 rounded-full border border-blue-400 flex items-center justify-center mt-4">
                <img src={imgUrl} alt="alon" className="w-20 h-20 rounded-full object-cover" />
            </div>
            <button className="flex items-center bg-blue-400 justify-center p-2 rounded-lg mt-2"
                style={{ backgroundColor: Colors.blue, color: 'white' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="gray">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input className="text-xs text-white ml-2" type="file" onChange=
                    {handleImg}
                    ref={fileinput => setFileInput(fileinput)}
                    style={{ display: 'none' }} />
                <button onClick={() => {
                    fileInput.click()
                }} className='text-white cursor-pointer p-2'>Add Photo</button>


            </button>
            <div className="w-full flex justify-end items-center mt-4 text-white">
                <button className="py-2  px-8 rounded-lg flex" disabled={disabled} style={{ backgroundColor: !disabled ? Colors.blue : Colors.gray, color: disabled ? 'gray' : 'white' }}
                    onClick={() => { props.setNavState(props.navState + 1) }}
                >
                    <p >Next</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default AddProfilePic
