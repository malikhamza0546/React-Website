import React, { useEffect, useState } from 'react'
import PaymentsLower from './PaymentsLower/PaymentsLower'
import PaymentsUpper from './PaymentsUpper/PaymentsUpper'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import TransactionDetails from './TransactionDetails/TransactionDetails'

const Payments = ({ user }) => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<div>
                    <PaymentsUpper user={user} />
                    <PaymentsLower user={user} />
                </div>} />
                <Route path=':id' element={<TransactionDetails user={user} />} />
            </Routes>

        </div>
    )
}

export default Payments
