import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import ReuseableComponent from '../reusableComponents/reuseableComponents'
import ProfileMainContent from './ProfileMainContent/ProfileMainContent'
import Reviews from './Reviews/Reviews'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const Profile = (props) => {
    const [reviews, setReviews] = useState([])
    const [experience, setExperience] = useState([])
    const [education, setEducation] = useState([])
    const [profile, setProfile] = useState([])
    let { id } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/user_reviews/${id}`).then((response) => {
            setReviews(response.data)
        }).catch(e => {
            console.log("Error in Reviews Api", e);
        })
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/experience/${id}`).then((response) => {

            setExperience(response.data)
        })
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/education/${id}`).then((response) => {
            setEducation(response.data)
        })
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/professionals/${id}`).then((response) => {
            setProfile(response.data)
        })
    }, []);
    return (
        <div>
            <Navbar />
            <hr />
            <ProfileMainContent id={id} profile={profile} experience={experience} education={education && education} />
            {console.log(reviews, "reviews from profile")}
            {reviews.length > 0 && <Reviews name="Reviews" reviews={reviews} />}
            <ReuseableComponent name="Finance" />
            <Footer />
        </div>
    )
}

export default Profile
