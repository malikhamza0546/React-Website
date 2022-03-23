import React, { useState, useEffect, useCallback } from 'react'
import Catagories from '../Catagories/Catagories'
import Filters from '../Filters/Filters'
import Footer from '../Footer/Footer'
import MainImage from '../mainImage/mainImage'
import Navbar from '../Navbar/Navbar'
import Loader from '../Loader/Loader'
import RoundedComponent from '../roundedComponent/roundedComponent'
import ReuseableComponent from '../reusableComponents/reuseableComponents'
import LatestProfessionals from '../LatestProfessionals/LatestProfessioanls'
import axios from 'axios'

const Landing = (props) => {
    const [isLoading, setLoading] = useState(true)
    const [isLogin, setLogin] = useState(true)
    const [latestProfessionals, setLatestProfessionals] = useState([])
    const [Featured, setFeatured] = useState([])
    const [Company, setCompany] = useState([])
    const [catagories, setCatagories] = useState([])


    const getFeatured = useCallback(() => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/professionals?featured`).then((response) => {
            let FilteredFeatured = response.data.filter((user) => {
                return !(+localStorage.getItem('id') === user.user_id)
            })
            setFeatured(FilteredFeatured)
            setLoading(false)
        }).catch((e) => {
            console.log("Error in Fetching Featured Professionals Api in Landing Page")
        })
    }, [])
    useEffect(() => {
        getFeatured();
        axios.get(process.env.REACT_APP_SERVER_PATH + `/getIndustryStats`).then((response) => {
            setCatagories(response.data)
            console.log(response.data, 'Industries')
            setLoading(false)
        }).catch((e) => {
            console.log("Error in Fetching getIndustry Status Api in Landing Page")

        })
        axios.get(process.env.REACT_APP_SERVER_PATH + `/professionals`).then((response) => {
            setLatestProfessionals(response.data)
            setLoading(false)
        }).catch((e) => {
            console.log("Error in Fetching Professionals Api in Landing Page")


        })
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/company`).then((response) => {
            setCompany(response.data)
            setLoading(false)
        }).catch((e) => {
            console.log("Error in Fetching Company Api in Landing Page")


        })
        window.scrollTo(0, 0);
    }, [getFeatured])
    if (isLogin) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div>
            <Navbar />
            <hr />
            <Filters />
            <MainImage />
            {
                !isLoading
                    ?
                    Featured.length > 0 && <ReuseableComponent name="Featured" Featured={Featured} len={Featured.length} />
                    :
                    <div className="flex justify-center items-center"><Loader /></div>
            }
            {Company.length > 0 && <RoundedComponent name="Company" Company={Company} />}
            <Catagories name="Industries" catagories={catagories} />
            <LatestProfessionals name="New Professionals" LatestProfessionals={latestProfessionals} />
            <Footer />
        </div>
    )
}

export default Landing
