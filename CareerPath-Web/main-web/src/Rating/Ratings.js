import React from 'react'
import ReactStars from "react-rating-stars-component";

const Ratings = (props) => {

    return (
        <ReactStars
            value={props.value ? props.value : 'not defined'}
            size={20}
            activeColor="#ffd700"
            isHalf={true}
            edit={false}
        />
    )
}

export default Ratings
