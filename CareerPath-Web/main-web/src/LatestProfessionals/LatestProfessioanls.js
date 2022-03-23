import React, { Component } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import RightArrow from "../Arrows/RightArrow";
// import LeftArrow from "../Arrows/LeftArrow";
// import { Link } from "react-router-dom";
import FilterUsers from "../Listing/FilterUsers/FilterUsers";
// import axios from 'axios';
const LatestProfessionals = (props) => {

    return (
        <div className="container px-16 mx-auto">
            <div>
                <div className="text-gray-800 text-2xl font-bold">
                    {props.name}
                </div>
            </div>
            <div className="my-6">
                <FilterUsers Featured={props.LatestProfessionals} />
            </div>
        </div>
    );
}

export default LatestProfessionals;