import { style } from '@mui/system'
import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Colors from '../../Colors/Colors'
import SideItem from './SideItem/SideItem'

class Sidebar extends Component {

    state = {
        SideItemsUser: [
            { name: 'Home', image: '/home.png', link: 'home' },
            { name: 'Profile', image: '/profile.png', link: 'profile' },
            { name: 'View Bookings', image: '/bookings.png', link: 'bookings' },
            { name: 'Payments', image: '/payments.png', link: 'payments' },
            { name: 'Notifications Settings', image: '/notification.png', link: 'notifications' },
            { name: 'Change Email', image: '/messege.png', link: 'changeemail' },
            { name: 'Change Password', image: '/lock.png', link: 'changepassword' },
        ],
        SideItemsProfessional: [
            { name: 'Home', image: '/home.png', link: 'home' },
            { name: 'Profile', image: '/profile.png', link: 'profile' },
            { name: 'Availabilty', image: '/availability.png', link: 'availability' },
            { name: 'View Bookings', image: '/bookings.png', link: 'bookings' },
            { name: 'Payments', image: '/payments.png', link: 'payments' },
            { name: 'Notifications Settings', image: '/notification.png', link: 'notifications' },
            { name: 'Change Email', image: '/messege.png', link: 'changeemail' },
            { name: 'Change Password', image: '/lock.png', link: 'changepassword' },
        ]
    }



    render() {
        let type = JSON.parse(localStorage.getItem('type'))
        console.log('>>>>>>>>>>>>>>>>>>>side bar user', typeof type)
        return (
            <div>
                <div className="flex flex-col p-3 bg-white rounded">
                    {type !== 'professional' ? this.state.SideItemsUser.map((m, i) => {
                        return <NavLink to={`${m.link}`} className={(nav) => {
                            return nav.isActive ? 'bg-blue-100 rounded m-2 py-2' : 'flex items-center m-2 py-2 rounded hover:bg-blue-100 cursor-pointer'
                        }}>
                            <SideItem
                                key={i}
                                name={m.name}
                                image={m.image}
                                setNavState={this.props.setNavState}
                                navState={this.props.navState}
                                index={i}
                                setBookingNavState={this.props.setBookingNavState}
                            />
                        </NavLink>
                    }
                    ) : this.state.SideItemsProfessional.map((m, i) => {
                        return <NavLink to={`${m.link}`} className={(nav) => {
                            console.log(nav)
                            return nav.isActive ? 'bg-blue-100 rounded m-2 py-2' : 'flex items-center m-2 py-2 rounded hover:bg-blue-100 cursor-pointer'
                        }}>
                            <SideItem
                                key={i}
                                name={m.name}
                                image={m.image}
                                setNavState={this.props.setNavState}
                                navState={this.props.navState}
                                index={i}
                                setBookingNavState={this.props.setBookingNavState}
                            />
                        </NavLink>
                    }
                    )}

                </div>
                <div className="flex flex-col mt-6">
                    <button className="bg-gray-800 hover:bg-black text-white py-3 mb-3 rounded flex justify-center"
                        style={{ backgroundColor: Colors.apple }}><a href='https://apps.apple.com/us/app/careerpaths/id1558302311' rel="noreferrer" target="_blank"><img src="/appstore.png" alt="apple"
                        /></a> </button>
                    <button className="bg-gray-800 hover:bg-black text-white py-3 rounded flex justify-center"
                        style={{ backgroundColor: Colors.apple }}><a href='https://play.google.com/store/apps/details?id=com.careerpaths.mobile' rel="noreferrer" target="_blank"><img src="/googleplay.png" alt="apple"
                        /></a></button>
                </div>
            </div>
        )
    }
}

export default Sidebar