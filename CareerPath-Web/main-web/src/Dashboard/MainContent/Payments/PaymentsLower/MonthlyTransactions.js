import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { pricetoDecimal } from '../../../../price'

const MonthlyTransactions = ({ transactionsMonthly, userType, customerTransactionsMonthly }) => {
    return (
        <div className='mt-6'>
            {userType === 'professional' ? transactionsMonthly.map(transaction => {
                return (
                    <div>
                        {/* Refund of Professional */}
                        {transaction.action === 'Refund' ?
                            <Link to={`${transaction.id}`} state={{ id: transaction.user_id, booking_id: transaction.booking_id, action: transaction.action }}>
                                <div className='flex justify-between items-center px-4 py-3 rounded-lg border mb-2'>
                                    <div className='flex items-center'>
                                        {console.log(transaction.action, "transaction action")}
                                        <img src={transaction.user_id === transaction.Booking?.Professionals_Metadatum?.user_id ? transaction.Booking?.User?.profile_photo : transaction.Booking?.Professionals_Metadatum?.User?.profile_photo} alt='picture' className='w-14 h-14 rounded-full object-cover' />
                                        <div className='ml-2'>
                                            <p className='text-lg font-bold'>Your payment has been refunded</p>
                                            <p className='text-sm'>{moment(transaction.createdAt).format('dddd,MMM D,YYYY h:mm A')}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='text-green-500 font-bold'>{pricetoDecimal(transaction.amount)}</p>
                                    </div>
                                </div></Link> :              // Commission of Professional
                            transaction.action === 'Commission' ?
                                <Link to={`${transaction.id}`} state={{ id: transaction.user_id, booking_id: transaction.booking_id, action: transaction.action }}>
                                    <div className='flex justify-between items-center px-4 py-3 rounded-lg border mb-2'>
                                        <div className='flex items-center'>
                                            {console.log(transaction.action, "transaction action")}
                                            <img src={transaction.user_id === transaction.Booking?.Professionals_Metadatum?.user_id ? transaction.Booking?.User?.profile_photo : transaction.Booking?.Professionals_Metadatum?.User?.profile_photo} alt='picture' className='w-14 h-14 rounded-full object-cover' />
                                            <div className='ml-2'>
                                                <p className='text-lg font-bold'><div className='flex'>
                                                    <p>You recieved&nbsp;</p>
                                                    {pricetoDecimal(transaction.Booking?.session_price)}
                                                    <p>&nbsp;{`from ${transaction.user_id === transaction.Booking?.Professionals_Metadatum?.user_id ? transaction.Booking?.User?.first_name : transaction.Booking?.Professionals_Metadatum?.User?.first_name} 
                                    ${transaction.user_id === transaction.Booking?.Professionals_Metadatum?.user_id ? transaction.Booking?.User?.last_name : transaction.Booking?.Professionals_Metadatum?.User?.last_name}`}</p>
                                                </div></p>
                                                <p className='text-sm'>{moment(transaction.createdAt).format('dddd,MMM D,YYYY h:mm A')}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className='text-green-500 font-bold'>{pricetoDecimal(transaction.amount)}</p>
                                        </div>
                                    </div></Link> :     // Session Booking of Professional
                                transaction.action === 'Session Booking' ?
                                    <Link to={`${transaction.id}`} state={{ id: transaction.user_id, booking_id: transaction.booking_id, action: transaction.action }}>
                                        <div className='flex justify-between items-center px-4 py-3 rounded-lg border mb-2'>
                                            <div className='flex items-center'>
                                                {console.log(transaction.action, "transaction action")}
                                                <img src={transaction.user_id === transaction.Booking?.Professionals_Metadatum?.user_id ? transaction.Booking?.User?.profile_photo : transaction.Booking?.Professionals_Metadatum?.User?.profile_photo} alt='picture' className='w-14 h-14 rounded-full object-cover' />
                                                <div className='ml-2'>
                                                    <p className='text-lg font-bold'><div className='flex'>
                                                        <p>You have sent&nbsp;</p>
                                                        {pricetoDecimal(transaction.Booking?.session_price)}
                                                        <p>&nbsp;{`to ${transaction.user_id === transaction.Booking?.Professionals_Metadatum?.user_id ? transaction.Booking?.User?.first_name : transaction.Booking?.Professionals_Metadatum?.User?.first_name} 
                                    ${transaction.user_id === transaction.Booking?.Professionals_Metadatum?.user_id ? transaction.Booking?.User?.last_name : transaction.Booking?.Professionals_Metadatum?.User?.last_name}`}</p>
                                                    </div></p>
                                                    <p className='text-sm'>{moment(transaction.createdAt).format('dddd,MMM D,YYYY h:mm A')}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className='text-green-500 font-bold'><div className='flex'>
                                                    <p className='text-black font-bold'>-&nbsp;</p>
                                                    <p className='text-black font-bold'>
                                                        {pricetoDecimal(transaction.amount)}
                                                    </p>
                                                </div></p>
                                            </div>
                                        </div> </Link> :   // PAYMENT IS DECLINE
                                    transaction.action === 'PAYMENT IS DECLINE' ? <div className='flex justify-between items-center px-4 py-3 rounded-lg border mb-2'>
                                        <div className='flex items-center'>
                                            {console.log(transaction.action, "transaction action")}
                                            <img src='/cplogo.png' alt='picture' className='w-14 h-14 rounded-full object-cover border' />
                                            <div className='ml-2'>
                                                <p className='text-lg font-bold'><div className='flex'>
                                                    <p>Your withdral request for&nbsp;</p>
                                                    {pricetoDecimal(transaction.amount)}
                                                    <p>&nbsp;has been declined</p>
                                                </div></p>
                                                <p className='text-sm'>{moment(transaction.createdAt).format('dddd,MMM D,YYYY h:mm A')}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className='text-green-500 font-bold'><div className='flex'>
                                                <p className='text-red-500 font-bold'>
                                                    {pricetoDecimal(transaction.amount)}
                                                </p>
                                            </div></p>
                                        </div>
                                    </div> ://Withdrawal
                                        transaction.action === 'Withdrawal' ? <div className='flex justify-between items-center px-4 py-3 rounded-lg border mb-2'>
                                            <div className='flex items-center'>
                                                {console.log(transaction.action, "transaction action")}
                                                <img src='/cplogo.png' alt='picture' className='w-14 h-14 rounded-full object-cover border' />
                                                <div className='ml-2'>
                                                    <p className='text-lg font-bold'><div className='flex'>
                                                        <p>Your withdrawl request for&nbsp;</p>
                                                        {pricetoDecimal(transaction.amount)}
                                                        <p>&nbsp;has been approved</p>
                                                    </div></p>
                                                    <p className='text-sm'>{moment(transaction.createdAt).format('dddd,MMM D,YYYY h:mm A')}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className='text-green-500 font-bold'><div className='flex'>
                                                    <p className='text-red-500 font-bold'>
                                                        {pricetoDecimal(transaction.amount)}
                                                    </p>
                                                </div></p>
                                            </div>
                                        </div> ://Pending Withdrawal Request 
                                            transaction.action === 'Pending Withdrawal Request' ? <div className='flex justify-between items-center px-4 py-3 rounded-lg border mb-2'>
                                                <div className='flex items-center'>
                                                    {console.log(transaction.action, "transaction action")}
                                                    <img src='/cplogo.png' alt='picture' className='w-14 h-14 rounded-full object-cover border' />
                                                    <div className='ml-2'>
                                                        <p className='text-lg font-bold'><div className='flex'>
                                                            <p>You requested payment withdrawn of &nbsp;</p>
                                                            {pricetoDecimal(transaction.amount)}
                                                        </div></p>
                                                        <p className='text-sm'>{moment(transaction.createdAt).format('dddd,MMM D,YYYY h:mm A')}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className='text-green-500 font-bold'><div className='flex'>
                                                        <p className='text-red-500 font-bold'>
                                                            {pricetoDecimal(transaction.amount)}
                                                        </p>
                                                    </div></p>
                                                </div>
                                            </div> ://PARTIAL AMOUNT PAID 
                                                transaction.action === 'PARTIAL AMOUNT PAID' ? <div className='flex justify-between items-center px-4 py-3 rounded-lg border mb-2'>
                                                    <div className='flex items-center'>
                                                        {console.log(transaction.action, "transaction action")}
                                                        <img src='/cplogo.png' alt='picture' className='w-14 h-14 rounded-full object-cover border' />
                                                        <div className='ml-2'>
                                                            <p className='text-lg font-bold'><div className='flex'>
                                                                <p>Your withdrawl request for &nbsp;</p>
                                                                {pricetoDecimal(transaction.amount)}
                                                                <p>&nbsp;has been partailly accepted</p>
                                                            </div></p>
                                                            <p className='text-sm'>{moment(transaction.createdAt).format('dddd,MMM D,YYYY h:mm A')}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className='text-green-500 font-bold'><div className='flex'>
                                                            <p className='text-red-500 font-bold'>
                                                                {pricetoDecimal(transaction.amount)}
                                                            </p>
                                                        </div></p>
                                                    </div>
                                                </div> :// REFERRAL BONUS
                                                    transaction.action === 'REFERRAL BONUS' ? <div className='flex justify-between items-center px-4 py-3 rounded-lg border mb-2'>
                                                        <div className='flex items-center'>
                                                            {console.log(transaction.action, "transaction action")}
                                                            <img src='/cplogo.png' alt='picture' className='w-14 h-14 rounded-full object-cover border' />
                                                            <div className='ml-2'>
                                                                <p className='text-lg font-bold'><div className='flex'>
                                                                    <p>You have recieved referal reward  of &nbsp;</p>
                                                                    {pricetoDecimal(transaction.amount)}
                                                                </div></p>
                                                                <p className='text-sm'>{moment(transaction.createdAt).format('dddd,MMM D,YYYY h:mm A')}</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className='text-green-500 font-bold'><div className='flex'>
                                                                <p className='text-red-500 font-bold'>
                                                                    {pricetoDecimal(transaction.amount)}
                                                                </p>
                                                            </div></p>
                                                        </div>
                                                    </div> : null}
                    </div>
                )
            }) : customerTransactionsMonthly.map(transaction => {
                return (
                    <div>
                        {console.log(transaction.action, "transaction action")}
                        {transaction.action === 'Refund' ?
                            <Link to={`${transaction.id}`} state={{ id: transaction.user_id, booking_id: transaction.booking_id, action: transaction.action }}>
                                <div className='flex justify-between items-center px-4 py-3 rounded-lg border mb-2'>
                                    <div className='flex items-center'>
                                        <img src={transaction.Booking?.Professionals_Metadatum?.User?.profile_photo ? transaction.Booking?.Professionals_Metadatum?.User?.profile_photo : '/avatar.png'} alt='picture' className='w-14 h-14 rounded-full object-cover' />
                                        <div className='ml-2'>
                                            <p className='text-lg font-bold'>Your payment has been refunded</p>
                                            <p className='text-sm'>{moment(transaction.createdAt).format('dddd,MMM D,YYYY h:mm A')}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='text-green-500 font-bold'>
                                            {pricetoDecimal(transaction.amount)}
                                        </p>
                                    </div>
                                </div></Link> : //SESSION_BOOKING
                            transaction.action === 'Session Booking' ?
                                <Link to={`${transaction.id}`} state={{ id: transaction.user_id, booking_id: transaction.booking_id, action: transaction.action }}>
                                    <div className='flex justify-between items-center px-4 py-3 rounded-lg border mb-2'>
                                        <div className='flex items-center'>
                                            <img src={transaction.Booking?.Professionals_Metadatum?.User?.profile_photo ? transaction.Booking?.Professionals_Metadatum?.User?.profile_photo : '/avatar.png'} alt='picture' className='w-14 h-14 rounded-full object-cover' />
                                            <div className='ml-2'>
                                                <p className='text-lg font-bold'><div className='flex'>
                                                    <p>You have sent&nbsp;</p>
                                                    {pricetoDecimal(transaction.Booking?.session_price)}
                                                    <p>&nbsp;{`to ${transaction.Booking?.Professionals_Metadatum?.User?.first_name} 
                                    ${transaction.Booking?.Professionals_Metadatum?.User?.last_name}`}</p>
                                                </div></p>
                                                <p className='text-sm'>{moment(transaction.createdAt).format('dddd,MMM D,YYYY h:mm A')}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className='text-black font-bold'>
                                                <div className='flex'>
                                                    <p>-&nbsp;</p>
                                                    <p>{pricetoDecimal(transaction.amount)}</p>
                                                </div>

                                            </p>
                                        </div>
                                    </div> </Link> ://REFERRAL_BONUS
                                transaction.action === 'REFERRAL BONUS' ? <div className='flex justify-between items-center px-4 py-3 rounded-lg border mb-2'>
                                    <div className='flex items-center'>
                                        <img src='/cplogo.png' alt='picture' className='w-14 h-14 rounded-full object-cover border' />
                                        <div className='ml-2'>
                                            <p className='text-lg font-bold'><div className='flex'>
                                                <p>You have recieved referal reward  of&nbsp;</p>
                                                {pricetoDecimal(transaction.amount)}
                                            </div></p>
                                            <p className='text-sm'>{moment(transaction.createdAt).format('dddd,MMM D,YYYY h:mm A')}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='text-green-500 font-bold'>{pricetoDecimal(transaction.amount)}</p>
                                    </div>
                                </div> : null}
                    </div>
                )
            })}
        </div>
    )
}

export default MonthlyTransactions