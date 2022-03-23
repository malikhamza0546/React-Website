import React from 'react'
import moment from 'moment'
const Experience = (props) => {
    console.log("curent job ", props.currentJob);

    const calcDate = (date1, date2) => {
        let diff = Math.floor(date1.getTime() - date2.getTime()) * -1;
        let day = 1000 * 60 * 60 * 24;

        let days = Math.floor(diff / day);
        let months = Math.floor(days / 31);
        let years = Math.floor(months / 12);
        let rem = months % 12;
        let message = years + " yrs "

        message += rem + " mos "

        return message
    }

    return (
        <div className="py-2">
            <div className="flex flex-row ">
                <img src={props.companyImage ? props.companyImage : '/avatar.png'} alt="" className="w-20 h-20 rounded-full object-cover" />
                <div className="flex flex-col ml-5" >
                    <p className="text-lg text-gray-500 font-bold">{props.position}</p>
                    <p className="text-sm text-black">{props.companyName} - {props.location}</p>
                    <div className='flex items-center justify-between w-full'>
                        <p className="text-sm text-gray-400"> {`${moment(props.startDate).format("MMM YYYY")} - `}</p>
                        {props.currentJob === "0" ? <p className="text-sm text-gray-400">&nbsp;Present</p> : <p className="text-sm text-gray-400">&nbsp;{`${moment(props.endDate).format("MMM YYYY")}`}</p>}
                        <p>&nbsp;&nbsp;•&nbsp;&nbsp;</p>
                        <p className="text-sm text-gray-400">  {
                            props.currentJob === "0"
                                ?
                                calcDate(new Date(props.startDate), new Date())
                                :
                                calcDate(new Date(props.startDate), new Date(props.endDate))
                        }
                        </p>
                    </div>

                </div>
            </div>
            <hr className="mt-4" />
        </div>
    )
}

export default Experience
