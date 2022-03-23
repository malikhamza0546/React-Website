import React, { useState } from 'react'
import ChangeEmail from './ChangeEmail/ChangeEmail'
import ChangeEmailCode from './ChangeEmailCode/ChangeEmailCode'
import CongratulationEmail from './CongratulationEmail/CongratulationEmail'
const ChangeEmailComponent = () => {
    const [navState, setNavState] = useState(0)
    let ComponentToRender = null
    switch (navState) {
        case 0:
            ComponentToRender = <ChangeEmail setNavState={setNavState} />
            break;
        case 2:
            ComponentToRender = (<div>
                <ChangeEmailCode setNavState={setNavState} />
            </div>
            )
            break;
        case 1:
            ComponentToRender = (<div>
                <CongratulationEmail />
            </div>
            )
            break;


        default:
            return null
    }
    return (
        <div className="mt-6 bg-white p-4 rounded">
            <p className="font-bold mt-4">Change Email</p>
            <div>
                {ComponentToRender}
            </div>
        </div>
    )
}

export default ChangeEmailComponent
