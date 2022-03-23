import React from 'react'
import { Link } from 'react-router-dom'
import Colors from '../Colors/Colors'

const AccountCreated = (props) => {
    localStorage.setItem("navState", 12)
    return (
        <div className="flex flex-col justify-center items-center text-gray-500 w-full">
            <img src="/accountCreated.png" alt="workexperience" className="w-48" />
            <p className="text-2xl mt-3 font-bold">Success!</p>
            <p className="text-center mt-3">Profile created</p>
            <div className="flex mt-6 w-full justify-between">
                    <button className="bg-gray-800 hover:bg-black text-white py-3 mb-3 rounded flex justify-center w-1/2"
                    style={{backgroundColor:Colors.apple}}><a href='https://apps.apple.com/us/app/careerpaths/id1558302311' rel="noreferrer" target="_blank"><img src="appstore.png" alt="apple" 
                    /></a></button>
                   <button className="ml-2 bg-gray-800 hover:bg-gray-500 text-white py-3 mb-3 rounded flex justify-center w-1/2"
                    style={{backgroundColor:Colors.apple}}><a href='https://play.google.com/store/apps/details?id=com.careerpaths.mobile' rel="noreferrer" target="_blank"><img src="googleplay.png" alt="apple" 
                    /></a> </button>
                </div>
                {/* <p className='text-sm font-bold cursor-pointer' style={{color:Colors.blue}}>
                    <Link to='/'>Go to home page</Link></p> */}
        </div>
    )
}

export default AccountCreated
