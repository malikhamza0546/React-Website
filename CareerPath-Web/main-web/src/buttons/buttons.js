import React, { useState } from 'react';
import Colors from '../Colors/Colors';

const Buttons = (props) => {
    const [color, setColor] = useState(false);
    const colorHandler = () => {
        setColor(!color);
    }
    return (
        <button className={`bg-gray-100 hover:text-black p-2 rounded m-2 l`} style={{ backgroundColor: color ? Colors.blue : Colors.grey, borderWidth: "1px", color: color ? 'white' : 'gray' }} onMouseEnter={colorHandler} onMouseLeave={colorHandler}>
            {props.name}
            <span className="bg-white border border-gray-200 text-xs text-black rounded-full p-1 mx-2">{props.amount}</span>
        </button>
    );

}

export default Buttons