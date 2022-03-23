import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import "./Navbar.css"
import Notifications from "react-notifications-menu";
import zIndex from '@mui/material/styles/zIndex'
import DropDown from './DropDownSelection/DropDownSelection';
import Colors from '../Colors/Colors';
import styled from "styled-components";
import SignUpProcess from '../SignUpProcess/SignUpProcess'
import SignUpProcessOfCustomer from '../SignUpProcessOfCustomer/SignUpProcessOfCustomer'
import moment from 'moment'
const DEFAULT_NOTIFICATION = {
    image:
        "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
    message: "Notification one.",
    detailPage: "/events",
    receivedTime: "12h ago"
};
const DropDownList = styled("ul")`
  z-index:2;
  padding: 0;
  margin: 0;
  background: ${Colors.grey};
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: black;
  border-radius:13px;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
  postion:absolute;
`;
const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.4em;
`;

const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
    const [user, setUser] = useState({})
    const [data, setData] = useState();
    const [show, setShow] = useState(false)
    const [professionalSignUpFlow, setProfessionalSignUpFlow] = useState(false)
    const [customerSignUpFlow, setCustomerSignUpFlow] = useState(false)
    const [searchQuery, setSearchQuery] = useState(null);
    const [searchDropDown, setSearchDropDown] = useState({
        filter_: "",
        data_: [],
    });
    let notificationsArray
    let navigate = useNavigate()
    const toggling = () => {
        setIsOpen(true);
    }
    const toggleLogin = () => {
        setLogin(!login);
    };

    const toggleProfessionalSignUpFlow = () => {
        setProfessionalSignUpFlow(!professionalSignUpFlow);
    };

    const toggleCustomerSignUpFlow = () => {
        setCustomerSignUpFlow(!customerSignUpFlow);
        setLogin(false)
        setSignup(false)
        setProfessionalSignUpFlow(false)
    };


    const toggleSignUp = () => {
        setSignup(!signup)
    }

    const handleChanger = event => {
        toggling();
        setSearchQuery(event.target.value);
        if (event.target.value === '') {
            setIsOpen(false);
            return;
        }
        axios.get(process.env.REACT_APP_SERVER_PATH + `/professionals?search=${event.target.value}`)
            .then((response) => {
                let arrayofObj = response.data;
                let first_lastName = arrayofObj.map((item) => {
                    return ({
                        user_id: item.user_id,
                        fname: item.User.first_name,
                        lname: item.User.last_name,
                        job_title: item.job_title,
                        profilePhoto: item.User.profile_photo
                    })
                });
                setSearchDropDown({ ...searchDropDown, data_: first_lastName });
            }).catch(() => {
                console.log("Error while Searching");
                setUser({})
            })
    };

    if (login) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    if (signup) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    useEffect(() => {
        let id = JSON.parse(localStorage.getItem("id"))
        axios.get(process.env.REACT_APP_SERVER_PATH + `/users/` + id)
            .then((response) => {
                setUser(response.data)
            }).catch(() => {
                setUser({})
            })
        let notificationArray = []
        axios.get(process.env.REACT_APP_SERVER_PATH + `/notifications_history/` + id + `?limit=100`)
            .then((response) => {
                setData(response.data)
            }).catch(() => {
                setUser({})
            })
    }, [login, signup])

    const profileImgTag =
        <div >
            <img src={user.profile_photo ? user.profile_photo : '/avatar.png'} alt="avatar" className="mr-3 w-14 h-14 rounded-full object-cover" />
        </div>

    const dropdownforProfile = searchDropDown.data_.length ? (searchDropDown.data_).map((obj) => {
        return (<div onClick={() => {
            navigate(`/profile/${obj.user_id}`)
            window.location.reload(false);
        }}>
            <ListItem className="cursor-pointer hover:text-gray-500 hover:bg-gray-100 py-2 -my-2" >
                <div className='flex items-center justify-center'>
                    <div style={{ width: "20%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img className="w-12 h-12 rounded-full object-cover" src={obj.profilePhoto ? obj.profilePhoto : '/avatar.png'} alt="Hello" />
                    </div>
                    <div className='' style={{ paddingTop: "6px", display: "flex", width: "80%", alignItems: "flex-start", justifyContent: "center", flexDirection: "column" }}>
                        <div className='truncate'>
                            {obj.fname} {obj.lname}
                        </div>
                        <div className='truncate overflow-x-hidden' style={{ fontSize: "13px" }}>
                            {obj.job_title}
                        </div>
                    </div>
                </div>
            </ListItem>
        </div>
        )
    }) : (<div>
        <ListItem style={{ backgroundColor: Colors.grey }} className="cursor-pointer hover:text-gray-500" onClick={() => {
            toggling()
        }}>
            <div className='flex items-center justify-center'>
                <p className='text-lg py-2'>No record found</p>
            </div>
        </ListItem>
    </div>
    )

    return (
        <div className="w-full bg-white">

            {login && (
                <SignIn
                    toggle={toggleLogin}
                    overlay="overlay"
                    modal="modal"
                    modalcontent="modal-content"
                    closeModal="close-modal"
                    modalValue={login} />
            )}
            {professionalSignUpFlow && (
                <SignUpProcess
                    toggle={toggleProfessionalSignUpFlow}
                    overlay="overlay"
                    modal="modal"
                    modalcontent="modal-content"
                    closeModal="close-modal"
                    modalValue={professionalSignUpFlow} />
            )}
            {signup && (
                <SignUp
                    toggle={toggleSignUp}
                    overlay="overlay"
                    modal="modal"
                    modalcontent="modal-content"
                    closeModal="close-modal"
                    modalValue={signup} />
            )}
            {customerSignUpFlow && (
                <SignUpProcessOfCustomer
                    toggle={toggleCustomerSignUpFlow}
                    overlay="overlay"
                    modal="modal"
                    modalcontent="modal-content"
                    closeModal="close-modal"
                    modalValue={customerSignUpFlow} />
            )}
            <div className="container mx-auto px-16 py-2 flex flex-row items-center justify-between w-full bg-white">
                <div>
                    <Link to='/'>
                        <img src="/logo.png" alt="logo" />
                    </Link>
                </div>
                <div style={{ height: "60px" }} className="right flex items-center">
                    <div style={{ backgroundColor: Colors.grey, marginBottom: "6px", position: "relative" }} className="flex items-center border-2 border-gray-300 bg-white h-10 mr-3 mt-1 p-1 rounded-full text-sm">
                        <Link to={`/listing?search=${searchQuery}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="black">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            navigate(`/listing?search=${searchQuery}`)
                            window.location.reload(true)
                        }}>
                            <input style={{ backgroundColor: 'transparent', color: "black" }} value={searchQuery} placeholder="Search..." className="mt-1 sm:w-36 md:w-64 lg:w-96 pl-5 focus:outline-none" onChange={handleChanger} />
                        </form>
                        {isOpen && <DropDownList className="z-20 overflow-auto overflow-x-hidden" style={{ paddingTop: '0.4em', borderRadius: '10px', position: "absolute", top: "50px", width: "100%", backgroundColor: "white" }}>
                            {dropdownforProfile}
                        </DropDownList>}
                    </div>

                    {/* <Notifications
                        style={{ zIndex: '30' }}
                        data={data}
                        header={{
                            title: "Notifications",
                            option: { text: "View All", onClick: () => console.log("Clicked") }
                        }}
                        markAsRead={(data) => {

                        }}
                    /> */}
                    <div style={{ display: "flex", justifyContent: localStorage.getItem("token") ? "space-between" : "flex-end", alignItems: "center" }}>
                        {localStorage.getItem("token") ? <div > <span onClick={() => setShow(!show)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="gray">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </span> {show ? <div className='transition-all duration-500 w-96 h-96 flex flex-col overflow-auto border-2 absolute right-48 top-16 rounded z-80' style={{ zIndex: '100000' }}>{data.map(notification => {
                            return <div className="w-full  hover:bg-gray-200 items-center px-4 flex bg-gray-100 border-b-2 h-24 py-2"
                                onClick={() => {
                                    navigate(`/dashboard/bookings/${notification.resource_id}`)
                                    window.location.reload()
                                }}>
                                <div className=' border border-green-500 rounded-full flex items-center justify-center'>
                                    <img src='/calendar.png' className='p-2 w-8 object-cover' />
                                </div>
                                <div className='ml-4 flex flex-col'>
                                    <p className='text-sm'>{notification.notif_string}</p>
                                    <p className='text-xs'>{moment(notification.createdAt).format('dddd, MMM DD, YYYY hh:mm A')}</p>
                                </div>
                            </div>
                        })}</div> : null}</div> : null}
                        {
                            localStorage.getItem("token") &&
                            <div className="z-10">
                                <DropDown profileImgTag={profileImgTag} />
                            </div>
                        }

                        <div className="flex">
                            {localStorage.getItem("id") && localStorage.getItem("token") ? null : <div>
                                <button style={{ backgroundColor: Colors.blue }} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border rounded-lg" onClick={toggleLogin} >Login </button>
                                <button style={{ backgroundColor: Colors.blue }} className="bg-blue-500 hover:bg-blue-700 text-white py-2 ml-3 px-4 border rounded-lg" onClick={toggleProfessionalSignUpFlow}>Professional Sign Up </button>
                                <button style={{ backgroundColor: Colors.blue }} className="bg-blue-500 hover:bg-blue-700 text-white py-2 ml-3 px-4 border rounded-lg" onClick={toggleCustomerSignUpFlow}>Customer Sign Up </button>
                            </div>}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar
