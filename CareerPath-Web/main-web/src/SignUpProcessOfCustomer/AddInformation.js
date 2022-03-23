import React, { useState } from 'react'
import Colors from '../Colors/Colors'
import axios from 'axios'
import { Formik, Form } from 'formik'
import TextField from './TextField'
import * as Yup from 'yup'
import jwt_decode from "jwt-decode";
import Loader from "react-loader-spinner";

const AddInformation = (props) => {
    localStorage.setItem("navState", 1)
    const [error, setError] = useState(false)
    const [checked, setChecked] = useState(false)   //Show Error for Using Existing Email
    const [isLoading, setLoading] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false);
    // const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const validate = Yup.object({
        first_name: Yup.string().max(20, <p className='text-red-500 -mt-4'>Must be 20 characters or less</p>).required(<p className='text-red-500 -mt-4'>Required</p>),

        last_name: Yup.string().max(20, <p className='text-red-500 -mt-4'>Must be 20 characters or less</p>).required(<p className='text-red-500 -mt-4'>Required</p>),

        email: Yup.string().email(<p className='text-red-500 -mt-4'>Please enter valid email</p>).required(<p className='text-red-500 -mt-4'>Emial is required</p>),

        password: Yup.string().min(6, <p className='text-red-500 -mt-4'>Must be at least 6 characters</p>).required(<p className='text-red-500 -mt-4'>Password is required</p>),

        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], <p className='text-red-500 -mt-4'>Password and confirm password must be same</p>).required(<p className='text-red-500 -mt-4'>Confirm password is required</p>),
    })
    return (
        <Formik
            initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
                type: '',
                status: ''
            }}
            validationSchema={validate}
            //New Sign Up
            onSubmit={(values) => {
                if (checked) {
                    setLoading(true)
                    values.type = 'customer'
                    axios.post(process.env.REACT_APP_SERVER_PATH + `/signup`, values)
                        .then((response) => {
                            props.setNavState(props.navState + 1)
                            console.log(response);
                            localStorage.setItem("customer_signup_token", response.data.message.token)
                            console.log(jwt_decode(response.data.message.token).id);
                        }).catch(e => {
                            setError(true)
                            console.log("error occured");

                        })
                }
            }}
        >

            {/* Using Formik for Form Submittion and Validation */}
            {formik => (
                <div className="flex flex-col justify-center items-center">
                    <img src="addName.png" alt="addName" className="w-48" />
                    <p className="text-2xl font-bold mt-3 text-gray-800">Lets start with the basics</p>
                    <p className="text-xs mt-3">Please enter your contact details and set up your password</p>
                    <div className="w-full mt-4">
                        <Form>
                            <div className='flex'>
                                <TextField name="first_name" type="text" placeholder="First Name" />
                                <div className='ml-2'>
                                    <TextField name="last_name" type="text" placeholder="Last Name" />
                                </div>
                            </div>

                            <TextField name="email" type="email" placeholder="Email" />
                            {error === true ? <p className="text-red-500 -mt-4">Email already exists </p> : null}
                            <TextField name="password" type={passwordShown ? "text" : "password"} placeholder="Password"
                                passwordShown={passwordShown}
                                setPasswordShown={setPasswordShown} />

                            <TextField name="confirmPassword" type={passwordShown ? "text" : "password"} placeholder="Confirm password"
                                passwordShown={passwordShown}
                                setPasswordShown={setPasswordShown} />
                            <div className="w-full flex mb-4 mt-2 text-xs text-gray-500">
                                <label className="inline-flex items-center text-2">
                                    <input type="checkbox" className="form-checkbox rounded" checked={checked} onChange={() => { setChecked(!checked) }} />
                                    <span className="ml-2">Yes, I agree with CareerPaths</span>
                                </label>
                                <a className="text-blue-500 ml-1" target="_blank" rel="noreferrer" href='https://careerpaths.io/terms-and-conditions'>Term &amp; Conditions</a>
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center text-center py-3 rounded bg-blue-400 text-white hover:bg-blue-600 focus:outline-none my-1"
                                style={{ backgroundColor: checked && formik.values.VIP_CODE !== '' && formik.values.first_name !== '' && formik.values.last_name !== '' && formik.values.email !== '' && formik.values.password !== '' && formik.values.confirmPassword !== '' ? Colors.blue : Colors.gray, color: checked && formik.values.first_name !== '' && formik.values.last_name !== '' && formik.values.email !== '' && formik.values.password !== '' && formik.values.confirmPassword !== '' ? 'white' : 'gray' }}>Next {isLoading ? <span className='inline-block ml-4'><Loader
                                    type="TailSpin"
                                    color="white"
                                    height={30}
                                    width={30}
                                // timeout={5000} //5 secs
                                /></span> : null} </button>
                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    )
}

export default AddInformation
