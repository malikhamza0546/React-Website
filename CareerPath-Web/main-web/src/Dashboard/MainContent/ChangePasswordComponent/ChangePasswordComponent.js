import React, { useState } from 'react'
import CongratulationPassword from './CongratulationPassword/CongratulationPassword'
import ChangePassword from './ChangePassword/ChangePassword'

const ChangePasswordComponent = () => {
    const [navState,setNavState]=useState(0)
    let ComponentToRender = null
    switch (navState) {
        case 0:
            ComponentToRender = <ChangePassword setNavState={setNavState}/>
            break;
        case 1:
            ComponentToRender = (<div>
                <CongratulationPassword setNavState={setNavState}/>
            </div>
            )
            break;

        default:
            return null
    }
        return (
            <div className="my-6 bg-white p-4 rounded">
                {ComponentToRender}
            </div>
    )
}

export default ChangePasswordComponent