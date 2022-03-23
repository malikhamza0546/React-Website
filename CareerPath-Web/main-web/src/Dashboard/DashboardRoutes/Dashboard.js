import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
// import Navbar from '../../Navbar/Navbar'
// import MainContent from '../MainContent/MainContent'
import RightSide from '../rightSide/rightSide'
import Sidebar from '../Sidebar/Sidebar'
import Home from '../MainContent/Home/Home'
import ProfileTop from '../MainContent/Profile/ProfileTop/ProfileTop'
// import ProfileBio from '../MainContent/Profile/ProfileBio/ProfileBio'
import ViewBookings from '../MainContent/Bookings/ViewBookings/ViewBookings'
import Payments from '../MainContent/Payments/Payments'
import NotificationsSetting from '../MainContent/NotificationsSetting/NotificationsSetting'
import ChangeEmailComponent from '../MainContent/ChangeEmailComponent/ChangeEmailComponent'
import ChangePasswordComponent from '../MainContent/ChangePasswordComponent/ChangePasswordComponent'
import Profile from '../MainContent/Profile/Profile'
import Colors from '../../Colors/Colors'
import Availabilty from '../MainContent/Availability/Availability'
import { Route, Routes } from 'react-router-dom'
import VideoChat from '../../VideoCall/videoChat';



const Dashboard = () => {
    const [bookingNavState, setBookingNavState] = useState(0)
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    const [user, setUser] = useState({})
    const [navState, setNavState] = useState(0)
    let type = JSON.parse(localStorage.getItem('type'))
    useEffect(() => {
        let id = localStorage.getItem("id")
        axios.get(process.env.REACT_APP_SERVER_PATH + `/users/${id}`)
            .then((response) => {
                console.log(response);
                if (type === 'professional') {
                    axios.get(process.env.REACT_APP_SERVER_PATH + `/professionals/${id}`).then((response) => {
                        setUser(response.data)
                    }).catch(function (error) {
                        if (error.response) {
                            // Request made and server responded
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            // The request was made but no response was received
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', error.message);
                        }

                    });
                } else if (type === 'customer') {
                    setUser(response.data)
                    console.log('Data of type customer from Dashboard')
                    // axios.get(process.env.REACT_APP_SERVER_PATH + `/customers/${id}`).then((response) => {
                    //     console.log(response.data, "user Info")
                    //     setUser(response.data)
                    // }).catch(e => {
                    //     console.log('Error in fetching Customer Api in Dashboard page')
                    // })
                }

                console.log(response.data.first_name);
            }).catch((e) => {
                console.log("error")
            })
    }, [])

    return (
        <div className="bg-gray-100 h-full w-full"
            style={{ backgroundColor: Colors.gray }}>
            <Navbar />
            <hr />
            <div className="container mx-auto px-16 my-6 flex justify-between">
                <div className="w-1/4 ">
                    <Sidebar setNavState={setNavState} navState={navState}
                        setBookingNavState={setBookingNavState}
                        user={user && user} />
                </div>
                <div className="w-2/4 mx-6">
                    <Routes>
                        <Route path="*" element={<div className="absolute top-0 left-0 bg-black w-screen h-screen flex items-center justify-center" style={{ zIndex: '1000' }}><div>
                            <img src="/notfound.gif" />
                        </div></div>} />
                        <Route path="home" element={<Home user={user && user}
                            bookingNavState={bookingNavState}
                            setBookingNavState={setBookingNavState}
                            navState={navState}
                            setNavState={setNavState} />} />
                        <Route path="availability" element={<div>
                            <ProfileTop user={user && user}
                                setBookingNavState={setBookingNavState}
                                setNavState={setNavState} />
                            <Availabilty user={user && user}
                                bookingNavState={bookingNavState}
                                setBookingNavState={setBookingNavState}
                                navState={navState}
                                setNavState={setNavState} /></div>} />
                        < Route path="profile/*" element={<div>
                            <ProfileTop user={user && user}
                                setBookingNavState={setBookingNavState}
                                setNavState={setNavState} />
                            <Profile user={user && user} />
                        </div>} />
                        <Route path="bookings/*" element={<ViewBookings user={user && user}
                            bookingNavState={bookingNavState}
                            setBookingNavState={setBookingNavState} />} />
                        <Route path="payments/*" element={<div>
                            <Payments user={user && user} />
                        </div>} />
                        <Route path="notifications" element={<div>
                            <ProfileTop user={user && user}
                                setBookingNavState={setBookingNavState}
                                setNavState={setNavState} />
                            <NotificationsSetting user={user && user} />
                        </div>} />
                        <Route path="changeemail" element={<div>
                            <ProfileTop user={user && user}
                                setBookingNavState={setBookingNavState}
                                setNavState={setNavState} />
                            <ChangeEmailComponent user={user && user} />
                        </div>} />
                        <Route path="changepassword" element={<div>
                            <ProfileTop user={user && user}
                                setBookingNavState={setBookingNavState}
                                setNavState={setNavState} />
                            <ChangePasswordComponent user={user && user} />
                        </div>} />
                    </Routes>

                </div>
                <div className="w-1/4">
                    {user && <RightSide user={user} setNavState={setNavState} navState={navState} />}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
