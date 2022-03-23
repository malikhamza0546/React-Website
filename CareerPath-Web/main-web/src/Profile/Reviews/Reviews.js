import React, { Component, useRef, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import Review from './Review/Review'
import LeftArrow from '../../Arrows/LeftArrow';
import RightArrow from '../../Arrows/RightArrow';
import Ratings from '../../Rating/Ratings'

const Reviews = (props) => {
    const [show, setShow] = useState(false)
    const [settings] = useState({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        // autoplay: true,
        // autoplaySpeed: 3000,
        // pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1208,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 648,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    })
    const Ref = useRef(null)
    const toggleShow = () => {
        setShow(prevState => !prevState)
    }
    if (show) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    const SlickNext = () => {
        Ref.current.slickNext()
    }

    const SlickPrev = () => {
        Ref.current.slickPrev()
    }
    console.log(props.reviews, "reviews fro reviews")
    return (
        <div >
            {show && <ReviewAll
                toggle={toggleShow}
                overlay="overlay"
                modal="modal"
                modalcontent="modal-content"
                closeModal="close-modal"
                modalValue={show}
                reviews={props.reviews}
            />}
            <div className='container mx-auto px-56'>
                <div className="py-2 flex flex-row justify-between items-center my-4">
                    <div className="text-2xl font-bold">
                        {props.name}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-200" onClick={() => setShow(prevState => !prevState)}>
                        <p className='text-gray-800'>See all<span className='font-bold rounded-full mx-1'>{props.reviews.length}</span>reviews</p>
                        {/* <LeftArrow click={SlickPrev} />
                        <RightArrow click={SlickNext} /> */}
                        {/* <LeftArrow />
                        <RightArrow /> */}
                    </div>
                </div>
                <div>
                    {props.reviews.slice(0, 2).map(r => {
                        return <Review
                            reviewer_image={r.reviewer_image}
                            reviewer_name={r.reviewer_name}
                            reviewer_points={r.rating}
                            reviewer_description={r.feedback}
                            reviewerData={r.reviewer}
                            arrLength={props.reviews.length} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Reviews

const Review = (props) => {
    return (
        <div className='w-full bg-gray-100  mb-2 flex flex-col rounded-xl p-4 '>
            <div className='flex w-full '>
                <div className='w-1/12 flex items-center justify-center'>
                    <div className='w-12 h-12 bg-blue-400 flex items-center justify-center  rounded-full '>
                        <p className='font-bold w-12 h-12  items-center justify-center flex'>{props.reviewerData?.first_name ? (props.reviewerData?.first_name).charAt(0) : 'A'}</p>
                    </div>
                </div>
                <div>
                    <Ratings value={+props.reviewer_points} />
                </div>
                {/* <p className='text-sm text-gray-500 mt-2'>Abdul Majid</p> */}
            </div>
            <div className='p-2 flex w-full items-start mt-2'>
                <div className='w-1/12 flex items-center justify-center'>
                    <div>
                        <p>{props.reviewerData?.first_name ? `${(props.reviewerData?.first_name).charAt(0)}*****` : 'A'}</p>
                    </div>
                </div>
                <div className="text-sm text-gray-500 italic">
                    <p>{props.reviewer_description ? `"${props.reviewer_description}"` : 'No review description'}</p>
                </div>
            </div>

            {/* <div className='flex items-center'>
                <Ratings value={+props.reviewer_points} />
                <p className="ml-2 text-gray-700">{props.reviewer_points.toFixed(1)}</p>
            </div>
            <div className="mt-3 text-xs text-gray-500 italic">
                <p>{props.reviewer_description ? `"${props.reviewer_description}"` : 'No review description'}</p>
            </div> */}
        </div>
    )
}

const ReviewAll = (props) => {
    return (
        <div className={props.modal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className={props.overlay}></div>
            <div className='w-2/5 z-50 bg-white rounded-lg p-4 px-12'>
                <div className='mb-4 flex justify-between items-center'>
                    <p className='text-2xl font-bold'>All reviews</p>
                    <span className='bg-gray-200 rounded-full p-2 hover:bg-gray-400' onClick={props.toggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                </div>
                <div className="h-96 overflow-auto">
                    {props.reviews.map(r => {
                        return <ReviewAllComponent
                            reviewer_image={r.reviewer_image}
                            reviewer_name={r.reviewer_name}
                            reviewer_points={r.rating}
                            reviewer_description={r.feedback}
                            reviewerData={r.reviewer}
                            arrLength={props.reviews.length} />
                    })}
                </div>
            </div>
        </div>
    )
}

const ReviewAllComponent = (props) => {
    return (
        <div className='w-full bg-gray-100  mb-2 flex flex-col rounded-xl p-4 '>
            <div className='flex'>
                <div className='w-1/12 flex items-center justify-center'>
                    <div className='w-12 h-12 bg-blue-400 flex items-center justify-center  rounded-full '>
                        <p className='font-bold w-12 h-12  items-center justify-center flex'>{props.reviewerData?.first_name ? (props.reviewerData?.first_name).charAt(0) : 'A'}</p>
                    </div>
                </div>
                <div className='ml-4 flex items-center justify-center'>
                    <div>
                        <p>{props.reviewerData?.first_name ? `${(props.reviewerData?.first_name).charAt(0)}*****` : 'A'}</p>
                    </div>
                </div>
            </div>
            <div>
                <Ratings value={+props.reviewer_points} />
            </div>
            <div className='p-2 flex w-full items-start'>
                <div className="text-sm text-gray-500 italic">
                    <p>{props.reviewer_description ? `"${props.reviewer_description}"` : 'No review description'}</p>
                </div>
            </div>
        </div>
    )
}
