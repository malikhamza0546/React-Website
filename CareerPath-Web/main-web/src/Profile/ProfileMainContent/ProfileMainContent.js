import React, { Component, useEffect, useRef, useState } from 'react'
import FormikRadio from '../../FormikRadio/FormikRadio'
import Ratings from '../../Rating/Ratings'
import Education from '../Education/Education'
import moment from 'moment'
import ReactPlayer from 'react-player/lazy'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LeftArrow from "../../Arrows/LeftArrow";
import RightArrow from "../../Arrows/RightArrow";
import Colors from '../../Colors/Colors'

const ProfileMainContent = (props) => {
    const [settings] = useState({
        dots: false,
        infinite: false,
        speed: 500,
        // slidesToShow:5,
        slidesToShow: 1.2,
        slidesToScroll: 1,
        arrows: false,
    })
    const [play, setPlay] = useState(false)
    const [mute, setMute] = useState(true)
    const Ref = useRef(null)

    const SlickNext = () => {
        Ref.current.slickNext()
    }
    const SlickPrev = () => {
        Ref.current.slickPrev()
    }
    const responseTime = () => {
        const duration = moment.duration(props.profile.response_time, 'minutes');
        let responseTime = '';
        for (const [unit, value] of Object.entries(duration._data)) {
            if (value > 1) responseTime = `${value} ${unit}`;
            else if (value > 0) responseTime = `${value} ${unit.slice(0, -1)}`;
        }
        return responseTime
    }
    let rating = 0
    let ratingFromApi = (+props.profile.avgRating)
    console.log(ratingFromApi, "ratingFromApi")
    if (ratingFromApi > .30 && ratingFromApi < .70) {
        rating = 0.5
    }
    else if (ratingFromApi > .7 && ratingFromApi < 1.3) {
        console.log('ratingFromApi > .7 && ratingFromApi < 1.3')
        rating = 1
    } else if (ratingFromApi > 1.3 && ratingFromApi < 1.7) {
        console.log('ratingFromApi > 1.3 && ratingFromApi < 1.7')
        rating = 1.5
    } else if (ratingFromApi > 1.7 && ratingFromApi < 2.3) {
        console.log('ratingFromApi > 1.7 && ratingFromApi < 2.3');
        rating = 2
    } else if (ratingFromApi > 2.3 && ratingFromApi < 2.7) {
        console.log('ratingFromApi > 2.3 && ratingFromApi < 2.7');
        rating = 2.5
    } else if (ratingFromApi > 2.7 && ratingFromApi < 3.3) {
        console.log('ratingFromApi > 2.7 && ratingFromApi < 3.3');
        rating = 3
    } else if (ratingFromApi > 3.3 && ratingFromApi < 3.7) {
        console.log('ratingFromApi > 3.3 && ratingFromApi < 3.7');
        rating = 3.5
    } else if (ratingFromApi > 3.7 && ratingFromApi < 4.3) {
        console.log('ratingFromApi > 3.7 && ratingFromApi < 4.3');
        rating = 4
    } else if (ratingFromApi > 4.3 && ratingFromApi < 4.7) {
        console.log('ratingFromApi > 4.3 && ratingFromApi < 4.7');
        rating = 4.5
    } else if (ratingFromApi > 4.7 && ratingFromApi < 5) {
        console.log('ratingFromApi > 4.7 && ratingFromApi < 5');
        rating = 4.5
    } else if (ratingFromApi === 5) {
        console.log('ratingFromApi === 5.00');
        rating = 5
    } else {
        console.log('Nothing');
        rating = 0
    }
    console.log(props.profile.prof_intro_link, "{props.profile.prof_intro_link}");
    return (
        <div>
            <div className="container mx-auto lg:px-56 py-2 flex justify-between mt-4">
                <div className='w-2/5 mr-8'>
                    {props.profile.prof_intro_link ? <div>
                        <Slider {...settings} ref={Ref}>
                            <div style={{ height: '500px' }}>
                                {props.profile.prof_intro_link ? <div>
                                    <div className='absolute m-5 z-10 bottom-0 bg-white rounded-full p-1' onClick={() => setMute(!mute)}>
                                        {mute ? <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                                            </svg>
                                        </span> : <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </span>}
                                    </div>
                                    <Video
                                        link={props.profile.prof_intro_link}
                                        mute={mute}
                                        play={play}
                                        setPlay={setPlay} />
                                </div> : <img src={props.profile.User?.profile_photo ? props.profile.User?.profile_photo : '/avatar.png'} alt="photoss" className="border rounded-xl mr-6 w-full object-cover" style={{ height: '500px' }} />}
                            </div>
                            <div className='ml-8' style={{ height: '500px' }}>
                                <img src={props.profile.User?.profile_photo ? props.profile.User?.profile_photo : '/avatar.png'} alt="photoss" className="border rounded-xl mr-6 w-full object-cover" style={{ height: '500px' }} />
                            </div>
                        </Slider>
                    </div> : <div className=' ml-8'>
                        <img src={props.profile.User?.profile_photo ? props.profile.User?.profile_photo : '/avatar.png'} alt="photoss" className="border rounded-xl mr-6 w-full object-cover" style={{ height: '500px' }} />
                    </div>}
                    {props.profile.prof_intro_link ? <div className='w-full flex justify-end mt-4'>
                        <div className="text-md text-gray-600 flex flex-row items-center">
                            {/* <p>View All</p> */}
                            <LeftArrow click={SlickPrev} />
                            <RightArrow click={SlickNext} />
                        </div>
                    </div> : <div className='w-full flex justify-end mt-4'>
                        <div className="text-md text-gray-600 flex items-center">
                            {/* <p>View All</p> */}
                            <p className='h-6'></p>
                        </div>
                    </div>}
                </div>
                {/* {ConditionaforImageandVideo} */}
                <div className="w-3/5 pt-10">
                    <div className="py-1">
                        <div className="text-2xl font-bold text-gray-700 my-2 truncate">{props.profile.User?.first_name} {props.profile.User?.last_name}</div>
                        <div className="text-sm text-gray-500">{props.profile.job_title}</div>
                        <div className="text-xs text-gray-500 w-4/5 py-4">{props.profile.User?.bio}</div>
                        <div className={`flex items-center`}>
                            <div className="flex flex-col">
                                <div className='flex items-center'>
                                    {console.log((+props.profile.avgRating).toFixed(2), "props.profile.avgRating)")}
                                    {props.profile.avgRating > 0 ? <div>
                                        {props.profile.avgRating && <Ratings value={rating} />}
                                    </div> : <Ratings value={0} />}
                                    &nbsp;&nbsp;{props.profile.avgRating && <p className="text-gray-500">{(+props.profile.avgRating).toFixed(2)}</p>}
                                </div>
                                {props.profile.reviewCount > 0 ? <div>
                                    {props.profile.reviewCount && <p className="text-xs text-gray-600">{props.profile.reviewCount} reviews</p>}
                                </div> : <p className="text-xs text-gray-600">{0} reviews</p>}
                            </div>
                            <div className="flex flex-col ml-4">
                                <div className="flex flex-row items-center justify-center">
                                    <div>
                                        <img src="/Vector.png" alt="photos" className="w-2 h-3" />
                                    </div>
                                    <p className="text-gray-500">&nbsp;{responseTime() ? responseTime() : 0}</p>
                                </div>
                                <p className="text-xs text-gray-600">Response time</p>
                            </div>
                        </div>
                        {!(localStorage.getItem('id') === props.id) && <FormikRadio
                            id={props.id}
                            sessionPrice15={props.profile.session_price_15_min}
                            sessionPrice30={props.profile.session_price_30_min} />}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-56 py-6 flex justify-between mt-4 h-fit">
                {props.experience.length > 0 && <div className="mr-10 bg-gray-50 p-5 w-3/4 rounded-lg h-fit"
                    style={{ height: 'fit-content' }}
                >
                    <p className="text-3xl font-bold my-8 ml-2 text-gray-500">Experience</p>
                    {
                        props.experience.map((m, i) => {
                            return <Experience
                                key={i}
                                companyImage={m.profile_photo}
                                position={m.title}
                                companyName={m.company}
                                startDate={m.start_date}
                                endDate={m.end_date}
                                location={m.location}
                                description={m.description}
                                currentJob={m.current_job}
                            />
                        })

                    }
                </div>}
                {props.education.length > 0 && <div className="bg-gray-50 p-4 w-2/5 rounded-lg h-fit"
                    style={{ height: 'fit-content' }}>
                    <p className="text-3xl font-bold my-10 ml-2 text-gray-500 h-100">Education</p>
                    {props.education.map((m) => {
                        return <Education
                            universityImage={m.profile_photo}
                            education_type={m.field_of_study}
                            universityName={m.school}
                            education_time={m.end_date}
                        />
                    })}
                </div>}
            </div>
        </div>
    )
}

