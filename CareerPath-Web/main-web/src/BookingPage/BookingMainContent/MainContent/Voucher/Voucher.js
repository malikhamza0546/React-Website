import React, { useState } from 'react';
import axios from 'axios';
import Colors from '../../../../Colors/Colors'
const Voucher = (props) => {
    const [error, setError] = useState('')
    const [color, setColor] = useState(false);
    const [inputvalue, setInputvalue] = useState('');
    const [responses, setResponses] = useState(
        [{
            discountAmount: 0,
            discount_type: null,
            status: false,
        }]);

    const ButtonHandler = (event) => {
        props.coupenName(inputvalue);
        // if ((inputvalue !== "off30") && (inputvalue !== "off40")) {
        //     setResponses([{ status: false }]);
        //     setError("This Voucher does not exist")
        //     return
        // }
        console.log(inputvalue, 'inputVALUE')
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/coupon/verify/${inputvalue}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            if (response?.data?.error?.msg === "Coupon is not valid") {
                setError("This Voucher does not exist")
            } else {
                setResponses([{
                    discountAmount: response.data.message.discount_amount,
                    discount_type: response.data.message.discount_type,
                    status: response.data.message.status,
                }]);
                props.toggle();
            }

        }).catch(error => {
            if (error?.response?.data?.error === "Coupon is not valid anymore") {
                setError("Coupon is not valid anymore")
            } else {
                console.log('Catch of else')
            }
        })

    }
    if (responses[0].discount_type === "percentage") {
        let z = props.propslocationprice;
        let x = props.propslocationprice / 100;
        let y = x * responses[0].discountAmount;
        let c = props.propslocationprice - y;
        c = parseFloat(c).toFixed(2);
        props.AfterCalHandler(c, y, z, responses[0].discount_type, responses[0].discountAmount);
    }

    else if (responses[0].discount_type === 'fixed') {

        let z = props.propslocationprice;

        let x = responses[0].discountAmount;
        if (x < props.propslocationprice) {

            let c = props.propslocationprice - x;
            c = parseFloat(c).toFixed(2);

            props.AfterCalHandler(c, x, z, responses[0].discount_type, "");
        }
        if (x >= props.propslocationprice) {

            let c = props.propslocationprice - x;
            c = parseFloat(x).toFixed(2);
            props.AfterCalHandler(z, 0, z, responses[0].discount_type, "");
        }

    }
    return (
        <div className={props.modal}>
            <div className={props.overlay} onClick={props.toggle}></div>
            <div className="w-screen h-screen  flex items-center justify-center">
                <div className="w-1/3 bg-white border p-4 z-30 rounded ">
                    <div className="flex w-full justify-end">
                        <button className="border hover:bg-gray-200 p-1 justify-center items-center flex rounded-full w-6 h-6 text-gray-600" onClick={props.toggle}>x</button>
                    </div>
                    <div style={{ marginTop: "11%" }}>
                        <p className="text-2xl font-bold mt-4">Discount Voucher</p>
                        <p className="text-lg font-bold mt-3">Enter your voucher code</p>
                        <input style={{ borderColor: color ? "red" : null }} placeholder="Write here" value={inputvalue} onChange={evt => {
                            if (evt.target.value === '') {
                                setError("")
                            }
                            setInputvalue(evt.target.value)
                        }} className="outline-none border p-2 pl-4 w-full rounded mt-2" />
                        <div className="mt-4">
                            {responses[0].status && <label style={{ color: "grey" }} className="text-grey" for="vehicle1"> This Voucher Added successfully</label>}
                        </div>
                        {!responses[0].status && <p className="my-3 text-red-600"> {error} </p>}
                        <button style={{ backgroundColor: inputvalue !== '' ? Colors.blue : 'gray' }} disabled={inputvalue !== '' ? false : true} className="font-bold text-xl py-2 w-full rounded mt-4 text-white" onClick={ButtonHandler}>Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Voucher
