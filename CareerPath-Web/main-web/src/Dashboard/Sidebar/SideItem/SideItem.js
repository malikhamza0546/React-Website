import React from 'react'

const SideItem = (props) => {
    return (
        <div className={`flex items-center rounded hover:bg-blue-100 cursor-pointer`}>
            <div className="object-cover w-4 h-4 ml-4" >
                <img src={props.image} alt={props.image} />
            </div>
            <div className="ml-4">{props.name}</div>
        </div>
    )
}

export default SideItem
