import React, { useEffect, Component, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import Done from "./Done/Done";
import { Formik, Field, Form } from "formik";
import Loader from "react-loader-spinner";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import axios from "axios";
import Select from "react-select";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import './MainContent.css';
import moment from "moment";
import "./Payments/Payment.css";
import Colors from "../../../Colors/Colors";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const MainContent = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [textBody, setTextBody] = useState("");
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [getLabels] = useState([
    "Topic information added",
    "Date and time selected",
    "Payment added",
  ]);
  const activeStep3 = () => {
    setActiveStep(3);
  };
  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const backStep = () => {
    setActiveStep(activeStep - 1);
  };

  const getSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <SetDetails
            nextStep={nextStep}
            backStep={backStep}
            activeStep={activeStep}
            location={props.location}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            date={date}
            setDate={setDate}
            textBody={textBody}
            setTextBody={setTextBody}
            timeSlot={timeSlot}
            setTimeSlot={setTimeSlot}
            topicBooking={props.topicBooking}
            setTopicBooking={props.setTopicBooking}
            dateBooking={props.dateBooking}
            setDateBooking={props.setDateBooking}
          />
        );
      case 1:
        return (
          <DateTime
            nextStep={nextStep}
            backStep={backStep}
            location={props.location}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            date={date}
            setDate={setDate}
            textBody={textBody}
            setTextBody={setTextBody}
            timeSlot={timeSlot}
            setTimeSlot={setTimeSlot}
            dateBooking={props.dateBooking}
            setDateBooking={props.setDateBooking}
            timeSlotBooking={props.timeSlotBooking}
            setTimeSlotBooking={props.setTimeSlotBooking}
          />
        );
      case 2:
        return (
          <Payments
            nextStep={nextStep}
            backStep={backStep}
            activeStep3={activeStep3}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            date={date}
            setDate={setDate}
            textBody={textBody}
            setTextBody={setTextBody}
            timeSlot={timeSlot}
            setTimeSlot={setTimeSlot}
            sessionPrice={props.location.price}
            Handler1={props.Handler}
            sessionDuration={props.location.minutes}
            dateBooking={props.dateBooking}
            setDateBooking={props.setDateBooking}
            timeSlotBooking={props.timeSlotBooking}
            setTimeSlotBooking={props.setTimeSlotBooking}
            topicBooking={props.topicBooking}
            propslocationprice={props.propslocationprice}
            location={props.location}
            id={props.id}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="w-2/3 bg-white ml-6 rounded p-6">
      <Stepper activeStep={activeStep}>
        {getLabels.map((l) => {
          return (
            <Step>
              <StepLabel>{l}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === 3 ? (
        <Done
          textBody={textBody}
          timeSlot={timeSlot}
          date={date}
          selectedOption={selectedOption}
          dateBooking={props.dateBooking}
          sessionDuration={props.location.minutes}
        />
      ) : (
        <>
          {getSteps(activeStep)}
          {/* <div className="flex justify-between w-full mt-5">
                        <button className="text-white px-3 py-2 bg-blue-400 rounded"
                            disabled={activeStep === 0} onClick={backStep}>Back</button>
                        <button className="text-white px-3 py-2 bg-blue-400 ml-4 rounded" onClick={nextStep}>
                            {activeStep === 2 ? 'Finish' : 'Next'}
                        </button>
                    </div> */}
        </>
      )}
    </div>
  );
};

export default MainContent;

class SetDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      options: [],
      remainingWords: 280,
      textColorTextArea: false,
    };
  }
  handleValue = (e) => {
    this.setState({
      remainingWords: 280 - e.target.value.length,
    });
    if (this.state.remainingWords < 12) {
      this.setState({ textColorTextArea: true });
    }
    this.props.setTextBody(e.target.value);
  };
  handleChange = (selectedOption) => {
    this.props.setSelectedOption(selectedOption);
    this.props.setTopicBooking(selectedOption);
    this.setState({ selectedOption });
  };

  handleClick = () => {
    // console.log(this.state.textBody);
    // console.log(this.state.selectedOption.value);
    // this.props.nextStep()
  };
  componentDidMount() {
    this.setState({
      selectedOption: this.props.selectedOption,
      textBody: this.state.textBody,
    });
    let token = localStorage.getItem("token");
    axios
      .get(
        `${process.env.REACT_APP_SERVER_PATH}/professionals/${this.props.location.id}/topics_of_discussion`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        let options = [];
        response.data.message.forEach((i) => {
          options.push({
            value: i.id,
            label: i.topic,
          });
        });
        this.setState({
          options: options,
        });
      });
  }
  nextStep = () => {
    if (this.state.selectedOption !== null && this.props.textBody) {
      this.props.nextStep();
    }
  };

  render() {
    return (
      <div className="mt-5">
        <p className="text-2xl font-bold">Enter details</p>
        <p className="text-sm mt-5 mb-2">Select a topic of conversation</p>
        <Select
          value={this.props.selectedOption}
          onChange={this.handleChange}
          options={this.state.options}
          placeholder="Please select an industry"
        />
        <p className="text-sm mt-5 mb-2">
          What would you like to discuss in your meeting?
        </p>
        <textarea
          className="resize-none border-gray-300 rounded-md text-sm border  w-full h-36 py-3 px-3 text-gray-700  focus:outline-none"
          id="bio"
          type="text"
          placeholder="Write here"
          value={this.props.textBody}
          maxLength={280}
          onChange={(e) => this.handleValue(e)}
        ></textarea>
        <p
          style={{ color: this.state.textColorTextArea ? "red" : "grey" }}
          className="text-xs mt-5 mb-2"
        >
          {this.state.remainingWords} words remianing
        </p>
        <div className="flex justify-between w-full mt-5">
          <button
            className="text-white px-3 py-2 rounded"
            style={{ backgroundColor: Colors.blue }}
            disabled={this.props.activeStep === 0}
            onClick={this.props.backStep}
          >
            Back
          </button>
          <button
            className="text-white px-3 py-2 ml-4 rounded"
            style={{ backgroundColor: Colors.blue }}
            onClick={this.nextStep}
          >
            {this.props.activeStep === 2 ? "Finish" : "Next"}
          </button>
        </div>
        {/* <button className="w-full bg-blue-500 text-white mt-4 rounded py-2 flex justify-center items-center" onClick={this.handleClick}>Next</button> */}
      </div>
    );
  }
}

