import React from 'react'

const CongratulationPassword = () => {
    return (
        <div className="bg-white p-4 pb-10 mt-6 rounded">
            <div className="flex flex-col justify-center m-8 items-center">
                <img src="/tik.png" alt="tik" className="w-24 h-24" />
                <p className="font-bold px-4">Congratulations your new password </p>
                <p className="font-bold px-4">has been updated</p>
            </div>
        </div>
    )
}

export default CongratulationPassword
