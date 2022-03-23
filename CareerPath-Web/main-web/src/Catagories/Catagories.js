import React, { Component, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import RightArrow from "../Arrows/RightArrow";
import LeftArrow from "../Arrows/LeftArrow";
import { Link } from "react-router-dom";
import axios from 'axios';
const Catagories = (props) => {
    let Ref = useRef(null)
    const [colors] = useState(['purple.png', 'yellow.png', 'green.png'])
    const [settings] = useState({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
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
    const SlickNext = () => {
        Ref.current.slickNext()
    }

    const SlickPrev = () => {
        Ref.current.slickPrev()
    }
    let counter = 0
    return (
        <div>
            <div className="container mx-auto my-6 px-16 py-2 flex flex-row justify-between items-center">
                <div className="text-gray-800 text-2xl font-bold">
                    {props.name}
                </div>
                <div className="text-md flex flex-row items-center text-gray-500">
                    <p>View All</p>
                    <LeftArrow click={SlickPrev} />
                    <RightArrow click={SlickNext} />
                </div>
            </div>
            <div className="container mx-auto my-6 py-2 px-16">
                <Slider {...settings} ref={Ref}>
                    {
                        props.catagories.map((p, i) => {
                            let counter2 = counter
                            if (counter === 2) {
                                counter = 0
                            } else {
                                counter += 1
                            }
                            return <Link key={i} to={`/listing?industry=${p.industry_id}`} state={{ id: p.id }}>
                                <Industry
                                    image={colors[counter2]}
                                    label={p.name}
                                    count={p.UserCount}
                                    icon={p.industry_image} />
                            </Link>
                        })
                    }
                </Slider>
            </div>
        </div>
    );
}


export default Catagories;

const Industry = ({ image, label, count, icon }) => {

    return (
        <div className="m-3 p-4 rounded-xl text-white hover:shadow-lg overflow-hidden h-48" style={{
            backgroundImage: `url(${image})`, backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            <div className="p-4 flex justify-center flex-col items-center">
                <img src={icon ? icon : 'avatar.png'} alt="icon" className="w-20 h-20 rounded-full object-cover" />
                <p className="text-xl mt-4">{label}</p>
                <p className="test-sm">{count} profeesionals</p>
            </div>
        </div>
    );
}