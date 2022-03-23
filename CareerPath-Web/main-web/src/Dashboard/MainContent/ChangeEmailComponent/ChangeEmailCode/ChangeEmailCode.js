import React from 'react'

const ChangeEmailCode = (props) => {
    const handleSubmit=(e)=>{
        e.preventDefault()
        props.setNavState(2)
    }
    return (
        <div>
            <form className="pt-6 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-900 text-sm mb-2" for="code">
                            Enter Code
                        </label>
                        <input className="text-sm border rounded w-full border-gray-300 py-3 px-3 text-gray-700  focus:outline-none" id="code" type="text" placeholder="XXXX" />
                    </div>
                    <button className="w-full bg-blue-400 text-sm py-3 text-white rounded">Submit</button>
                    </form>
        </div>
    )
}

export default ChangeEmailCode
