import React, { useState } from 'react'
import Voucher from '../Voucher/Voucher';
import './Payment.css'

const Payments = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal)
    }
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    return (
        <div className="text-gray-600">
            {modal && (
                <Voucher
                    toggle={toggle}
                    overlay="overlay"
                    modal="modal"
                    modalcontent="modal-content"
                    closeModal="close-modal"
                    modalValue={modal} />
            )}
            <p className="text-2xl">Add Payment Information</p>
            <div className="border px-4 py-2 rounded mt-2 flex justify-between items-center">
                <label className="inline-flex items-center text-2">
                    <input type="checkbox" className="form-checkbox rounded" />
                    <span className="ml-3">Apple Pay</span>
                </label>
                <img src="applepay.png" alt="applePay" className="w-12" />
            </div>
            <div className="border px-4 py-2 rounded mt-2 flex justify-between items-center">
                <label className="inline-flex items-center text-2">
                    <input type="checkbox" className="form-checkbox rounded" />
                    <span className="ml-3">Google Pay</span>
                </label>
                <img src="googlepay.png" alt="googlePay" className="w-12" />
            </div>
            <div className="border px-4 py-2 rounded mt-2 flex justify-between items-center">
                <label className="inline-flex items-center text-2">
                    <input type="checkbox" className="form-checkbox bg-blue-400 rounded" />
                    <span className="ml-3">Credit Card</span>
                </label>
                <img src="cards.png" alt="googlePay" className="w-18" />
            </div>
            <p className="text-xs text-blue-300 mt-4 font-bold">Do you have coupen?</p>
            <p className="text-xs mt-2">Coupen <span><button className="font-bold">Name Here</button></span></p>

            <div className="flex justify-between items-center text-xs mt-4">
                <p>15 min Video Call with Elon Musk</p>
                <p>USD 200</p>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between items-center text-xs mt-4">
                <p>Subtotal</p>
                <p>USD 200</p>
            </div>

            <div className="flex justify-between items-center text-xs mt-4 text-green-500">
                <p>Voucher Amount</p>
                <p>-USD 200</p>
            </div>

            <div className="flex justify-between items-center text-xs font-bold mt-4">
                <p className="text-xs font-bold">Total Amount</p>
                <p>USD 200</p>
            </div>
            {/* <button className="w-full bg-blue-500 text-white mt-4 rounded py-2 flex justify-center items-center" onClick={() => {
                toggle()
               this.props.nextStep()
            }}>Submit Request</button> */}
        </div>
    )
}

export default Payments
