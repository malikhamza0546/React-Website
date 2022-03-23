import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { pricetoDecimal } from '../../../../price'
import MonthlyTransactions from './MonthlyTransactions'
import WeeklyTransactions from './WeeklyTransactions'
import YearlyTransactions from './YearlyTransactions'

const PaymentsLower = ({ user }) => {
    const [transactionsWeekly, setTransactionsWeekly] = useState([])
    const [customerTransactionsWeekly, setCustomerTransactionsWeekly] = useState([])
    const [transactionsMonthly, setTransactionsMonthly] = useState([])
    const [customerTransactionsMonthly, setCustomerTransactionsMonthly] = useState([])
    const [transactionsYearly, setTransactionsYearly] = useState([])
    const [customerTransactionsYearly, setCustomerTransactionsYearly] = useState([])
    const [navState, setNavState] = useState(0)
    let type = JSON.parse(localStorage.getItem('type'))
    useEffect(() => {
        if (type === 'professional') {
            // Weekly Data of Transactions fro Professional
            axios.get(`${process.env.REACT_APP_SERVER_PATH}/professional_transactions?limit=100&status=week`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) => {
                console.log(response.data.message.transactions, "Professional Transactions weekly")
                console.log(response.data.message.transactions.length, "length");
                setTransactionsWeekly(response.data.message.transactions)
            }).catch(e => {
                console.log('Errors in Professional Payment api')
            })
            // Monthly Data of Transactions fro Professional
            axios.get(`${process.env.REACT_APP_SERVER_PATH}/professional_transactions?limit=100&status=month`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) => {
                console.log(response.data.message.transactions, "Professional Transactions Monthly")
                console.log(response.data.message.transactions.length, "length");
                setTransactionsMonthly(response.data.message.transactions)
            }).catch(e => {
                console.log('Errors in Professional Payment api')
            })

            // Yearly Data of Transactions fro Professional
            axios.get(`${process.env.REACT_APP_SERVER_PATH}/professional_transactions?limit=100&status=year`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) => {
                console.log(response.data.message.transactions, "Professional Transactions Yearly")
                console.log(response.data.message.transactions.length, "length");
                setTransactionsYearly(response.data.message.transactions)
            }).catch(e => {
                console.log('Errors in Professional Payment api')
            })

        } else {
            // Weekly Data of Transactions fro Customer
            axios.get(`${process.env.REACT_APP_SERVER_PATH}/customer_transactions?limit=100&status=week`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) => {
                console.log(response.data.message, "response from weekly transacation customer")
                console.log(response.data.message.length, "length")
                setCustomerTransactionsWeekly(response.data.message)
            }).catch(e => {
                console.log('Errors in customer Payment api')
            })

            // Monthly Data of Transactions fro Customer
            axios.get(`${process.env.REACT_APP_SERVER_PATH}/customer_transactions?limit=100&status=month`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) => {
                console.log(response.data.message, "response from monthly transacation customer")
                console.log(response.data.message.length, "length")
                setCustomerTransactionsMonthly(response.data.message)
            }).catch(e => {
                console.log('Errors in customer Payment api')
            })

            // Yearly Data of Transactions for Customer
            axios.get(`${process.env.REACT_APP_SERVER_PATH}/customer_transactions?limit=100&status=year`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) => {
                console.log(response.data.message, "response from monthly transacation customer")
                console.log(response.data.message.length, "length")
                setCustomerTransactionsYearly(response.data.message)
            }).catch(e => {
                console.log('Errors in customer Payment api')
            })
        }

    }, [])
    let ComponentToRender = null
    switch (navState) {
        case 0: ComponentToRender = <WeeklyTransactions transactionsWeekly={transactionsWeekly} userType={type} customerTransactionsWeekly={customerTransactionsWeekly} />
            break
        case 1: ComponentToRender = <MonthlyTransactions transactionsMonthly={transactionsMonthly} userType={type} customerTransactionsMonthly={customerTransactionsMonthly} />
            break
        case 2: ComponentToRender = <YearlyTransactions transactionsYearly={transactionsYearly} userType={type} customerTransactionsYearly={customerTransactionsYearly} />
            break
        default:
            return null
    }
    return (
        <div className='bg-white rounded-lg my-6 p-6'>
            <div className='w-full bg-gray-200 flex rounded-xl'>
                <button className='py-2 px-4  hover:text-black hover:bg-transparent rounded-xl w-full m-1'
                    onClick={() => setNavState(0)}
                    style={{
                        backgroundColor: navState === 0 ? 'black' : '',
                        color: navState === 0 ? 'white' : ''
                    }}>Week</button>
                <button className='py-2 px-4  hover:text-black hover:bg-transparent rounded-xl w-full m-1'
                    onClick={() => setNavState(1)}
                    style={{
                        backgroundColor: navState === 1 ? 'black' : '',
                        color: navState === 1 ? 'white' : ''
                    }}>Month</button>
                <button className='py-2 px-4  hover:text-black hover:bg-transparent rounded-xl w-full m-1'
                    onClick={() => setNavState(2)}
                    style={{
                        backgroundColor: navState === 2 ? 'black' : '',
                        color: navState === 2 ? 'white' : ''
                    }}>Year</button>
            </div>
            <div>
                <div>{ComponentToRender}</div>
            </div>
        </div>
    )
}

export default PaymentsLower




