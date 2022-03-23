import React from 'react'

const Form = (props) => {
    console.log(props.user, "props.user.type");
    return (
        <form className="pt-6 mb-4 font-bold">
            <div className="mb-4">
                <label className="block text-gray-900 text-sm mb-2" for="firstName">
                    First Name
                </label>
                <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="firstName" type="text" placeholder="Enter first name" value={props.userFirstName}
                    onChange={(e) => props.setUserFirstName(e.target.value)} />
            </div>
            <div className="mb-6">
                <label className="block text-gray-900 text-sm mb-2" for="lastName">
                    Last Name
                </label>
                <input className="text-sm border rounded border-gray-300 w-full py-3 px-3 text-gray-700  focus:outline-none" id="lastName" type="text" placeholder="Enter last name"
                    value={props.userLastName}
                    onChange={(e) => props.setUserLastName(e.target.value)} />
            </div>
            {props.user.User?.type === 'professional' ? <div>
                <div className="mb-6">
                    <label className="block text-gray-900 text-sm mb-2" for="jobTitle">
                        Job Title
                    </label>
                    <input className="text-sm border border-gray-300 rounded w-full py-3 px-3 text-gray-700  focus:outline-none" id="jobTitle" type="text" placeholder="Enter job title"
                        value={props.userJobTitle}
                        onChange={(e) => props.setUserJobTitle(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-900 text-sm mb-2" for="location">
                        Location
                    </label>
                    <input className="text-sm border border-gray-300 rounded w-full py-3 px-3 text-gray-700  focus:outline-none" id="location" type="text" placeholder="Enter location"
                        value={props.userLocation}
                        onChange={(e) => props.setUserLocation(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-900 text-sm mb-2" for="15minPrice">
                        15 minutes price
                    </label>
                    <input className="text-sm border border-gray-300 rounded w-full py-3 px-3 text-gray-700  focus:outline-none" id="location" type="text" placeholder="15 minutes price"
                        value={props.userSession15}
                        onChange={(e) => props.setSession15(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-900 text-sm mb-2" for="30minPrice">
                        30 minutes price
                    </label>
                    <input className="text-sm border border-gray-300 rounded w-full py-3 px-3 text-gray-700  focus:outline-none" id="location" type="text" placeholder="30 minutes price"
                        value={props.userSession30}
                        onChange={(e) => props.setSession30(e.target.value)}
                    />
                </div></div>:null}
            <div className="mb-6">
                <label className="block text-gray-900 text-sm mb-2" for="bio">
                    Tell us about your professional career. Talk about what you would want your customers to know. Remember to keep it short and a sweet!
                </label>
                <textarea className="resize-none border-gray-300 rounded-md text-sm border  w-full h-36 py-3 px-3 text-gray-700  focus:outline-none" id="bio" type="text" placeholder="Enter Bio"
                    value={props.userBio}
                    onChange={(e) => props.setBio(e.target.value)}
                ></textarea>
                <p className="text-sm text-green-500">280 characters remaining</p>
            </div>
        </form>
    );
}

export default Form