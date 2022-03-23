import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import TextField from './TextField'
import * as Yup from 'yup'
import { signin } from '../api/Auth'
import Colors from '../Colors/Colors';
import SignUp from '../SignUp/SignUp'
import axios from 'axios'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
// You can use provided image shipped by this package or using your own
import { GoogleLogin } from "react-google-login";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import AppleLogin from 'react-apple-login';
import Loader from 'react-loader-spinner'
const clientId = '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';
const SignIn = (props) => {
    const [signup, setSignup] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false);
    const [error, setError] = useState(false)
    const location = useLocation()
    let windowObjectReference = null;
    let previousUrl = null;

    if (signup) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const toggleSignUp = () => {
        props.toggle()

    }

    const axiosApiCall = (url, method, body = {}) =>
        axios({
            method,
            url: `https://dev.careerpaths.io/api${url}`,
            data: body,
        });
    const onSuccess = (response) => {
        const access_token = response.accessToken;
        axiosApiCall("/auth/google", "get", { access_token }).then((res) => {
            const { user, token } = res.data;
            console.log('====================================');
            console.log(token, user);
            console.log('====================================');

        });



    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login. 😢 `
        );
    };
    const { linkedInLogin } = useLinkedIn({
        clientId: '86vhj2q7ukf83q',
        redirectUri: `${window.location.origin}/dashboardprofile`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
        onSuccess: (code) => {
            console.log(code);
        },
        onError: (error) => {
            console.log(error);
        },
    });
    const handleLogin = async googleData => {

        const res = await fetch(`${process.env.REACT_APP_SERVER_PATH}/auth/google_web`, {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();
        console.log('==================data==================');
        console.log(data);
        console.log('====================================');
        let token = data.token;
        let id = data.id;
        let email = data.email;
        localStorage.setItem("email", email)
        localStorage.setItem("token", token)
        localStorage.setItem("id", id)
        console.log(token);
        console.log(id)
        props.toggle()
        navigate('/');


    }
    let local = localStorage.getItem('token')
    useEffect(() => {

    }, [local])
    let navigate = useNavigate()
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={(values) => {
                setLoading(true)
                axios.post(process.env.REACT_APP_SERVER_PATH + `/login`, values).then((result) => {
                    if (result.status === 200) {
                        let token = result.data.message.token
                        let id = JSON.stringify(result.data.message.id)
                        let email = JSON.stringify(result.data.message.email)
                        let type = JSON.stringify(result.data.message.type)
                        localStorage.setItem("email", email)
                        localStorage.setItem("token", token)
                        localStorage.setItem("type", type)
                        localStorage.setItem("id", id)
                        props.toggle()
                        navigate(location.pathname === '/' ? '/dashboard/home' : location.pathname)
                        setLoading(false)
                    }
                }).catch(e => {
                    setError(true)
                    setLoading(false)
                })
            }}
        >
            {formik => (
                <div className={props.modal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {signup && (
                        <SignUp
                            toggle={toggleSignUp}
                            overlay="overlay"
                            modal="modal"
                            modalcontent="modal-content"
                            closeModal="close-modal"
                            modalValue={signup} />
                    )}
                    <div className={props.overlay} onClick={props.toggle}></div>
                    <div className="flex flex-col w-1/3 z-20">
                        <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-2">
                            <div className="bg-white px-6 py-8 rounded shadow-md text-gray-600 w-full">
                                <h1 className="mb-4 text-3xl text-center">Sign In</h1>
                                <p className="text-center text-gray-400 mb-4 text-sm">Please enter email address and password to Sign in.</p>
                                <Form>
                                    <TextField name="email" type="email" placeholder="Enter email address" />
                                    <TextField name="password" type={passwordShown ? "text" : "password"} placeholder="Password"
                                        passwordShown={passwordShown}
                                        setPasswordShown={setPasswordShown} />
                                    {error ? <p className='text-red-500 text-sm my-3'>Invalid credentials</p> : null}
                                    <div className="w-full flex justify-between mb-4 text-xs text-gray-500">
                                        <label className="inline-flex items-center text-2">
                                            <input type="checkbox" className="form-checkbox rounded" />
                                            <span className="ml-2">Remember me</span>
                                        </label>
                                        <button className="text-blue-500">Forgot Password?</button>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full text-center flex items-center justify-center py-3 rounded bg-blue-400 text-white hover:bg-blue-600 focus:outline-none my-1"
                                        style={{ backgroundColor: Colors.blue }}>Sign In {isLoading ? <span className='inline-block ml-4'><Loader
                                            type="TailSpin"
                                            color="white"
                                            height={20}
                                            width={20}
                                        // timeout={5000} //5 secs
                                        /></span> : null}</button>
                                </Form>
                                <hr className="my-2" />
                                <button className="w-full py-3 rounded bg-blue-600 flex items-center justify-center hover:bg-blue-700 focus:outline-none my-1">
                                    <img onClick={linkedInLogin}
                                        src="/linkedin.png"
                                        alt="Sign in with Linked In"
                                        style={{ maxWidth: '180px', cursor: 'pointer' }}
                                    />

                                </button>
                                <div className="flex justify-between w-full mt-4">
                                    <button className="w-1/2 rounded  flex items-center justify-center focus:outline-none my-1">
                                        <GoogleLogin
                                            clientId="309293509660-bf8rtviee9e57n1aq5ige58bb1hjj86a.apps.googleusercontent.com"
                                            buttonText="Sign up with Google"
                                            onSuccess={onSuccess}
                                            onFailure={() => { }}
                                        />
                                    </button>
                                    <button className="ml-4 w-1/2 rounded bg-black flex items-center justify-center focus:outline-none my-1">
                                        <img src="/apple.png" alt="linkedin" />
                                    </button>
                                </div>
                                <div className="flex text-sm text-gray-500">
                                    <p>Not a member?</p>
                                    <button className="ml-1 text-blue-500 underline" onClick={() => {
                                        setSignup(true)
                                    }}>Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </Formik>
    )
}

export default SignIn
