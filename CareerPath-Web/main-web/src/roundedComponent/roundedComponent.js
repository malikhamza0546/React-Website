import React, { useRef, useState } from "react";
import Featured from "./roundedComponent/roundedComponent"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LeftArrow from "../Arrows/LeftArrow";
import RightArrow from "../Arrows/RightArrow";
import { Link } from "react-router-dom";

const RoundedComponent = (props) => {
    const [settings] = useState({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: props.Company.length,
        slidesToScroll: 1,
        arrows: false,
    })
    const Ref = useRef(null);
    const SlickNext = () => {
        Ref.current.slickNext()
    }
    const SlickPrev = () => {
        Ref.current.slickPrev()
    }

    return (
        <div className="bg-gray-100 py-5">
            <div className="container mx-auto my-6 px-16  flex flex-row justify-between items-center">
                <div className="text-gray-800 text-2xl font-bold">
                    {props.name}
                </div>
                <div className="text-md flex flex-row items-center text-gray-500">
                    <LeftArrow click={SlickPrev} />
                    <RightArrow click={SlickNext} />
                </div>
            </div>
            <div className="container mx-auto my-6 px-16">
                <Slider {...settings} ref={Ref}>
                    {
                        props.Company.map((p, i) => {
                            return <Link key={i}
                                to={{
                                    pathname: `/listing?search=${p.name}`,
                                }}> <Featured image={p.profile_photo} /></Link>
                        })
                    }
                </Slider>
            </div>
        </div>
    );
}

export default RoundedComponent;