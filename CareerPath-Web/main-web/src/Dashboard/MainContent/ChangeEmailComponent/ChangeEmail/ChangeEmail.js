import axios from 'axios'
import React, { useState } from 'react'

const ChangeEmail = (props) => {
    const [newEmail, setNewEmail] = useState('')
    const handleSubmit = () => {
        let values = {
            new_email: newEmail
        }
        axios.patch(process.env.REACT_APP_SERVER_PATH + `/users/${+localStorage.getItem('id')}/email/reset`, values)
            .then((response) => {
                console.log(response.data);
                props.setNavState(1)
            }).catch(e => {
                console.log("error in accessing email api", e.response.data.error);
            })
    }
    return (
        <div>
            <div className="pt-6 mb-4" >
                <div className="mb-4">
                    <label className="block text-gray-900 text-sm mb-2" for="currentEmail">
                        Enter your current email
                    </label>
                    <input disabled className="text-sm border font-bold bg-gray-200 rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="currentEmail" type="email" placeholder="info@gmail.com"
                        value={JSON.parse(localStorage.getItem('email'))} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-900 text-sm mb-2" for="newEmail">
                        Enter your new email
                    </label>
                    <input className="text-sm border rounded border-gray-300 w-full py-3 px-3 text-gray-700  focus:outline-none" id="newEmail" type="email" placeholder="info@gmail.com"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)} />
                </div>
                <button className="w-full bg-blue-400 text-sm py-3 text-white rounded" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default ChangeEmail
