import React from "react";
import "./User.css"
import moment from 'moment'
import { pricetoDecimal } from '../../../price'

const User = ({ name, designation, time, price, image }) => {
    const responseTime = () => {
        const duration = moment.duration(time, 'minutes');
        let responseTime = '';
        for (const [unit, value] of Object.entries(duration._data)) {
            if (value > 1) responseTime = `${value} ${unit}`;
            else if (value > 0) responseTime = `${value} ${unit.slice(0, -1)}`;
        }

        return responseTime

    }
    return (
        <div className="p-2 border w-56 h-72 rounded-md hover:shadow-2xl m-1 cursor-pointer">
            <div className="rounded ">
                <div className="w-full">
                    <img className="rounded-lg w-full h-48 object-cover border" src={image ? image : 'avatar.png'} alt={name} />
                </div>
                <div className="py-1 overflow-auto ">
                    <div className=" text-2 font-bold text-gray-700 mt-2 truncate">{name}</div>
                    <div className="text-xs text-gray-500 truncate"> {designation}</div>
                </div>
                <div className="py-1 flex flex-row justify-between text-xs text-gray-500">
                    {price && <div>From <p className="text-sm text-gray-600 inline-block"><strong>{pricetoDecimal(price)}</strong></p></div>}
                    {responseTime() && <div className="flex items-center">
                        <img src="Vector.png" alt="photos" className="w-2 h-3" />
                        <p className="text-sm text-gray-500 inline-block">&nbsp;<strong>{responseTime()}</strong></p>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default User;