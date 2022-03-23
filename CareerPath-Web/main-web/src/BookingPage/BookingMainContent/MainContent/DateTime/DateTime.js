import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

const DateTime = (props) => {
  const [value, setValue] = useState(new Date());
  const [slots, setSlots] = useState([])

  const getSlots = async (month, year, duration = props.location.minutes) => {
    let token = localStorage.getItem('token')

    token = JSON.parse(token)

    axios.get(`${process.env.REACT_APP_SERVER_PATH}/professionals/${props.location.id}/available_slots?month=${month}&year=${year}&slot_duration=${duration}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(result => {
        console.log(props.location.id);
        console.log('slotsss', result.data.message)
        setSlots(result.data.message.availableSlots)

      })
      .catch(err => {
        console.log('err', err)
      })

  }

  // useEffect(() => {
  //   let month = value.getMonth() + 1
  //   let year = value.getFullYear()
  //   getSlots(month, year)

  // }, [])
  const setDate = (e) => {
     setValue(e)
    let month =e.getMonth() + 1
    let year = e.getFullYear()
    getSlots(month,year)
    console.log(e);
  }
  console.log(value);
  return (
    <div className="mt-5">
      <p className="text-2xl">Select a Date</p>
      <div className='flex'>
        <div className="flex justify-center items-center mt-8">
          <Calendar
            onChange={setDate}
            value={value}
            showNavigation={true}
            tileClassName="text-gray-500 text-sm hover:text-white hover:bg-blue-200 rounded-full w-12 h-12 p-4"
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
          // prevLabel={<LeftArrow/>}
          // nextLabel={<RightArrow/>}
          // selectRange={true}
          />
        </div>
        <div className=' ml-4 flex flex-wrap h-96 overflow-auto'>
          {slots === undefined ? <p className='text-3xl text-center text-blue-300'>No slots Availabe</p> : (slots.map((m) => {
            return <p className="p-3 border text-center w-full border-blue-300 rounded m-2 hover:bg-blue-300 hover:text-white">{moment.unix(m).format("hh:mm A")}</p>
          }))}
        </div>
      </div>
      {/* <button className="w-full bg-blue-500 text-white mt-4 rounded py-2 flex justify-center items-center" onClick={props.nextStep}>Next</button> */}
    </div>
  )
}

export default DateTime

