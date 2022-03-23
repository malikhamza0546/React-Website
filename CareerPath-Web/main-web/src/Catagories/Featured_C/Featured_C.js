import React from "react";

const Featured = ({ image, label }) => {
    
    return (
        <div className="m-3 p-4 rounded text-white hover:shadow-lg" style={{
            backgroundImage: `url('purple.png')`, backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            <div className="p-4 mt-12 flex justify-center flex-col items-center">
                <p className="text-xl mt-8 ">{label}</p>
                <p className="test-sm">32 profeesional</p>
            </div>
        </div>
    );
}

export default Featured;