// export default SetDetails 

const DateTime = (props) => {
  const [value, setValue] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotcolor, setSlotcolor] = useState(null);
  const [dictionary, setDictionary] = useState({})
  const [availableDates, setAvailableDates] = useState([])

  const makeDic = async (available_slots, month, e) => {
    let dictionary = {};
    let value = e;
    for (const time of available_slots) {
      const dateTime = moment(time * 1000);
      if (dateTime.month() === month - 1) {
        const time = dateTime.format("LT");
        const date = dateTime.format("DD-MM-YYYY");
        if (dictionary[date]) dictionary[date].push(time);
        else dictionary[date] = [time];
      }
    }
    setDictionary(dictionary)
    setAvailableDates(Object.keys(dictionary))
    console.log(Object.keys(dictionary), "Object.keys(dictionary)")
    for (let i in dictionary) {
      if (value !== undefined) {
        if (
          i ===
          `${moment(value).format("DD").toString()}-${moment(value)
            .format("MM")
            .toString()}-${value.getFullYear().toString()}`
        ) {
          console.log(dictionary[i], 'dictionary[i]')
          setSlots(dictionary[i]);
        }
      }
    }
  };


  console.log(availableDates, "dictionary from dictionary")
  console.log(slots, 'slotsssss')
  const getSlots = (month, year, e) => {
    let token = localStorage.getItem("token");
    let duration = props.location.minutes;
    token = token;

    axios
      .get(
        `${process.env.REACT_APP_SERVER_PATH}/professionals/${props.location.id}/available_slots?month=${month}&year=${year}&slot_duration=${duration}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        if (
          result &&
          result.data &&
          result.data.message &&
          result.data.message.availableSlots
        ) {
          makeDic(result.data.message.availableSlots, month, e);
        }

        //  setSlots(result.data.message.availableSlots)
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    setValue(props.date);
    setTimeSlot(props.timeSlot);
    setDate(value)
  }, [value]);
  const handleTimeSlot = (m) => {
    setTimeSlot(m);
    props.setTimeSlot(m);
    props.setTimeSlotBooking(m);
    setSlotcolor(m);
    // props.nextStep()
  };
  const setDate = (e) => {
    console.log(e, "e from date component")
    props.setTimeSlotBooking('');
    setSlotcolor(null)
    setValue(e);
    props.setDateBooking(e);
    let month = e.getMonth() + 1;
    let year = e.getFullYear();
    getSlots(month, year, e);
  };

  return (
    <div className="my-5">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center items-center h-96">
          <p className="text-2xl font-bold">Select a date</p>
          <div className="calender">
            <Calendar
              onChange={setDate}
              value={value}
              onClickDay={({ action }) => {
                console.log('action')
              }}
              showNavigation={true}
              tileClassName={({ date, view, activeStartDate }) => {
                if (availableDates.find(x => x === moment(date, view).format("DD-MM-YYYY"))) {
                  return 'text-blue-300 font-bold focus:text-white w-12 h-12 rounded-full'
                } else {
                  return 'text-gray-400 font-bold bg-white w-12 h-12 rounded-full'
                }
              }}
              tileDisabled={({ date, view, activeStartDate }) => {
                if (availableDates.find(x => x === moment(date, view).format("DD-MM-YYYY"))) {
                  return false
                } else {
                  return true
                }
              }}

              onActiveStartDateChange={({ action, activeStartDate, value, view }) => {
                console.log(action, activeStartDate, value, view, "action, activeStartDate, value, view")
                setDate(activeStartDate)
              }}
              selectRange={false}
              showNeighboringMonth={false}
              next2Label={null}
              prev2Label={null}
              className='border-2 border-blue-300 rounded-lg p-2'
            />
          </div>
        </div>
        {/* <h1 style = {{borderWidth:"1px"}} className = "flex-"> Select your Time </h1> */}
        <div className=" ml-4 flex flex-col items-center h-96 overflow-auto w-full">
          <p className="text-2xl font-bold mt-2">Select a time</p>
          {slots.length < 0 === null
            ? null
            : slots.map((m) => {
              return (
                <p
                  key={m}
                  className="cursor-pointer p-3 border-2 text-center bg-white border-blue-300 font-bold rounded-full  mb-2 w-full"
                  style={{
                    backgroundColor: slotcolor === m ? Colors.blue : null,
                    color: slotcolor === m ? 'white' : 'black'
                  }}
                  onClick={() => handleTimeSlot(m)}
                >
                  {m}
                </p>
              );
            })}
        </div>
      </div>
      <div className="flex justify-between w-full mt-5">
        <button
          className="text-white px-3 py-2 bg-blue-400 rounded"
          style={{ backgroundColor: Colors.blue }}
          disabled={props.activeStep === 0}
          onClick={props.backStep}
        >
          Back
        </button>
        <button
          className="text-white px-3 py-2 bg-blue-400 ml-4 rounded"
          style={{ backgroundColor: Colors.blue }}
          onClick={props.timeSlotBooking !== '' ? props.nextStep : null}
        >
          {props.activeStep === 2 ? "Finish" : "Next"}
        </button>
      </div>
      {/* <button className="w-full bg-blue-500 text-white mt-4 rounded py-2 flex justify-center items-center" onClick={props.nextStep}>Next</button> */}
    </div>
  );
};

//   export default DateTime

const Payments = (props) => {
  const [modal, setModal] = useState(false);
  const [applePay, setApplePay] = useState(false);
  const [googlePay, setGooglePay] = useState(false);
  const [card, setCard] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [paymentIntent, setPaymentIntent] = useState("");
  const combineDateAndTime = function (date, time12h) {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    let finalDate = new Date(date);

    let timeString = hours + ":" + minutes + ":00";

    let year = finalDate.getFullYear();
    let month = finalDate.getMonth() + 1; // Jan is 0, dec is 11
    let day = finalDate.getDate();
    let dateString = "" + year + "-" + month + "-" + day;
    let combined = new Date(dateString + " " + timeString);
    return combined.getTime() / 1000;
  };

  const bookingDetail = {
    topic_id: props.topicBooking.value,
    notes: props.textBody,
    session_duration: props.sessionDuration,
    booking_time: combineDateAndTime(props.dateBooking, props.timeSlotBooking),
    use_wallet: false,
    coupon_code: null,
    payment_intent: paymentIntent,
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    let userEmail = localStorage.getItem("email");

    token = token;
    userEmail = JSON.parse(userEmail);
    const data = {
      email: userEmail,
      amount: props.sessionPrice,
    };

    axios.post(`${process.env.REACT_APP_SERVER_PATH}/stripe-payment-sheet`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((result) => {
        const { paymentIntent } = result.data;
        setPaymentIntent(paymentIntent);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret: paymentIntent,
    appearance,
  };

  const handleApplePay = () => {
    setApplePay(!applePay);
    setGooglePay(false);
    setCard(false);
  };

  const handleGooglePay = () => {
    setApplePay(false);
    setGooglePay(!googlePay);
    setCard(false);
  };
  const handleCard = () => {
    setApplePay(false);
    setGooglePay(false);
    setCard(!card);
  };

  const toggle = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center w-full mt-6">
          <Loader
            type="TailSpin"
            color={Colors.blue}
            height={200}
            width={200}
            timeout={5000} //5 secs
          />
        </div>
      ) : (
        <div style={{ marginTop: 30 }}>
          {paymentIntent && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm
                bookingData={bookingDetail}
                activeStep3={props.activeStep3}
                Handler2={props.Handler1}
                propslocationprice={props.propslocationprice}
                location={props.location}
                id={props.id}
              />
            </Elements>
          )}
        </div>
      )}
    </div>
  );
};

// export default Payments
