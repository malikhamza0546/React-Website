import moment from 'moment'
import React from 'react'

const Education = (props) => {

    return (
        <div>
            <div className="py-2">
                <div className="flex flex-row items-center">
                    <div className="w-16 h-16 rounded-full bg-white border flex justify-center items-center">
                        <img src={props.universityImage ? props.universityImage : '/tik.png'} alt="" className="w-12 h-12 rounded-full object-cover " />
                    </div>
                    <div className="flex flex-col ml-5 " >
                        <p className="text-lg  text-gray-500 font-bold">{props.education_type}</p>
                        <p className="text-sm text-black">{props.universityName}</p>
                        <p className="text-sm text-gray-400">{`${moment(props.startDate).format("MMM-YYYY")} - ${moment(props.endDate).format("MMM-YYYY")}`}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Education
