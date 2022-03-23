import React, { useEffect, useState } from 'react';
import Button from "../buttons/buttons";
import axios from 'axios';
import { Link } from 'react-router-dom';
const Filters = () => {
    const [industryData, setIndustryData] = useState([])
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_PATH + `/getIndustryStats`)
            .then((response) => {
                setIndustryData(response.data)
            }).catch((e) => {
                console.log("Error in Fetching Industry Api from Filters.js in Landing page");
            })
    }, [])
    return (
        <div className="container mx-auto my-6 px-16 py-2 flex flex-wrap items-center">
            {industryData && industryData.map((industryData) => {
                return <Link to={`/listing?industry=${industryData.industry_id}`}>
                    <Button name={industryData.name} amount={industryData.UserCount} />
                </Link>
            })}
        </div>
    )
}

export default Filters
