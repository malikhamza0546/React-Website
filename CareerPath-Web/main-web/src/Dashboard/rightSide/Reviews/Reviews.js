import React from 'react'
import { pricetoDecimal } from '../../../price';
import Ratings from '../../../Rating/Ratings'
import { Link } from 'react-router-dom'
// import ReactStars from "react-rating-stars-component";

const Reviews = ({ user, setNavState }) => {
    let rating = 0
    let type = JSON.parse(localStorage.getItem('type'))
    console.log(type, ">>>>>>>>>type>>>")
    let ratingFromApi = (+user.avgRating)
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
    console.log(">>>>>>>>>>>>>>>>>users from review", user);
    return (
        <div className="bg-white px-4 py-7 rounded">
            <div className="flex w-full justiify-between">
                <div className="w-16 h-16 rounded-full border border-blue-400 flex items-center justify-center">
                    <img src={type === 'professional' ? user.User?.profile_photo : user.profile_photo}
                        alt="alon" className="w-16 h-16 rounded-full p-1 object-cover" />
                </div>
                <div className="flex flex-col mx-3">
                    <div className="flex items-center">
                        <p className="text-xl font-bold">{type === 'professional' ? `${user.User?.first_name} ${user.User?.last_name}`
                            : `${user.first_name} ${user.last_name}`}</p>
                        <Link to="profile">
                            <button className="h-4 w-4 ml-3 hover:text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="gray">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg></button></Link>
                    </div>
                    <div>
                        <div className='flex items-center -my-1'>
                            {user.avgRating > 0 ? <div>
                                {user.avgRating && <Ratings
                                    value={rating}
                                    size={20}
                                    activeColor="#ffd700"
                                    isHalf={true}
                                    edit={false}
                                />}
                            </div> : <Ratings
                                value={0}
                                size={20}
                                activeColor="#ffd700"
                                isHalf={true}
                                edit={false}
                            />}
                            &nbsp;&nbsp;<p className='text-gray-500'>{user.avgRating ? (+user.avgRating).toFixed(2) : Math.trunc(0).toFixed(1)}</p>
                        </div>
                        <p className="text-xs">{user.reviewCount ? user.reviewCount : 0} reviews</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <div className="text-lg text-gray-500">Balance</div>
                <div className="text-2xl text-gray-700">{type === 'professional' ? pricetoDecimal(user.User?.wallet) : pricetoDecimal(user.wallet)}</div>
            </div>
        </div>
    )
}

export default Reviews
