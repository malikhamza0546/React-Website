import React, { useEffect, useState } from 'react'
import Colors from '../../../../Colors/Colors'
import Form from '../Form/Form'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
const ProfileBio = ({ user }) => {
    let navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userJobTitle, setUserJobTitle] = useState('')
    const [userLocation, setUserLocation] = useState('')
    const [userSession15, setSession15] = useState('')
    const [userSession30, setSession30] = useState('')
    const [userBio, setBio] = useState('')
    const [imgUrl, setImageUrl] = useState('')
    const [showPicError, setShowPicError] = useState(false)
    const [fileInput, setFileInput] = useState()
    const [industry, setIndustry] = useState([])
    const [selectedIndustry, setSelectedIndustry] = useState([])
    const [type, setType] = useState(null)

    const saveData = () => {
        setLoading(true)
        let dataProfessional = {
            job_title: userJobTitle,
            location: userLocation,
            session_price_15_min: userSession15,
            session_price_30_min: userSession30,
        }
        let dataUser = {
            first_name: userFirstName,
            last_name: userLastName,
            bio: userBio
        }
        // user.user_id instead of +localStorage.getItem('id') main point
        if (type === 'professional') {
            axios.put(`${process.env.REACT_APP_SERVER_PATH}/professionals/${+localStorage.getItem('id')}`, dataProfessional).then((response) => {
                console.log("data updated succesfully")
                axios.put(`${process.env.REACT_APP_SERVER_PATH}/users/${+localStorage.getItem('id')}`, dataUser).then((response) => {
                    console.log("user data updated succesfully")
                    setLoading(false)
                    toast("Data Updated Successfully!");
                    window.location.reload(false);

                }).catch(e => {
                    console.log("error")
                })
            }).catch(e => {
                console.log("error")
            })
        } else if (type === 'customer') {
            axios.put(`${process.env.REACT_APP_SERVER_PATH}/users/${+localStorage.getItem('id')}`, dataUser).then((response) => {
                console.log("user data updated succesfully")
                setLoading(false)
                toast("Data Updated Successfully!");
                window.location.reload(false);
            }).catch(e => {
                console.log("error")
            })
        }
    }
    const getIndustrySelected = (dataArray) => {
        dataArray.forEach(m => {
            if (selectedIndustry.includes(m.id)) {
                // Remove ID
                const selectedIndustryCopy = [...selectedIndustry]
                const itemIndex = selectedIndustryCopy.indexOf(m.id)
                selectedIndustryCopy.splice(itemIndex, 1)
                setSelectedIndustry(selectedIndustryCopy)
            } else {
                // ADD ID
                setSelectedIndustry(selectedIndustry => [...selectedIndustry, m.id])
                console.log('id added', m.id)
            }
        })
    }
    const getUser = () => {
        axios.get(process.env.REACT_APP_SERVER_PATH + `/users/${+localStorage.getItem('id')}`)
            .then((response) => {
                console.log('>>>>>>>>>>>>>>>>>>>professional from Profile Bio')
                if (response.data.type === 'professional') {
                    setType('professional')
                    axios.get(process.env.REACT_APP_SERVER_PATH + `/professionals/${+localStorage.getItem('id')}`).then(response => {
                        console.log(response.data, 'customer data from profile Page aKA')
                        getIndustrySelected(response.data.Industries)
                        setUserFirstName(response.data.User?.first_name)
                        setUserLastName(response.data.User?.last_name)
                        setUserJobTitle(response.data.job_title)
                        setUserLocation(response.data.location)
                        setSession15(response.data.session_price_15_min)
                        setSession30(response.data.session_price_30_min)
                        setBio(response.data.User?.bio)
                        if (response.data.User.profile_photo !== null) {
                            setImageUrl(response.data.User.profile_photo)
                        } else {
                            setImageUrl('/avatar.png')
                        }
                    }).catch(e => {
                        console.log('Error in Professional Api in Professional Api')
                    })
                } else if (response.data.type === 'customer') {
                    setType('customer')
                    console.log(+localStorage.getItem('id'), "user.user_id")
                    setUserFirstName(response.data.first_name)
                    setUserLastName(response.data.last_name)
                    setBio(response.data.bio)
                    if (response.data.profile_photo !== null) {
                        setImageUrl(response.data.profile_photo)
                    } else {
                        setImageUrl('/avatar.png')
                    }
                    console.log(response.data, "data of cutomer in profile bio")
                    // axios.get(process.env.REACT_APP_SERVER_PATH + `/users/${+localStorage.getItem('id')}`).then(response => {
                    //     console.log(response.data, 'customer data from profile Page aKA')
                    //     getIndustrySelected(response.data.Industries)
                    //     setUserFirstName(response.data.User?.first_name)
                    //     setUserLastName(response.data.User?.last_name)
                    //     setBio(response.data.User?.bio)
                    //     if (response.data.User.profile_photo !== null) {
                    //         setImageUrl(response.data.User.profile_photo)
                    //     } else {
                    //         setImageUrl('/avatar.png')
                    //     }
                    // }).catch(e => {
                    //     console.log('Error in customer Api in Professional Api')
                    // })
                }
            }).catch(e => {
                console.log("error occured");
            })
    }
    const getAllIndustries = () => {
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/industry`).then((response) => {
            console.log(response.data);
            setIndustry(response.data)
        }).catch(e => {
            console.log("error in industry api");
        })
    }
    useEffect(() => {
        getUser()
        getAllIndustries()
    }, [])
    const addIndustry = (id) => {
        let data = {
            user_id: +localStorage.getItem('id'),
            industry_id: id
        }
        axios.post(`${process.env.REACT_APP_SERVER_PATH}/professionals_industries`, data).then((response) => {
            console.log(response);
            console.log("Industry Added");
        }).catch(e => {
            console.log("error in industry added");
        })
    }

    const removeIndustry = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVER_PATH}/professional/${+localStorage.getItem('id')}/industry/${id}`).then((response) => {
            console.log(response);
            console.log("Industry deleted");
        }).catch(e => {
            console.log("error in industry deleted");
        })
    }
    const handleIndustry = (id, name) => {
        if (selectedIndustry.includes(id)) {
            // Remove ID
            const selectedIndustryCopy = [...selectedIndustry]
            const itemIndex = selectedIndustryCopy.indexOf(id)
            selectedIndustryCopy.splice(itemIndex, 1)
            setSelectedIndustry(selectedIndustryCopy)
            removeIndustry(id)
        } else {
            // Add ID
            // selectedIndustry.push(id)
            setSelectedIndustry([...selectedIndustry, id])
            addIndustry(id)
        }

    }
    const handleImg = (event) => {
        console.log(event.target.files[0]);
        if (event.target.files[0].type === 'image/jpeg'
            || event.target.files[0].type === 'image/png') {
            setShowPicError(false)
            setImageUrl(URL.createObjectURL(event.target.files[0]))
            const formDataExp = new FormData();
            formDataExp.append("file", event.target.files[0]);
            formDataExp.append("user_id", +localStorage.getItem('id'));
            axios.post(process.env.REACT_APP_SERVER_PATH + `/document/user/`, formDataExp).then((response) => {
                console.log(response);
                getUser()
            }).catch(e => {
                console.log("error is from uploading");
            })
        } else {
            setShowPicError(true)
        }

    }
    return (
        <div className="mx-6 mt-6">
            <div className="flex justify-center flex-col items-center mt-3">
                {showPicError ? <p className='text-red-500 mt-2 text-center'>Failed to uplaod image;the format is not supported</p> : null}
                <div className="flex">
                    <div className="w-20 h-20 rounded-full border border-blue-400 flex items-center justify-center">
                        <img src={imgUrl} alt="alon" className="w-20 h-20 rounded-full object-cover p-0.5" />
                    </div>
                    <input className="text-xs text-white ml-2" type="file" onChange=
                        {handleImg}
                        ref={fileinput => setFileInput(fileinput)}
                        style={{ display: 'none' }} />
                    <button className="-ml-5 mt-10 bg-gray-100 hover:bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center"
                        onClick={() => {
                            fileInput.click()
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 p-1 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="gray">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
                <button className="text-xs mt-2 text-gray-800"
                    onClick={() => {
                        fileInput.click()
                    }}>Add a profile picture</button>
            </div>
            <div>
                <Form user={user}
                    userFirstName={userFirstName}
                    setUserFirstName={setUserFirstName}
                    userLastName={userLastName}
                    setUserLastName={setUserLastName}
                    userBio={userBio}
                    setBio={setBio}
                    userLocation={userLocation}
                    setUserLocation={setUserLocation}
                    userSession15={userSession15}
                    setSession15={setSession15}
                    userSession30={userSession30}
                    setSession30={setSession30}
                    userJobTitle={userJobTitle}
                    setUserJobTitle={setUserJobTitle} />
            </div>
            {type === 'professional' ? <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" for="industry">
                    Industry
                </label>
                <div className="bg-gray-100 rounded p-4 flex flex-wrap">
                    {industry.map((m) => {
                        return <button className={`flex items-center border rounded m-1 py-2 px-3`}
                            style={{ backgroundColor: selectedIndustry.includes(m.id) ? Colors.blue : Colors.gray, color: selectedIndustry.includes(m.id) ? 'white' : '' }}
                            onClick={() => { handleIndustry(m.id, m.name) }}>{m.name}</button>
                    })}
                </div>
            </div> : null}

            <button className="bg-blue-500 text-white text-center flex justify-center items-center w-full text-sm rounded mt-3 py-3 hover:bg-blue-300"
                style={{ backgroundColor: '#00C4FF' }}
                onClick={saveData}><Notify />{isLoading ? <div className='flex justify-center items-center ml-3'> <Loader
                    type="TailSpin"
                    color="white"
                    height={20}
                    width={20}
                /> </div> : null}</button>
        </div>
    )
}

export default ProfileBio

function Notify() {
    return (
        <div>
            <button>Save Changes</button>
            <ToastContainer
            />
        </div>
    );
}