import React, { Component, useState, useRef } from "react";
import ReuseableComponent from "./reuseableComponent/reuseableComponent"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LeftArrow from "../Arrows/LeftArrow";
import RightArrow from "../Arrows/RightArrow";
import { Link } from "react-router-dom";

const ReuseableComponents = (props) => {
    let Ref = useRef(null)
    const [settings] = useState({
        dots: false,
        speed: 500,
        slidesToShow: props.len <= 4 ? props.len : 5,
        arrows: false,
        responsive: [
            {
                breakpoint: 1056,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })

    const SlickNext = () => {
        Ref.current.slickNext()
    }
    const SlickPrev = () => {
        Ref.current.slickPrev()
    }
    let Catagory = null
    if (props.name === 'Featured') {
        Catagory = (<div>
            <div className="container mx-auto my-6 px-16 py-2 flex justify-between items-center">
                <div className="text-gray-900 text-2xl font-bold" >
                    {props.name}
                </div>
                <div className="text-md text-gray-600 flex items-center">
                    <LeftArrow click={SlickPrev} />
                    <RightArrow click={SlickNext} />
                </div>
            </div>
            <div className="container mx-auto my-6 px-16">
                <Slider {...settings} ref={Ref}>
                    {
                        props.Featured.map((p, i) => {
                            return <Link to={`profile/${p.User.id}`}
                                key={i}>
                                <ReuseableComponent
                                    name={p.User.first_name}
                                    designation={p.job_title}
                                    time={p.response_time}
                                    price={p.session_price_15_min}
                                    image={p.User.profile_photo}
                                />
                            </Link>
                        })
                    }
                </Slider>
            </div>
        </div>
        )
    } else {
        Catagory = null
    }

    return (
        <div>
            {Catagory}
        </div>
    );
}

export default ReuseableComponents;