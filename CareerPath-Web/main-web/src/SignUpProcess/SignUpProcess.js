import React, { useState } from 'react'
import AddEducation from './AddEducation'
import AddFullName from './AddFullName'
import AddLocation from './AddLocation'
import AddPrice from './AddPrice'
import AddProfilePic from './AddProfilePic'
import AddVideo from './AddVideo'
import AddWeekHoursEmpty from './AddWeekHoursEmpty'
import AddWeekHours from './AddWeekHours'
import AddWorkExperience from './AddWorkExperience'
import EducationForm from './EducationForm'
import EducationHistory from './EducationHistory'
import PriceAdded from './PriceAdded'
import ProfessionalStatus from './ProfessionalStatus'
import SelectIndustry from './SelectIndustry'
import Welcome from './Welcome'
import WorkExperienceForm from './WorkExperienceForm'
import WorkExperienceHistory from './WorkExperienceHistory'
import YearlySalary from './YearlySalary'
import AccountCreated from './AccountCreated'
import Availability from './Availability'
// const [days,setDays]=useState(['Sunday','Monday',,'Tuesday',,'Wednesday',,'Friday',,'Satureday'])
const SignUpProcess = (props) => {
    const [navState, setNavState] = useState(+localStorage.getItem("navState") !== undefined ? +localStorage.getItem("navState") : 0)
    const [ProfessionalId, setProfessionalId] = useState(null)
    const [token, setToken] = useState(null)
    console.log(ProfessionalId);
    let ComponentToRender = null
    switch (navState) {
        case 0:
            ComponentToRender = <Welcome setNavState={setNavState} navState={navState} />
            break
        case 1:
            ComponentToRender = <AddFullName setNavState={setNavState} navState={navState} setProfessionalId={setProfessionalId}
                setToken={setToken} />
            break
        case 2:
            ComponentToRender = <ProfessionalStatus setNavState={setNavState} navState={navState} ProfessionalId={ProfessionalId} />
            break
        case 3:
            ComponentToRender = <AddLocation setNavState={setNavState} navState={navState} ProfessionalId={ProfessionalId} />
            break
        case 4:
            ComponentToRender = <AddProfilePic setNavState={setNavState} navState={navState} ProfessionalId={ProfessionalId} />
            break
        case 5:
            ComponentToRender = <AddVideo setNavState={setNavState} navState={navState} ProfessionalId={ProfessionalId} />
            break
        case 6:
            ComponentToRender = <SelectIndustry setNavState={setNavState} navState={navState}
                ProfessionalId={ProfessionalId} />
            break
        case 7:
            ComponentToRender = <AddWorkExperience setNavState={setNavState} navState={navState} />
            break
        case 8:
            ComponentToRender = <WorkExperienceForm setNavState={setNavState} navState={navState}
                ProfessionalId={ProfessionalId}
                token={token} />
            break
        case 9:
            ComponentToRender = <WorkExperienceHistory setNavState={setNavState} navState={navState}
                ProfessionalId={ProfessionalId} />
            break
        case 10:
            ComponentToRender = <AddEducation setNavState={setNavState} navState={navState}
            />
            break
        case 11:
            ComponentToRender = <EducationForm setNavState={setNavState} navState={navState}
                ProfessionalId={ProfessionalId} />
            break
        case 12:
            ComponentToRender = <EducationHistory setNavState={setNavState} navState={navState}
                ProfessionalId={ProfessionalId} />
            break
        case 13:
            ComponentToRender = <AddPrice setNavState={setNavState} navState={navState}
                ProfessionalId={ProfessionalId} />
            break
        case 14:
            ComponentToRender = <YearlySalary setNavState={setNavState} navState={navState}
                ProfessionalId={ProfessionalId} />
            break
        case 15:
            ComponentToRender = <PriceAdded setNavState={setNavState} navState={navState}
                ProfessionalId={ProfessionalId} />
            break
        case 16:
            ComponentToRender = <AddWeekHours
                setNavState={setNavState} navState={navState} />
            break
        case 17:
            ComponentToRender = <AccountCreated setNavState={setNavState} navState={navState} />
            break
        default:
            return
    }
    return (
        <div className={props.modal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className={props.overlay} onClick={props.toggle}></div>
            <div className="flex flex-col justify-center items-center border  w-1/3 rounded py-8 px-8 text-gray-500 bg-white m-auto z-30">
                {ComponentToRender}
            </div>
        </div>
    )
}

export default SignUpProcess
