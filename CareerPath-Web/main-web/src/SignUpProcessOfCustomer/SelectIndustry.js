import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Colors from '../Colors/Colors'
import jwt_decode from 'jwt-decode'
import Loader from 'react-loader-spinner'

const SelectIndustry = (props) => {
    localStorage.setItem("navState", 2)
    const [isLoading,setLoading]=useState(false)
    const [industry, setIndustry] = useState([])
    const [selectedIndustry, setSelectedIndustry] = useState([])

    const getAllIndustries = () => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/industry`).then((response) => {
            console.log(response.data);
            setIndustry(response.data)
        }).catch(e => {
            console.log("error in industry api");
        })
    }
    useEffect(() => {
        getAllIndustries()
    }, [])

    const addIndustry = (id) => {
        let data = {
            user_id: jwt_decode(localStorage.getItem("customer_signup_token")).id,
            industry_id: id
        }
        axios.post(`${process.env.REACT_APP_SERVER_PATH}/customers_industries`, data).then((response) => {
            console.log(response);
            console.log("Industry Added");
        }).catch(e => {
            console.log("error in industry added");
        })
    }

    const removeIndustry = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVER_PATH}/customer/${jwt_decode(localStorage.getItem("customer_signup_token")).id}/industry/${id}`).then((response) => {
            console.log(response);
            console.log("Industry deleted");
        }).catch(e => {
            console.log("error in industry deleted");
        })
    }
    const handleIndustry = (id, name) => {
        if (selectedIndustry.includes(id)) {
            // Remove ID
            const selectedIndustryCopy = [...selectedIndustry]
            const itemIndex = selectedIndustryCopy.indexOf(id)
            selectedIndustryCopy.splice(itemIndex, 1)
            setSelectedIndustry(selectedIndustryCopy)
            removeIndustry(id)
        } else {
            // Add ID
            // selectedIndustry.push(id)
            setSelectedIndustry([...selectedIndustry, id])
            addIndustry(id)
        }

    }
    return (
        <div className="flex flex-col justify-center items-center text-gray-500 w-full">
            <img src="/CustomerFlow/Industry Advice.png" alt="addVideo" className="w-36" />
            <p className="text-2xl font-bold mt-3 text-gray-700">Select your Industry</p>
            <p className="text-xs mt-3 text-center">Let customers know which industries you specialise in. Select all that apply</p>
            <div className="w-full border rounded-lg p-4 flex flex-wrap mt-4">
                {industry.map((m) => { 
                    return <button className={`flex items-center border rounded m-1 py-2 px-3`}
                        style={{ backgroundColor: selectedIndustry.includes(m.id) ? Colors.blue : Colors.gray, color: selectedIndustry.includes(m.id) ? 'white' : '' }}
                        onClick={() => { handleIndustry(m.id, m.name) }}>{m.name}</button>
                })}
            </div>
            <div className="w-full flex justify-end items-center mt-4 text-white">
                <button className="py-2 px-8 rounded-lg flex" style={{ backgroundColor: selectedIndustry.length > 0 ? Colors.blue : Colors.gray, color: selectedIndustry.length > 0 ? 'white' : 'gray' }}
                    onClick={() => {
                        if (selectedIndustry.length > 0) {
                            props.setNavState(props.navState + 1)
                        }
                    }}>
                    <p >Next {isLoading ? <span className='inline-block ml-4'><Loader
                        type="TailSpin"
                        color="white"
                        height={20}
                        width={20}
                    // timeout={5000} //5 secs
                    /></span> : null}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default SelectIndustry
