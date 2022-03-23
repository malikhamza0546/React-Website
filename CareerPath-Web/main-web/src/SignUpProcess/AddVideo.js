import React, { useState } from 'react'
import Colors from '../Colors/Colors'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import jwt_decode from "jwt-decode";
const AddVideo = (props) => {
    localStorage.setItem("navState", 5)
    const [videoUrl, setVideoUrl] = useState("")
    const [videoUploaded, setVideoUploaded] = useState(false)
    const [fileInput, setFileInput] = useState()
    const [isLoading, setIsloading] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [showVideoError, setShowVideoError] = useState(false)

    const getProfessional = () => {
        axios.get(process.env.REACT_APP_SERVER_PATH + `/professionals/${jwt_decode(localStorage.getItem("signup_token")).id}`).then((response) => {
            console.log(response.data.prof_intro_link);
            setVideoUploaded(true)
            setVideoUrl(response.data.prof_intro_link)
        }).catch(e => {
            console.log("error is from uploading");
        })
    }

    const handleVideo = (event) => {
        console.log(event.target.files[0].name);
        console.log(event.target.files[0].type);
        // setVideo(event.target.files[0])
        if (event.target.files[0].type === 'video/mp4'
            || event.target.files[0].type === 'video.mov'
            || event.target.files[0].type === 'video.wmv'
            || event.target.files[0].type === 'video.avi'
            || event.target.files[0].type === 'video.mkv') {
            setShowVideoError(false)
            setIsloading(true)
            const formDataExp = new FormData();
            formDataExp.append("file", event.target.files[0]);
            formDataExp.append("user_id", jwt_decode(localStorage.getItem("signup_token")).id);
            axios.patch(process.env.REACT_APP_SERVER_PATH + `/professionals/${jwt_decode(localStorage.getItem("signup_token")).id}/video_intro`, formDataExp).then((response) => {
                console.log(response);
                setVideoUrl(URL.createObjectURL(event.target.files[0]))
                setIsloading(false)
                setDisabled(false)
                getProfessional()
                // props.setNavState(props.navState + 1)
            }).catch(e => {
                console.log("error is from uploading");
            })
        } else {
            setShowVideoError(true)
        }
    }
    return (
        <div className="flex flex-col justify-center items-center text-gray-500 w-full">
            <img src="/addVideo.png" alt="addVideo" className="w-36" />
            <p className="text-2xl font-bold mt-3 text-gray-700">Profile intro video</p>
            <p className="text-xs mt-3 text-center">Increase the number of times you get booked by adding a video intro. Tell your customers what you can help them with but remember to keep it short and insightful!</p>
            {showVideoError ? <p className='text-red-500 mt-2 text-center'>Failed to uplaod video;the format is not supported</p> : null}
            <div className="flex w-full flex-col items-center justify-center p-4 border border-gray-300 w-1/2 mt-4 rounded-lg  hover:bg-gray-100" onClick={() => { fileInput.click() }}>
                {videoUploaded ? <video className='w-full rounded' muted autoplay="autoplay" preload="metadata">
                    <source src={videoUrl} type="video/mp4" />
                </video> : (isLoading ? (<span><Loader
                    type="TailSpin"
                    color={Colors.blue}
                    height={50}
                    width={50}
                // timeout={5000} //5 secs
                /></span>) : (<div className='flex items-center flex-col'>
                    <img src="VideoIcon.png" alt="videoIcon" className="w-8" />
                    <input className="text-xs text-white ml-2" type="file" onChange={handleVideo}
                        style={{ display: 'none' }}
                        ref={fileinput => setFileInput(fileinput)} />
                    <button className="text-xs  mt-2"
                    >Upload a video</button>
                </div>))

                }
            </div>
            <div>
                <button className='w-full text-gray-800 mt-2'
                    onClick={() => { props.setNavState(props.navState + 1) }}>Skip</button>
            </div>
            <div className="w-full flex justify-end items-center mt-4 text-white">
                <button className="py-2  px-8 rounded-lg flex text-white" disabled={disabled} style={{ backgroundColor: !disabled ? Colors.blue : Colors.gray, color: disabled ? 'gray' : 'white' }}
                    onClick={() => { props.setNavState(props.navState + 1) }}
                >
                    <p >Next </p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>

                </button>

            </div>
        </div>
    )
}

export default AddVideo
