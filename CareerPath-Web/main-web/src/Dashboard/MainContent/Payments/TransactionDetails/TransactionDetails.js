import axios from 'axios'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { pricetoDecimal } from '../../../../price'

const TransactionDetails = ({ user }) => {
    const [transaction, setTransaction] = useState({})
    const location = useLocation()
    console.log(location.state.action, "Action")
    const { id } = useParams()
    console.log(useParams(), "usePArams")
    console.log('transaction Id', id)
    console.log('user type', user.User?.type)
    useEffect(() => {
        window.scroll(0, 0)
        if (user.User?.type === 'professional') {
            axios.get(`${process.env.REACT_APP_SERVER_PATH}/bookings_transaction/${location.state.booking_id}/${location.state.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) => {
                console.log(response.data, 'response')
                console.log('data is from professional response')
                setTransaction(response.data)
            }).catch(e => {
                console.log('Error in professional transaction fetching')
            })
        } else {
            axios.get(`${process.env.REACT_APP_SERVER_PATH}/bookings_transaction/${location.state.booking_id}/${location.state.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) => {
                console.log(response.data, 'response')
                console.log('data is from customer response')
                setTransaction(response.data)
            }).catch(e => {
                console.log('Error in customer transaction fetching')
            })
        }

    }, [])
    let blue = '/t_blue.png'
    let gray = '/t_gray.png'
    let red = '/t_red.png'
    return (
        <div>
            {/* Refund for Customer */}
            {user.User?.type === 'customer' ? <div>
                {location.state.action === 'Refund' ? <div>
                    <div className='bg-white rounded p-6 flex flex-col'>
                        <div className='flex items-start justify-between'>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </span>
                            <span className='w-16 h-16 bg-gray-200 rounded-lg flex justify-center items-center hover:bg-gray-300'>
                                <img src='/help.png' />
                            </span>
                        </div>
                        <div className='w-full flex items-center justify-center flex-col'>
                            <div className='flex items-center justify-center'>
                                <img src={transaction.booking?.Professionals_Metadatum?.User?.profile_photo} alt='picture' className='w-20 h-20 rounded-full object-cover z-10' />
                                {/* <img src={transaction.user_id === transaction.Booking?.customer_id ? transaction.Booking?.User?.profile_photo : transaction.Booking?.Professionals_Metadatum?.User?.profile_photo} alt='picture' className='w-20 h-20 rounded-full object-cover -ml-4' /> */}
                            </div>
                            <p className='text-2xl font-bold mt-4'>{`${transaction.booking?.session_duration}`} min Meeting with {transaction.booking?.Professionals_Metadatum?.User?.first_name}</p>
                            <p className='text-lg mt-1'>{moment(transaction.booking?.booking_time * 1000).format('ddd,DD MMM,YYYY h:mm A')}</p>
                        </div>
                        <div className='w-full rounded-xl p-6 justify-center flex items-center flex-col mt-6' style={{
                            backgroundImage: `url(${gray})`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}>
                            <p className='text-lg text-white'>Transaction</p>
                            <p className='text-4xl font-bold text-white'>{pricetoDecimal(transaction.booking?.total_price)}</p>
                            <p className='text-lg text-white'>Your payment {pricetoDecimal(transaction.total)} has been refunded for {`${transaction.booking?.session_duration}`} mins call</p>
                        </div>

                    </div>
                    <div className='bg-white rounded my-6 p-6 py-8'>
                        <p className='text-2xl font-bold'>Transaction Details</p>
                        <div className='flex items-center justify-between mt-4 text-lg text-gray-700'>
                            <p>Subtotal</p>
                            <p>{pricetoDecimal(transaction.booking?.total_price)}</p>
                        </div>
                        {/* <div className='flex items-center justify-between mt-2 text-lg text-gray-700'>
                        <p>Donation</p>
                        <p>$70</p>
                    </div>
                    <div className='flex items-center justify-between mt-2 text-lg text-gray-700'>
                        <p>CareerPath Fee</p>
                        <p>$51</p>
                    </div> */}
                        <div className='flex items-center justify-between mt-2 text-lg text-black font-bold'>
                            <p>Total Refund</p>
                            <p>{pricetoDecimal(transaction.total)}</p>
                        </div>
                    </div>
                </div> : //REFERRAL BONUS for Customer
                    location.state.action === 'REFERRAL BONUS' ? <div>
                        <div className='bg-white rounded p-6 flex flex-col'>
                            <div className='flex items-start justify-between'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                </span>
                                <span className='w-16 h-16 bg-gray-200 rounded-lg flex justify-center items-center hover:bg-gray-300'>
                                    <img src='/help.png' />
                                </span>
                            </div>
                            <div className='w-full flex items-center justify-center flex-col'>
                                <div className='flex items-center'>
                                    <img src={transaction.booking?.User?.profile_photo} alt='picture' className='w-20 h-20 rounded-full object-cover z-10' />
                                    {/* <img src={transaction.user_id === transaction.Booking?.customer_id ? transaction.Booking?.User?.profile_photo : transaction.Booking?.Professionals_Metadatum?.User?.profile_photo} alt='picture' className='w-20 h-20 rounded-full object-cover -ml-4' /> */}
                                </div>
                                <p className='text-2xl font-bold mt-4'>30 min Meeting with John</p>
                                <p className='text-lg mt-1'>{moment(new Date()).format('ddd,DD MMM,YYYY h:mm A')}</p>
                            </div>
                            <div className='w-full rounded-xl p-6 justify-center flex items-center flex-col mt-6' style={{
                                backgroundImage: `url(${red})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}>
                                <p className='text-lg text-white'>Transaction</p>
                                <p className='text-4xl font-bold text-white'>{pricetoDecimal(200)}</p>
                                <p className='text-lg text-white'>You have recieved $175 from </p>
                                <p className='text-lg text-white'>john doe 30 min call</p>
                            </div>

                        </div>
                        <div className='bg-white rounded my-6 p-6 py-8'>
                            <p className='text-2xl font-bold'>Transaction Details</p>
                            <div className='flex items-center justify-between mt-4 text-lg text-gray-700'>
                                <p>Subtotal</p>
                                <p>$5000</p>
                            </div>
                            <div className='flex items-center justify-between mt-2 text-lg text-gray-700'>
                                <p>Donation</p>
                                <p>$70</p>
                            </div>
                            <div className='flex items-center justify-between mt-2 text-lg text-gray-700'>
                                <p>CareerPath Fee</p>
                                <p>$51</p>
                            </div>
                            <div className='flex items-center justify-between mt-2 text-lg text-black font-bold'>
                                <p>Total Earning</p>
                                <p>$5300</p>
                            </div>
                        </div>
                    </div> :  //Session Booking for customer
                        location.state.action === 'Session Booking' ? <div>
                            <div className='bg-white rounded p-6 flex flex-col'>
                                <div className='flex items-start justify-between'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                    </span>
                                    <span className='w-16 h-16 bg-gray-200 rounded-lg flex justify-center items-center hover:bg-gray-300'>
                                        <img src='/help.png' />
                                    </span>
                                </div>
                                <div className='w-full flex items-center justify-center flex-col'>
                                    <div className='flex items-center'>
                                        <img src={transaction.booking?.User?.profile_photo} alt='picture' className='w-20 h-20 rounded-full object-cover z-10' />
                                        {/* <img src={transaction.user_id === transaction.Booking?.customer_id ? transaction.Booking?.User?.profile_photo : transaction.Booking?.Professionals_Metadatum?.User?.profile_photo} alt='picture' className='w-20 h-20 rounded-full object-cover -ml-4' /> */}
                                    </div>
                                    <p className='text-2xl font-bold mt-4'>{`${transaction.booking?.session_duration}`} min Meeting with {transaction.booking?.Professionals_Metadatum?.User?.first_name}</p>
                                    <p className='text-lg mt-1'>{moment(transaction.booking?.booking_time * 1000).format('ddd,DD MMM,YYYY h:mm A')}</p>
                                </div>
                                <div className='w-full rounded-xl p-6 justify-center flex items-center flex-col mt-6' style={{
                                    backgroundImage: `url(${red})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                }}>
                                    <p className='text-lg text-white'>Transaction</p>
                                    <p className='text-4xl font-bold text-white'>{pricetoDecimal(transaction.booking?.total_price)}</p>
                                    <p className='text-lg text-white text-center'>You have paid {pricetoDecimal(transaction.total)} to {transaction.booking?.Professionals_Metadatum?.User?.first_name} for {`${transaction.booking?.session_duration}`} mins call</p>
                                </div>

                            </div>
                            <div className='bg-white rounded my-6 p-6 py-8'>
                                <p className='text-2xl font-bold'>Transaction Details</p>
                                <div className='flex items-center justify-between mt-4 text-lg text-gray-700'>
                                    <p>Subtotal</p>
                                    <p>{pricetoDecimal(transaction.booking?.total_price)}</p>
                                </div>
                                <div className='flex items-center justify-between mt-2 text-lg text-gray-700'>
                                    <p>Discount Coupen</p>
                                    <p>{transaction.transactions && transaction.transactions.map(transaction => {
                                        if (transaction.action === 'DISCOUNT') {
                                            return <p>{pricetoDecimal(transaction.amount)}</p>
                                        } else {
                                            return null
                                        }

                                    })}</p>
                                </div>
                                {/* <div className='flex items-center justify-between mt-2 text-lg text-gray-700'>
                            <p>CareerPath Fee</p>
                            <p>$51</p>
                        </div> */}
                                <div className='flex items-center justify-between mt-2 text-lg text-black font-bold'>
                                    <p>Total Earning</p>
                                    <p>{pricetoDecimal(transaction.total)}</p>
                                </div>
                            </div>
                        </div> : null}
            </div> : // Transactio details for Professional
                <div>
                    {location.state.action === 'Session Booking' ? <div>
                        <div className='bg-white rounded p-6 flex flex-col'>
                            <div className='flex items-start justify-between'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                </span>
                                <span className='w-16 h-16 bg-gray-200 rounded-lg flex justify-center items-center hover:bg-gray-300'>
                                    <img src='/help.png' />
                                </span>
                            </div>
                            <div className='w-full flex items-center justify-center flex-col'>
                                <div className='flex items-center'>
                                    <img src={transaction.booking?.Professionals_Metadatum?.User?.profile_photo} alt='picture' className='w-20 h-20 rounded-full object-cover z-10' />
                                    {/* <img src={transaction.user_id === transaction.Booking?.customer_id ? transaction.Booking?.User?.profile_photo : transaction.Booking?.Professionals_Metadatum?.User?.profile_photo} alt='picture' className='w-20 h-20 rounded-full object-cover -ml-4' /> */}
                                </div>
                                <p className='text-2xl font-bold mt-4'>{`${transaction.booking?.session_duration}`} min Meeting with {transaction.booking?.Professionals_Metadatum?.User?.first_name}</p>
                                <p className='text-lg mt-1'>{moment(transaction.booking?.booking_time * 1000).format('ddd,DD MMM,YYYY h:mm A')}</p>
                            </div>
                            <div className='w-full rounded-xl p-6 justify-center flex items-center flex-col mt-6' style={{
                                backgroundImage: `url(${red})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}>
                                <p className='text-lg text-white'>Transaction</p>
                                <p className='text-4xl font-bold text-white'>{pricetoDecimal(transaction.booking?.total_price)}</p>
                                <p className='text-lg text-white text-center'>You have paid {pricetoDecimal(transaction.booking?.total_price)} to {transaction.booking?.Professionals_Metadatum?.User?.first_name} for {`${transaction.booking?.session_duration}`} mins call</p>
                            </div>

                        </div>
                        <div className='bg-white rounded my-6 p-6 py-8'>
                            <p className='text-2xl font-bold'>Transaction Details</p>
                            <div className='flex items-center justify-between mt-4 text-lg text-gray-700'>
                                <p>Subtotal</p>
                                <p>{pricetoDecimal(transaction.booking?.total_price)}</p>
                            </div>
                            {/* <div className='flex items-center justify-between mt-2 text-lg text-gray-700'>
                                <p>Discount Coupen</p>
                                <p>{transaction.transactions && transaction.transactions.map(transaction => {
                                    if (transaction.action === 'DISCOUNT') {
                                        return <p>{pricetoDecimal(transaction.amount)}</p>
                                    } else {
                                        return null
                                    }

                                })}</p>
                            </div> */}
                            {/* <div className='flex items-center justify-between mt-2 text-lg text-gray-700'>
                            <p>CareerPath Fee</p>
                            <p>$51</p>
                        </div> */}
                            <div className='flex items-center justify-between mt-2 text-lg text-black font-bold'>
                                <p>Total Paid</p>
                                <p>{pricetoDecimal(transaction.booking?.total_price)}</p>
                            </div>
                        </div>
                    </div> : location.state.action === 'Commission' ? <div>
                        <div className='bg-white rounded p-6 flex flex-col'>
                            <div className='flex items-start justify-between'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                </span>
                                <span className='w-16 h-16 bg-gray-200 rounded-lg flex justify-center items-center hover:bg-gray-300'>
                                    <img src='/help.png' />
                                </span>
                            </div>
                            <div className='w-full flex items-center justify-center flex-col'>
                                <div className='flex items-center justify-center'>
                                    <img src={transaction.booking?.User?.profile_photo} alt='picture' className='w-20 h-20 rounded-full object-cover z-10' />
                                    {/* <img src={transaction.user_id === transaction.Booking?.customer_id ? transaction.Booking?.User?.profile_photo : transaction.Booking?.Professionals_Metadatum?.User?.profile_photo} alt='picture' className='w-20 h-20 rounded-full object-cover -ml-4' /> */}
                                </div>
                                <p className='text-2xl font-bold mt-4'>{`${transaction.booking?.session_duration}`} min Meeting with {transaction.booking?.User?.first_name}</p>
                                <p className='text-lg mt-1'>{moment(transaction.booking?.booking_time * 1000).format('ddd,DD MMM,YYYY h:mm A')}</p>
                            </div>
                            <div className='w-full rounded-xl p-6 justify-center flex items-center flex-col mt-6' style={{
                                backgroundImage: `url(${blue})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}>
                                <p className='text-lg text-white'>Transaction</p>
                                <p className='text-4xl font-bold text-white'>{pricetoDecimal(transaction.booking?.total_price)}</p>
                                <p className='text-lg text-white'>You have recieved {pricetoDecimal(transaction.total)} from {`${transaction.booking?.User?.first_name}`}{`${transaction.booking?.session_duration}`} mins call</p>
                            </div>

                        </div>
                        <div className='bg-white rounded my-6 p-6 py-8'>
                            <p className='text-2xl font-bold'>Transaction Details</p>
                            <div className='flex items-center justify-between mt-4 text-lg text-gray-700'>
                                <p>Subtotal</p>
                                <p>{pricetoDecimal(transaction.booking?.total_price)}</p>
                            </div>
                            {/* <div className='flex items-center justify-between mt-2 text-lg text-gray-700'>
                                <p>Donation</p>
                                <p>$70</p>
                            </div> */}
                            <div className='flex items-center justify-between mt-2 text-lg text-gray-700'>
                                <p>CareerPath Fee</p>
                                <p>{transaction.transactions && transaction.transactions.map(transaction => transaction.action === 'Admin Commission' ? <p>-{pricetoDecimal(transaction.amount)}</p> : null)}</p>
                            </div>
                            <div className='flex items-center justify-between mt-2 text-lg text-black font-bold'>
                                <p>Total Earnings</p>
                                <p>{pricetoDecimal(transaction.total)}</p>
                            </div>
                        </div>
                    </div> : location.state.action === 'Refund' ? <div>
                        <div className='bg-white rounded p-6 flex flex-col'>
                            <div className='flex items-start justify-between'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                </span>
                                <span className='w-16 h-16 bg-gray-200 rounded-lg flex justify-center items-center hover:bg-gray-300'>
                                    <img src='/help.png' />
                                </span>
                            </div>
                            <div className='w-full flex items-center justify-center flex-col'>
                                <div className='flex items-center justify-center'>
                                    <img src={transaction.booking?.Professionals_Metadatum?.User?.profile_photo} alt='picture' className='w-20 h-20 rounded-full object-cover z-10' />
                                    {/* <img src={transaction.user_id === transaction.Booking?.customer_id ? transaction.Booking?.User?.profile_photo : transaction.Booking?.Professionals_Metadatum?.User?.profile_photo} alt='picture' className='w-20 h-20 rounded-full object-cover -ml-4' /> */}
                                </div>
                                <p className='text-2xl font-bold mt-4'>{`${transaction.booking?.session_duration}`} min Meeting with {transaction.booking?.Professionals_Metadatum?.User?.first_name}</p>
                                <p className='text-lg mt-1'>{moment(transaction.booking?.booking_time * 1000).format('ddd,DD MMM,YYYY h:mm A')}</p>
                            </div>
                            <div className='w-full rounded-xl p-6 justify-center flex items-center flex-col mt-6' style={{
                                backgroundImage: `url(${gray})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}>
                                <p className='text-lg text-white'>Transaction</p>
                                <p className='text-4xl font-bold text-white'>{pricetoDecimal(transaction.booking?.total_price)}</p>
                                <p className='text-lg text-white'>Your payment {pricetoDecimal(transaction.total)} has been refunded for {`${transaction.booking?.session_duration}`} mins call</p>
                            </div>

                        </div>
                        <div className='bg-white rounded my-6 p-6 py-8'>
                            <p className='text-2xl font-bold'>Transaction Details</p>
                            <div className='flex items-center justify-between mt-4 text-lg text-gray-700'>
                                <p>Subtotal</p>
                                <p>{pricetoDecimal(transaction.booking?.total_price)}</p>
                            </div>
                            {/* <div className='flex items-center justify-between mt-2 text-lg text-gray-700'>
                        <p>Donation</p>
                        <p>$70</p>
                    </div>
                    <div className='flex items-center justify-between mt-2 text-lg text-gray-700'>
                        <p>CareerPath Fee</p>
                        <p>$51</p>
                    </div> */}
                            <div className='flex items-center justify-between mt-2 text-lg text-black font-bold'>
                                <p>Total Refund</p>
                                <p>{pricetoDecimal(transaction.total)}</p>
                            </div>
                        </div>
                    </div> : null}
                </div>}
        </div>
    )
}


export default TransactionDetails