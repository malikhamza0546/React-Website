import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import TextField from './TextField'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'
import { signup } from '../api/Auth'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import axios from 'axios'
import Colors from '../Colors/Colors'

const SignUp = (props) => {
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const validate = Yup.object({
        first_name: Yup.string().max(20, "Must be 20 characters or less").required('Required'),
        last_name: Yup.string().max(20, "Must be 20 characters or less").required('Required'),
        email: Yup.string().email('Email is invalid').required('Email is Required'),
        password: Yup.string().min(6, "Must be at least 6 characters").required('Password Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Confirm Password is Required'),
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
            onSubmit={(values) => {
                axios.post(process.env.REACT_APP_SERVER_PATH + `/signup`, values)
                    .then((response) => {
                        navigate('/dashboard/profile')
                        console.log(response);
                    }).catch(e => {
                        console.log("error is happend", e.response.data.error);
                        setError(true)
                    })


            }}
        >
            {formik => (

                <div className={props.modal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <div className={props.overlay} onClick={props.toggle}></div>
                    <div class="flex flex-col w-1/3 z-20 ">
                        <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-2">
                            <div className="bg-white px-6 py-8 rounded shadow-md text-gray-600 w-full">
                                <h1 className="mb-4 text-3xl text-center">Sign Up</h1>
                                {error === true ? <p className="text-red-600 text-center">Email already Exists </p> : null}
                                <Form>
                                    <TextField name="first_name" type="text" placeholder="Enter First Name" />
                                    <TextField name="last_name" type="text" placeholder="Enter Last Name" />
                                    <TextField name="email" type="email" placeholder="Enter email address" />
                                    <TextField name="password" type="password" placeholder="Enter password" />
                                    <TextField name="confirmPassword" type="password" placeholder="Re-enter password" />
                                    <div className="w-full flex mb-4 text-xs text-gray-500">
                                        <label className="inline-flex items-center text-2">
                                            <input type="checkbox" className="form-checkbox rounded" />
                                            <span className="ml-2">Yes In agree with the CareerPaths</span>
                                        </label>
                                        <button className="text-blue-500 ml-1">Term and Conditions...</button>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-center py-3 rounded bg-blue-400 text-white hover:bg-blue-600 focus:outline-none my-1"
                                        style={{ backgroundColor: Colors.blue }}>Sign Up</button>
                                </Form>

                                <hr className="my-2" />

                                <button className="w-full py-3 rounded bg-blue-600 flex items-center justify-center hover:bg-blue-700 focus:outline-none my-1"
                                    style={{ backgroundColor: Colors.linkedIn }}>
                                    <img src="/linkedin.png" alt="linkedin" />
                                </button>
                                <div className="flex justify-between">
                                    <button className="w-full py-3 rounded bg-red-500 flex items-center justify-center hover:bg-red-700 focus:outline-none my-1"
                                        style={{ backgroundColor: Colors.google }}>
                                        <img src="/google.png" alt="linkedin" />
                                    </button>

                                    <button className="w-full py-3 rounded ml-4 bg-black flex items-center justify-center hover:bg-gray-700 focus:outline-none my-1"
                                        style={{ backgroundColor: Colors.apple }}>
                                        <img src="/apple.png" alt="linkedin" />
                                    </button>
                                </div>
                                <div className="flex text-sm text-gray-500">
                                    <p>Already a member?</p>
                                    <button className="ml-1 text-blue-500 underline">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    )
}

export default SignUp
