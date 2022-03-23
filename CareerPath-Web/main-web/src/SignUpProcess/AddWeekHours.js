import React,{useState,useEffect} from 'react'
import Switch from 'react-switch'
import Colors from '../Colors/Colors'
import Select from "./Select/Select"
import axios from 'axios';
import ReactiveButton from 'reactive-button';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';
import { Field } from 'formik'
import moment from 'moment';


const AddWeekHours = (props) => {
    localStorage.setItem("navState",16)
    return (
        <div className="flex flex-col justify-center items-center text-gray-500 w-full">
            <img src="setHours.png" alt="setHours" className="w-56" />
            <p className="text-2xl font-bold mt-3 text-gray-700">Avaliability</p>
            <p className="text-xs mt-3 text-center">Tell us when you're free so you only receive booking request at the time you're available</p>
            <div className="w-full mt-4">
                <Weekday day={"Monday"}/>
                <Weekday day={"Tuesday"}/>
                <Weekday day={"Wednesday"}/>
                <Weekday day={"Thursday"}/>
                <Weekday day={"Friday"}/>
                <Weekday day={"Saturday"}/>
                <Weekday day={"Sunday"}/>
            </div>
            <div className="w-full flex justify-end items-center mt-4 text-white">
                <button className="py-2  px-8 rounded-lg flex" style={{ backgroundColor: Colors.blue }}
                    onClick={() => { props.setNavState(props.navState + 1) }}>
                    <p >Next</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}


const Weekday = (props) => {

    const [fields, setFields] = useState([]);
    const [checked,setChecked] = useState(false);
    const [disableAddbtn,setDisableAddBtn] = useState(true)
    const [hours,setHour] = useState("8");
    const [minutes,setMinutes] = useState("00");
    const [endhours,setHoursEnd] = useState("9");
    const [endminutes,setMinutesEnd] = useState("00");
    const [state, setState] = useState('idle');
    const hoursoptions = [
      {
        id: "00",
        label: "00",
        value: "00"
      },
      {
        id: "01",
        label: "01",
        value: "01"
      },
      {
        id: "02",
        label: "02",
        value: "02"
      },
      {
        id: "03",
        label: "03",
        value: "03"
      },
      {
        id: "04",
        label: "04",
        value: "04"
      },{
        id: "05",
        label: "05",
        value: "05"
      },{
        id: "06",
        label: "06",
        value: "06"
      },{
        id: "07",
        label: "07",
        value: "07"
      },{
        id: "08",
        label: "08",
        value: "08"
      },{
        id: "09",
        label: "09",
        value: "09"
      },{
        id: "10",
        label: "10",
        value: "10"
      },{
        id: "11",
        label: "11",
        value: "11"
      },{
        id: "12",
        label: "12",
        value: "12"
      },{
        id: "13",
        label: "13",
        value: "13"
      },{
        id: "14",
        label: "14",
        value: "14"
      },{
        id: "15",
        label: "15",
        value: "15"
      },{
        id: "16",
        label: "16",
        value: "16"
      },{
        id: "17",
        label: "17",
        value: "17"
      },{
        id: "18",
        label: "18",
        value: "18"
      },{
        id: "19",
        label: "19",
        value: "19"
      },{
        id: "20",
        label: "20",
        value: "20"
      },
      {
        id: "21",
        label: "21",
        value: "21"
      },
      {
        id: "22",
        label: "22",
        value: "22"
      },
      {
        id: "23",
        label: "23",
        value: "23"
      },

      
      
    ];
    const minutesoptions = [
      {
        id: "00",
        label: "00",
        value: "00"
      },
      {
        id: "15",
        label: "15",
        value: "15"
      },
      {
        id: "30",
        label: "30",
        value: "30"
      },
      {
        id: "45",
        label: "45",
        value: "45"
      }
    ];
   
  
    useEffect(() => {

    axios.get(process.env.REACT_APP_SERVER_PATH + `/professionals_availability`,{
        headers: {
            'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("signup_token")
        }
    }).then((response) => {
      const result_day = response.data.message;
      const values = [...fields];
      result_day.map(element => {
        if(element.day === props.day){
          setChecked(true);

          const s_hours = new Date(element.start_time * 1000).getHours() === 0 ? "00" : new Date(element.start_time * 1000).getHours();
          const s_minutes = new Date(element.start_time * 1000).getMinutes() === 0 ? "00" : new Date(element.start_time * 1000).getMinutes();
          const e_hours = new Date(element.end_time * 1000).getHours() === 0 ? "00" : new Date(element.end_time * 1000).getHours();
          const e_minutes = new Date(element.end_time * 1000).getMinutes() === 0 ? "00" : new Date(element.end_time * 1000).getMinutes();
         
          const hours = s_hours;
          const minutes = s_minutes;

          

          const endhours = e_hours ;
          const endminutes = e_minutes;


          values.push({ day:element.day,hour:hours,minute:minutes,endhour:endhours,endminute:endminutes,id:element.id,unavailable: true });
         
          
        }
      })
      setFields(values);
         
        }).catch(function (error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            alert(error.response.data.error)
            setState("idle")
            setDisableAddBtn(true)
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
      
        });
  }, [])
    
      function handleAdd() {
        const values = [...fields];
        values.push({ day:props.day,hour:"--",minute:"--",endhour:"--",endminute:"--",id:"" });
        setFields(values);
        setDisableAddBtn(false)
        setHour("");
        setMinutes("")
        setHoursEnd("")
        setMinutesEnd("")
       
      }
    
      function handleRemove(i) {
        const values = [...fields];
        let myobject = values[i];
        axios.delete(process.env.REACT_APP_SERVER_PATH + `/professionals_availability/${myobject.id}`,{
          headers: {
              'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("signup_token")
          }
      }).then((response) => {

       setState("idle")
        setDisableAddBtn(true)
           
          }).catch(function (error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              alert(error.response.data.error)
              setState("idle")
              setDisableAddBtn(true)
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
        
          });
        values.splice(i, 1);
        setFields(values);
      }

      function handleConfirm(i) {
        setState('loading');
        const time_professional = [...fields];
        let myobject = time_professional[i];
        const hour =  myobject.hour;
        const minute = myobject.minute;
        const endhour =  myobject.endhour ;
        const endminute = myobject.endminute;
          
        const d = new Date();
        const start_timestamp = d.setHours(hour,minute);
        
        const end_timestamp = d.setHours(endhour,endminute);
        
        const start_date = moment(start_timestamp).unix();

        const end_date = moment(end_timestamp).unix();
        
        const data = {
          day:myobject.day,
          start_time:start_date,
          end_time:end_date,
        }
        axios.post(process.env.REACT_APP_SERVER_PATH + `/professionals_availability`, data,{
          headers: {
              'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem("signup_token")
          }
      }).then((response) => {
        fields[i].id =response.data.message.id;
        setTimeout(() => {
          setDisableAddBtn(true);
          setState('success');
      }, 1000);
        
        
           
          }).catch(function (error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              alert(error.response.data.error)
              const time_professional = [...fields];
              time_professional.splice(i, 1);
              setFields(time_professional);
              setState("idle")
              setDisableAddBtn(true)
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
        
          });

        
      }

      
    
      function  handleChange(checked) {
       

        if(checked){
          
          axios.get(process.env.REACT_APP_SERVER_PATH + `/professionals_availability`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("signup_token")
            }
        }).then((response) => {
          const result_day = response.data.message;
          const values = [...fields];
          result_day.map(element => {
            if(element.day === props.day){

              const s_hours = new Date(element.start_time * 1000).getHours() === 0 ? "00" : new Date(element.start_time * 1000).getHours();
              const s_minutes = new Date(element.start_time * 1000).getMinutes() === 0 ? "00" : new Date(element.start_time * 1000).getMinutes();
              const e_hours = new Date(element.end_time * 1000).getHours() === 0 ? "00" : new Date(element.end_time * 1000).getHours();
              const e_minutes = new Date(element.end_time * 1000).getMinutes() === 0 ? "00" : new Date(element.end_time * 1000).getMinutes();
             
              const hours = s_hours ;
              const minutes = s_minutes;
  
              

              const endhours = e_hours ;
              const endminutes = e_minutes;
  
  
              values.push({ day:element.day,hour:hours,minute:minutes,endhour:endhours,endminute:endminutes,id:element.id,unavailable: true });
             
            
              
            }
          })
          setFields(values);
             
            }).catch(function (error) {
              if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
          
            });
        }else{
          fields.splice(0,fields.length);
        }
        
        setChecked(checked);
        setState("idle")
        setDisableAddBtn(true)
      }
     

    return (
        <>
            <div className="w-full bg-gray-100 rounded p-3 flex justify-between items-center mb-4">
                <div>
                    <p className="text-gray-800 text-lg">{props.day}</p>
                    <p className="text-gray-400 text-xs">{checked ? 'Available' : 'Unavailable'}</p>
                </div>
                <div>
                    <Switch
                        checked={checked} 
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={24}
                        width={48}
                        onColor={Colors.blue}
                        onChange={handleChange} 
                        />
                    
                </div> 
            </div>
            <div >
           
            
           {checked ? fields.map((field, idx) => {
           
             return (
               <div key={`${field}-${idx}`}>
                <div className=' w-full flex justify-center items-center m-2 '>
                   <div className='col-11'>
                   <div className='flex w-full justify-between items-center'>
                    <p className='mr-1'> Start Time:</p>
                   <div className='w-24 m-1'>
                   <Select
                           options={hoursoptions}
                           unavailable={field.unavailable?field.unavailable : false}
                           selectedOption={field.hour ? {
                             id: `${field.hour}`,
                             label: `${field.hour}`,
                             value: `${field.hour}`
                           } : hours}
                           handelChange={(event) => {
                            
                             field.hour =event.value;
                             setHour(event)
                           }}
                         />
                   </div>
                   <div className='w-24 m-1'>
                   <Select
                           options={minutesoptions}
                           unavailable={field.unavailable?field.unavailable : false}
                           selectedOption={ field.minute ? {
                             id: `${field.minute}`,
                             label: `${field.minute}`,
                             value: `${field.minute}`
                           }: minutes}
                           handelChange={(event) => {
                             field.minute = event.value;
                             setMinutes(event)
                           }}
                         />
                   </div>
                  
        
                 </div>
                 <div className='flex w-full justify-between items-center'>
                    <p className='mr-1'> End Time :</p>
                   <div className='w-24 m-1'>
                   <Select
                           options={hoursoptions}
                           unavailable={field.unavailable?field.unavailable : false}
                           selectedOption={field.endhour ? {
                             id: `${field.endhour}`,
                             label: `${field.endhour}`,
                             value: `${field.endhour}`
                           } : endhours }
                           handelChange={(event) => {
                             setHoursEnd(event)
                             field.endhour =event.value;
     
                           }}
                         />
                   </div>
                   <div className='w-24 m-1'>
                   <Select
                           options={minutesoptions}
                           unavailable={field.unavailable?field.unavailable : false}
                           selectedOption={ field.endminute ? {
                             id: `${field.endminute}`,
                             label: `${field.endminute}`,
                             value: `${field.endminute}`
                           } : endminutes}
                           handelChange={(event) => {
                             setMinutesEnd(event)
                             field.endminute =event.value;
     
                           }}
                         />
                   </div>
                  
        
                 </div> 
                   </div>
                   <div className='col-1'>
                   <button type="button" onClick={() => handleRemove(idx)}>
                   <img className='mt-10 ml-3' src="https://img.icons8.com/carbon-copy/25/000000/filled-trash.png" alt="photosf"/>
                 </button>
                   </div>
                </div>
     
                 {field.id === "" ? <div className=' w-full flex justify-center items-center py-2 '>
                 <ReactiveButton
              buttonState={state}
              onClick={() => handleConfirm(idx)}
              color={'blue'}
              idleText={'Save'}
              loadingText={'Loading'}
              successText={'Added'}
              errorText={'Error'}
              type={'button'}
              className={'flex justify-center items-center'}
              style={{ borderRadius: '5px' }}
              outline={false}
              shadow={false}
              rounded={false}
              size={'large'}
              block={false}
              messageDuration={2000}
              disabled={false}
              buttonRef={null}
              width={300}
              height={40}
              animation={true}
         />
                 </div> : null}
                 
             </div>
             );
           }) : null}
            {checked && disableAddbtn ?<div className=' w-full flex justify-center items-center py-2 '>
                 <ReactiveButton
              buttonState={state}
              onClick={() => handleAdd()}
              color={'blue'}
              idleText={'+ Add More'}
              loadingText={'Loading'}
              successText={'Added'}
              errorText={'Error'}
              type={'button'}
              className={'flex justify-center items-center'}
              style={{ borderRadius: '5px' }}
              outline={false}
              shadow={false}
              rounded={false}
              size={'large'}
              block={false}
              messageDuration={2000}
              disabled={false}
              buttonRef={null}
              width={300}
              height={40}
              animation={true}
         />
                 </div>   :null}
                 </div>
        </>
    
        
    )
}

export default AddWeekHours
