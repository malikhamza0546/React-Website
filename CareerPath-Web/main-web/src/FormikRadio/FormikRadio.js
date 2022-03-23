import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { pricetoDecimal } from '../price'
import Popup from '../popUp/popUp';
import SignIn from '../SignIn/SignIn'
import '../BookingPage/BookingMainContent/MainContent/Payments/Payment.css';
import Colors from '../Colors/Colors';

const FormikRadio = (props) => {
    const [modal, setModal] = useState(false)
    const [color, setColor] = useState(0)
    const [choice, setChoice] = useState('call_for_15_min')
    const [isPaying, setIspaying] = useState(pricetoDecimal(props.sessionPrice15))
    let id = JSON.parse(localStorage.getItem("id"))
    const toggle = () => {
        setModal(!modal)
    }
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    let navigate = useNavigate()
    useEffect(() => {
        setIspaying(pricetoDecimal(props.sessionPrice15))
    }, [])

    return (
        <div>
            {modal ? (
                <SignIn
                    toggle={toggle}
                    overlay="overlay"
                    modal="modal"
                    modalcontent="modal-content"
                    closeModal="close-modal"
                />
            ) : (
                <Formik
                    initialValues={{
                        picked: choice,
                    }}
                    onSubmit={async (values) => {
                        let data
                        if (choice === 'call_for_15_min') {
                            data = { minutes: 15, price: props.sessionPrice15, id: props.id }
                        } else if (choice === 'call_for_30_min') {
                            data = { minutes: 30, price: props.sessionPrice30, id: props.id }
                        }
                        if (localStorage.getItem('token')) {
                            navigate(`/request-a-call/${props.id}`, { state: data })
                        } else {
                            setModal(true)
                        }
                    }}
                >
                    {({ values }) => (
                        <Form>
                            <div role="group" aria-labelledby="my-radio-group" className="flex flex-col rounded mt-4">
                                <div className='flex justify-between bg-gray-50 my-2 p-4 border rounded-lg cursor-pointer'
                                    style={{ borderWidth: color === 0 ? '2px' : '', borderColor: color === 0 ? Colors.blue : '' }}
                                    onClick={() => {
                                        setColor(0)
                                        setChoice('call_for_15_min')
                                    }}>
                                    <p className='font-bold'>Call for 15 min</p>
                                    <p className='font-bold'>{pricetoDecimal(props.sessionPrice15)}</p>
                                </div>
                                <div className='flex justify-between p-4 bg-gray-50 border rounded-lg cursor-pointer'
                                    style={{ borderWidth: color === 1 ? '2px' : '', borderColor: color === 1 ? Colors.blue : '' }}
                                    onClick={() => {
                                        setColor(1)
                                        setChoice('call_for_30_min')
                                    }}>
                                    <p className='font-bold'>Call for 30 min</p>
                                    <p className='font-bold'>{pricetoDecimal(props.sessionPrice30)}</p>
                                </div>
                            </div>
                            <button className="text-center text-lg p-4 w-full bg-blue-400 mt-3 rounded-lg text-white hover:text-2xl  hover:bg-blue-500" type="submit"
                                style={{ backgroundColor: Colors.blue }}>{
                                    !id ? <div className='flex items-center justify-center font-bold'>
                                        <p className='mr-2'>Login and Book a Session</p>
                                        {choice === 'call_for_15_min' ? pricetoDecimal(props.sessionPrice15) : pricetoDecimal(props.sessionPrice30)}
                                    </div>
                                        : <div className='flex items-center justify-center font-bold'>
                                            <p className='mr-2'>Book a Session</p>
                                            {choice === 'call_for_15_min' ? pricetoDecimal(props.sessionPrice15) : pricetoDecimal(props.sessionPrice30)}
                                        </div>

                                }</button>
                        </Form>
                    )}
                </Formik>
            )}

        </div>
    );
}

export default FormikRadio
