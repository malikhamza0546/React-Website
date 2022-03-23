import React from 'react'
import CheckBox from './CheckBox/CheckBox'

const CheckBoxFilters = (props) => {
    // console.log(props.filters);
    
    return (
        <div>
                {props.filters.map((f) => {
                    return <CheckBox label={f.label} boxArray={f.boxes}/>
                })}
        </div>
    )
}

export default CheckBoxFilters
