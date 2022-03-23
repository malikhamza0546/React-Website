import React from 'react'

const CheckBox = (props) => {
    return (
        <div>
            <div className="block text-gray-800 my-4 ">
                <span className="text-gray-500">{props.label}</span>
                {props.boxArray.map((m) => {
                    return <div>
                        <label className="inline-flex items-center text-2">
                            <input type="checkbox" className="form-checkbox rounded" />
                            <span className="ml-3">{m}</span>
                        </label>
                    </div>
                })}
            </div>
            <hr />
        </div>
    )
}

export default CheckBox
