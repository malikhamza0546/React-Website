import React, { useEffect, useState } from 'react'
import Notification from './Notification/Notification'
import Switch from "react-switch";
import Colors from '../../../../Colors/Colors';
import axios from 'axios';

const Notifications = ({ user }) => {
    const [fromCareerPath, setFromCarrerPath] = useState(false)
    const [smsNotifications, setSmsNotifications] = useState(false)
    const [mobileNotifications, setMobileNotifications] = useState(false)
    const [newNotifications, setNewNotifications] = useState(false)
    let type = JSON.parse(localStorage.getItem('type'))
    const updateNewNotifications = () => {
        let data = {
            new_request_notification: newNotifications ? false : true
        }
        axios.put(`${process.env.REACT_APP_SERVER_PATH}/users/${+localStorage.getItem('id')}`, data).then((response) => {
            console.log("User from Notification status update succssfully")
            setNewNotifications(!newNotifications)
        }).catch(e => {
            console.log("error")
        })
    }
    const updateSmsNotifications = () => {
        let data = {
            sms_notification_alerts: smsNotifications ? false : true
        }
        axios.put(`${process.env.REACT_APP_SERVER_PATH}/users/${+localStorage.getItem('id')}`, data).then((response) => {
            console.log("User from Notification status update succssfully")
            setSmsNotifications(!smsNotifications)
        }).catch(e => {
            console.log("error")
        })
    }

    const updateCareerPathNotifications = () => {
        let data = {
            email_notification_alerts: fromCareerPath ? false : true
        }
        axios.put(`${process.env.REACT_APP_SERVER_PATH}/users/${+localStorage.getItem('id')}`, data).then((response) => {
            console.log("User from Notification status update succssfully")
            setFromCarrerPath(!fromCareerPath)
        }).catch(e => {
            console.log("error")
        })
    }
    const updateMobileNotifications = () => {
        let data = {
            mobile_notification_alerts: mobileNotifications ? false : true
        }
        axios.put(`${process.env.REACT_APP_SERVER_PATH}/users/${+localStorage.getItem('id')}`, data).then((response) => {
            console.log("User from Notification status update succssfully")
            setMobileNotifications(!mobileNotifications)
        }).catch(e => {
            console.log("error")
        })
    }
    const getUser = () => {
        axios.get(process.env.REACT_APP_SERVER_PATH + `/users/${+localStorage.getItem('id')}`)
            .then((response) => {
                console.log('>>>>>>>>>>>>>>>>>>>professional from Profile Bio')
                if (type === 'professional') {
                    axios.get(process.env.REACT_APP_SERVER_PATH + `/professionals/${+localStorage.getItem('id')}`).then(response => {
                        console.log(response.data, "Data is from notifiations")
                        console.log(user, 'userhahahahaahhcprofessional')
                        console.log(response.data.User?.new_request_notification, "response.data.User?.new_request_notification")
                        setNewNotifications(response.data.User?.new_request_notification === 1 ? true : false)
                        setSmsNotifications(response.data.User?.sms_notification_alerts === 1 ? true : false)
                        setFromCarrerPath(response.data.User?.email_notification_alerts === 1 ? true : false)
                        setMobileNotifications(response.data.User?.mobile_notification_alerts === 1 ? true : false)

                    }).catch(e => {
                        console.log('Error in Professional Api in Professional Api')
                    })
                } else if (type === 'customer') {
                    axios.get(process.env.REACT_APP_SERVER_PATH + `/users/${+localStorage.getItem('id')}`).then(response => {
                        console.log(response.data, "Data is from notifiations")
                        console.log(user, 'userhahahahaahhcustomer')
                        setNewNotifications(response.data.new_request_notification === 1 ? true : false)
                        setSmsNotifications(response.data.sms_notification_alerts === 1 ? true : false)
                        setFromCarrerPath(response.data.email_notification_alerts === 1 ? true : false)
                        setMobileNotifications(response.data.mobile_notification_alerts === 1 ? true : false)
                    }).catch(e => {
                        console.log('Error in Professional Api in Customer Api')
                    })
                }
            }).catch(e => {
                console.log("error occured");
            })
    }
    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="bg-white p-8 mt-6 rounded">
            <div className="mb-8 text-gray-700 font-bold">
                Notification Settings
            </div>
            <label className="flex justify-between items-center">
                <span className="text-gray-700">New Notifications Request</span>
                <Switch onChange={updateNewNotifications}
                    checked={newNotifications} uncheckedIcon={false}
                    checkedIcon={false}
                    height={24}
                    width={48}
                    onColor={Colors.blue}
                />
            </label>
            <hr className="my-4" />
            <label className="flex justify-between items-center">
                <span className="text-gray-700">From CareerPaths</span>
                <Switch onChange={updateCareerPathNotifications}
                    checked={fromCareerPath} uncheckedIcon={false}
                    checkedIcon={false}
                    height={24}
                    width={48}
                    onColor={Colors.blue} />
            </label>
            <hr className="my-4" />
            <label className="flex justify-between items-center">
                <span className="text-gray-700">Mobile Notifications</span>
                <Switch onChange={updateMobileNotifications}
                    checked={mobileNotifications} uncheckedIcon={false}
                    checkedIcon={false}
                    height={24}
                    width={48}
                    onColor={Colors.blue} />
            </label>
            <hr className="my-4" />
            <label className="flex justify-between items-center">
                <span className="text-gray-700">SMS Notifications</span>
                <Switch onChange={updateSmsNotifications}
                    checked={smsNotifications} uncheckedIcon={false}
                    checkedIcon={false}
                    height={24}
                    width={48}
                    onColor={Colors.blue} />
            </label>
            {/* {
                    arr.map((m) => {
                        return (
                            <div>
                                <Notification />
                                <hr className="my-4" />
                            </div>
                        )
                    })
                } */}
        </div>
    )
}

export default Notifications
