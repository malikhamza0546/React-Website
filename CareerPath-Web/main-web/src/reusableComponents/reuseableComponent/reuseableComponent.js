import moment from "moment";
import React from "react";
import { pricetoDecimal } from '../../price'
const reuseableComponent = ({ name, designation, time, price, image }) => {
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
        <div className="p-3 border box-border rounded-lg hover:shadow-lg m-3 h-80">
            <div className="rounded overflow-hidden">
                <div className="w-full">
                    <img className="rounded-lg w-full h-56 object-cover border" src={image ? image : 'avatar.png'} alt={name} />
                </div>
                <div className="pt-1">
                    <div className="text-gray-800 font-bold text-md truncate">{name}</div>
                    <div className="text-xs text-gray-500 truncate"> {designation}</div>
                </div>
                <div className="py-1 flex flex-row justify-between items-center text-sm text-gray-500">
                    {price && <div>From <strong> {pricetoDecimal(price)}</strong></div>}
                    {responseTime() ? <div className="flex items-center justify-center">
                        <img src="Vector.png" alt="photos" className="w-2 h-3" />
                        &nbsp;<p className="text-sm text-gray-500 inline-block"><strong>{responseTime()}</strong></p>
                    </div> : null}
                </div>
            </div>
        </div>
    );
}

export default reuseableComponent;

