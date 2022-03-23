import axios from 'axios'
import React, { useState } from 'react'

const ChangePassword = (props) => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setconfirmNewPassword] = useState('')
    const handleSubmit = () => {
        let values = {
            old_password: oldPassword,
            new_password: newPassword
        }
        axios.patch(process.env.REACT_APP_SERVER_PATH + `/users/${+localStorage.getItem('id')}/password/reset`, values)
            .then((response) => {
                console.log(response.data);
                props.setNavState(1)
            }).catch(e => {
                console.log(oldPassword, newPassword, confirmNewPassword, "oldPassword,newPassword,confirmNewPassword")
                console.log("error in accessing password api", e.response.data.error);
            })
    }
    return (
        <div>
            <p className="font-bold mt-4">Change Password</p>
            <div className="pt-6 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-900 text-sm mb-2" for="oldPassword">
                        Enter your old password
                    </label>
                    <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="oldPassword" type="password" placeholder="xxxxxxxx" value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-900 text-sm mb-2" for="newPassword">
                        Enter your new password
                    </label>
                    <input className="text-sm border rounded border-gray-300 w-full py-3 px-3 text-gray-700  focus:outline-none" id="newPassword" type="password" placeholder="xxxxxxx"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-900 text-sm mb-2" for="confirmPassword">
                        Confirm new password
                    </label>
                    <input className="text-sm border rounded border-gray-300 w-full py-3 px-3 text-gray-700  focus:outline-none" id="confirmPassword" type="password" placeholder="xxxxxxx"
                        value={confirmNewPassword}
                        onChange={(e) => setconfirmNewPassword(e.target.value)} />
                </div>
                <button className="w-full bg-blue-400 text-sm py-3 text-white rounded" onClick={() => {
                    if (newPassword === confirmNewPassword) {
                        handleSubmit()
                    } else {
                        alert("Password Didnt match")
                    }
                }}>Submit</button>
            </div>
        </div>
    )
}

export default ChangePassword
