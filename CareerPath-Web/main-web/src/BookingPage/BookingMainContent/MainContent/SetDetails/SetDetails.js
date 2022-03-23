import axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';


class SetDetails extends Component {
    state = {
        selectedOption: null,
        textValue: '',
        options: [],
    };
    handleValue = (e) => {
        this.setState({
            textValue: e.target.value
        })
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    };

    handleClick=()=>{
        console.log(this.state.textValue);
        console.log(this.state.selectedOption.value);

        // this.props.nextStep()
    }
    // useEffect(() => {
    //         let token=JSON.parse(localStorage.getItem("token"))
    //         console.log(token);
    //         axios.get(`https://dev.careerpaths.io/api/professionals/2/topics_of_discussion`,{
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer '+token
    //             }  
    //         }).then((response) => {
    //             console.log(response.data.message);
    //             // setProfile(response)
    //         })
    //     }, [])
    componentDidMount() {
        let token = JSON.parse(localStorage.getItem("token"))
        console.log(token);
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/professionals/2/topics_of_discussion`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            console.log(response.data.message);
            let options=[]
            response.data.message.forEach((i) => {
                options.push({
                    value: i.topic,
                    label: i.topic
                })
            })
            this.setState({
                options
            })
        })
    }
    render() {
        const { selectedOption } = this.state;

        return (
            <div className="mt-5">
                <p className="text-2xl">Enter Details</p>
                <p className="text-sm mt-5 mb-2">Select a Topic of Conversation</p>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={this.state.options}
                    placeholder="Select Career Advice"
                />
                <p className="text-sm mt-5 mb-2">
                    What would you like to discuss in your meeting?
                </p>
                <p className="text-xs mt-5 mb-2 text-green-500">
                    2800 words remianing
                </p>
                <textarea className="resize-none border border-gray-300 rounded-md text-sm border  w-full h-36 py-3 px-3 text-gray-700  focus:outline-none" id="bio" type="text" placeholder="Write here"
                    value={this.state.textValue} onChange={(e) => this.handleValue(e)}></textarea>
                {/* <button className="w-full bg-blue-500 text-white mt-4 rounded py-2 flex justify-center items-center" onClick={this.handleClick}>Next</button> */}
            </div>
        );
    }
}

export default SetDetails
