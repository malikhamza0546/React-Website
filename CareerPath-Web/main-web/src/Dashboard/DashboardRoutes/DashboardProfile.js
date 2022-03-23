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


const DashboardProfile = () => {
    const [bookingNavState, setBookingNavState] = useState(0)
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    const [user, setUser] = useState({})
    const [navState, setNavState] = useState(1)
    let ComponentToRender = null
    useEffect(() => {
        let id = JSON.parse(localStorage.getItem("id"))
        axios.get(process.env.REACT_APP_SERVER_PATH + `/professionals/${id}`)
            .then((response) => {
                console.log(response);
                setUser(response.data)
                console.log(response.data.first_name);
            }).catch(() => {
                console.log("error")
            })
    }, [])
    switch (navState) {
        case 0:
            ComponentToRender = <Home user={user && user}
                bookingNavState={bookingNavState}
                setBookingNavState={setBookingNavState}
                navState={navState}
                setNavState={setNavState} />
            break;
        case 1:
            ComponentToRender = (<div>
                <ProfileTop user={user && user}
                    setBookingNavState={setBookingNavState}
                    setNavState={setNavState} />
                <Profile user={user && user} />
                {/* <ProfileBio  /> */}
            </div>
            )
            break;
        case 2:
            ComponentToRender = (<div>
                <ViewBookings user={user && user}
                    bookingNavState={bookingNavState}
                    setBookingNavState={setBookingNavState} />
            </div>
            )
            break;
        case 3:
            ComponentToRender = (<div>
                <ProfileTop user={user && user}
                    setBookingNavState={setBookingNavState}
                    setNavState={setNavState} />
                <Payments />
            </div>
            )
            break;
        case 4:
            ComponentToRender = (<div>
                <ProfileTop user={user}
                    setBookingNavState={setBookingNavState}
                    setNavState={setNavState} />
                <NotificationsSetting user={user && user} />
            </div>
            )
            break;

        case 5:
            ComponentToRender = (<div>
                <ProfileTop user={user && user}
                    setBookingNavState={setBookingNavState}
                    setNavState={setNavState} />
                <ChangeEmailComponent />
            </div>
            )
            break;

        case 6:
            ComponentToRender = (<div>
                <ProfileTop user={user && user}
                    setBookingNavState={setBookingNavState}
                    setNavState={setNavState} />
                <ChangePasswordComponent />
            </div>
            )
            break;

        default:
            return null
    }

    return (
        <div className="bg-gray-100 h-full w-full"
            style={{ backgroundColor: Colors.gray }}>
            <Navbar />
            <hr />
            <div className="container mx-auto px-5 my-6 flex justify-between">
                <div className="w-1/4 ">
                    <Sidebar setNavState={setNavState} navState={navState}
                        setBookingNavState={setBookingNavState} />
                </div>
                <div className="w-2/4 mx-6">
                    {/* <MainContent user={user}/> */}
                    {/* {ComponentToRender} */}
                    <ProfileTop user={user && user}
                        setBookingNavState={setBookingNavState}
                        setNavState={setNavState} />
                    <Profile user={user && user} />
                </div>
                <div className="w-1/4">
                    {user && <RightSide user={user} setNavState={setNavState} navState={navState} />}
                </div>
            </div>
        </div>
    )
}

export default DashboardProfile