export default ProfileMainContent


const Experience = (props) => {
    const calcDate = (date1, date2) => {
        let diff = Math.floor(date1.getTime() - date2.getTime()) * -1;
        let day = 1000 * 60 * 60 * 24;
        let days = Math.floor(diff / day);
        let months = Math.floor(days / 31);
        let years = Math.floor(months / 12);
        let rem = months % 12;
        let message = years + " yrs "
        message += rem + " mos "
        return message
    }
    console.log('companyImage={p.profile_photo}', props.companyImage)

    return (
        <div className="py-2">
            <div className="flex flex-row ">
                <img src={props.companyImage ? props.companyImage : '/avatar.png'} alt="" className="w-20 h-20 rounded-full object-cover" />
                <div className="flex flex-col ml-5" >
                    <p className="text-lg text-gray-500 font-bold">{props.position}</p>
                    <p className="text-sm text-black">{props.companyName} - {props.location}</p>
                    <div className='flex items-center'>
                        <p className="text-sm text-gray-400"> {`${moment(props.startDate).format("MMM YYYY")} - `}</p>
                        {props.currentJob === "1" ? <p className="text-sm text-gray-400">&nbsp;Present</p> : <p className="text-sm text-gray-400">&nbsp;{`${moment(props.endDate).format("MMM YYYY")}`}</p>}
                        <p className="text-gray-400">&nbsp;•&nbsp;</p>
                        <p className="text-sm text-gray-400">  {
                            props.currentJob === "1"
                                ?
                                calcDate(new Date(props.startDate), new Date())
                                :
                                calcDate(new Date(props.startDate), new Date(props.endDate))
                        }
                        </p>
                    </div>

                    <div className="overflow-ellipsis mt-2">
                        <p className="text-xs text-gray-500">
                            {props.description}
                        </p>
                    </div>
                </div>
            </div>
            <hr className="mt-4" />
        </div>
    )
}


const Video = (props) => {
    const videoRef = useRef(null)
    const [play, setPlay] = useState(true)
    useEffect(() => {
        playVideo()
    }, [])
    const playVideo = () => {
        if (play) {
            videoRef.current.play()
            setPlay(false)
        } else {
            videoRef.current.pause()
            setPlay(true)
        }

    }

    console.log(play, "play")
    return <div style={{ height: '500px' }}>
        {/* <button className='absolute bg-white bottom-8 left-80' >sese</button> */}
        <div className='absolute bg-white m-4 z-10 rounded-full p-1' onClick={playVideo}>
            {!play ? <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </span> : <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
            </span>}
        </div>

        <video ref={videoRef}
            className=' w-full object-cover rounded-xl border'
            muted={props.mute}
            // controls={false}
            // autoPlay={true}

            onEnded={() => setPlay(true)}
            style={{ height: '500px' }}
            key={props.link} >
            <source src={props.link} />

        </video>
    </div>
}