import React from "react";

const roundedComponent = ({ image }) => {
    return (
        <div className="w-48 h-48 flex items-center justify-center rounded-full mx-4 border">
            <div className="">
                <img className="rounded-full object-cover w-48 h-48" src={image} alt="images" />
            </div>
        </div>
    );
}

export default roundedComponent;