import React, { useState } from "react";
import Colors from "../Colors/Colors";
import Links from "./links/links";
const Footer = () => {
    const [links] = useState(["Professional Sign Up", "Referral Rewards", "About Us", "Privacy Policy", "FAQ's", "Contact Us"])
    return (
        <div >
            <div className="bg-gray-100 my-6 px-4 py-6" style={{
                backgroundImage: 'url(footer.png)', backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }} >
                <div className="container mx-auto px-16 py-2 flex flex-row justify-between items-center">
                    <div className="w-1/2">
                        <p className="text-3xl font-bold text-gray-800">NewsLetter</p>
                        <p className="text-xs text-gray-400 my-4">Sign up with your email address to recieve news and updates</p>
                        <div className="flex p-2 rounded-lg border border-gray-200 justify-between w-3/5">
                            <input className="px-1 bg-gray-100 focus:outline-none text-sm" placeholder="Enter your email address" />
                            <button className="bg-blue-400 hover:bg-blue-600 rounded-lg py-2 px-5 text-white "
                                style={{ backgroundColor: Colors.blue }}>Subscribe</button>
                        </div>
                        <div className="flex my-4 justify-between w-2/3">
                            <button className="text-xs text-gray-500 hover:text-gray-700">{links[1]}</button>
                            <button className="text-xs text-gray-500 hover:text-gray-700">{links[2]}</button>
                            <a href="https://careerpaths.zendesk.com/hc/en-us" target='_blank'><button className="text-xs text-gray-500 hover:text-gray-700">{links[4]}</button></a>
                            <button className="text-xs text-gray-500 hover:text-gray-700">{links[3]}</button>
                        </div>
                    </div>
                    <div className="flex flex-col items-start xs:w-auto w-1/3">
                        <div className="flex flex-row items-center justify-between w-36">
                            <img src="/fb.png" alt="fb" className="opacity-90 hover:opacity-100" />
                            <a href="https://www.linkedin.com/company/careerpathsio/" target='_blank'><img src="/twiter.png" alt="fb" className="mx-3 opacity-90 hover:opacity-100" /></a>
                            <a href="https://www.instagram.com/careerpathsapp/" target='_blank'><img src="/igicon.png" alt="fb" className="opacity-90 hover:opacity-100" /></a>
                        </div>
                        <p className="text-xs text-gray-400 my-4">Ready to become a professional on CareerPaths?</p>
                        <button className="text-sm text-gray-700 border rounded-lg border-gray-400 p-3" >Enroll as a Professional</button>
                    </div>
                </div>
            </div>
            <p className="text-sm text-gray-400 text-center mb-3">Copyright &copy; 2021 CareerPaths. All Rights Reserved. | Privacy Policy</p>
        </div>
    );

}

export default Footer;