import React, { useState } from 'react';
import AddEducation from './AddEducation';
import AddInformation from './AddInformation';
import AddLocation from './AddLocation';
import AddProfilePic from './AddProfilePic';
import CareerInsights from './CareerInsights';
import EducationForm from './EducationForm';
import SelectIndustry from './SelectIndustry';
import EducationHistory from './EducationHistory'
import Welcome from './Welcome';
import AddWorkExperience from './AddWorkExperience';
import WorkExperienceForm from './WorkExperienceForm';
import WorkExperienceHistory from './WorkExperienceHistory';
import AccountCreated from './AccountCreated';

const SignUpProcessOfCustomer = (props) => {
    const [navState, setNavState] = useState(0)
    let ComponentToRender = null
    switch (navState) {
        case 0:
            ComponentToRender = <Welcome setNavState={setNavState} navState={navState} />
            break
        case 1:
            ComponentToRender = <AddInformation setNavState={setNavState} navState={navState} />
            break
        case 2:
            ComponentToRender = <SelectIndustry setNavState={setNavState} navState={navState} />
            break
        case 3:
            ComponentToRender = <CareerInsights setNavState={setNavState} navState={navState} />
            break
        case 4:
            ComponentToRender = <AddLocation setNavState={setNavState} navState={navState} />
            break
        case 5:
            ComponentToRender = <AddProfilePic setNavState={setNavState} navState={navState} />
            break
        case 6:
            ComponentToRender = <AddEducation setNavState={setNavState} navState={navState} />
            break
        case 7:
            ComponentToRender = <EducationForm setNavState={setNavState} navState={navState} />
            break
        case 8:
            ComponentToRender = <EducationHistory setNavState={setNavState} navState={navState} />
            break
        case 9:
            ComponentToRender = <AddWorkExperience setNavState={setNavState} navState={navState} />
            break
        case 10:
            ComponentToRender = <WorkExperienceForm setNavState={setNavState} navState={navState} />
            break
        case 11:
            ComponentToRender = <WorkExperienceHistory setNavState={setNavState} navState={navState} />
            break
        case 12:
            ComponentToRender = <AccountCreated setNavState={setNavState} navState={navState} />
            break

        default:
            return
    }
    return (
        <div className={props.modal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <div className={props.overlay} onClick={props.toggle}></div>
            <div className="flex flex-col justify-center items-center border  w-1/3 rounded py-8 px-8 text-gray-500 bg-white m-auto z-30">
                {ComponentToRender}
            </div>
        </div>
    )
};

export default SignUpProcessOfCustomer;
