import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement
} from "@stripe/react-stripe-js";
import Colors from "../../../Colors/Colors";
import axios from 'axios';
import Voucher from "./Voucher/Voucher";
import { pricetoDecimal } from "../../../price";
import { AddToCalendarEvent } from "react-add-to-calendar";


export default function CheckoutForm(props) {
  console.log(props, "props in checkout foam");
  const [name, setName] = useState('')
  const url_id = props.id
  console.log(props.id, "id ofprops")
  const stripe = useStripe();
  const elements = useElements();
  const [voucher, setVoucher] = useState(false)
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [coupenName, setCoupenName] = useState("");
  const [haveacoup, setHaveaCoup] = useState(true);
  const [coupremovehere, setCoupremovehere] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [aftercal, setAftercal] = useState((props.propslocationprice));
  const [coupenCaltoggler, setCoupenCaltoggler] = useState(false);
  const [subtotal, setSubtotal] = useState(props.propslocationprice);
  const [discount, setDiscount] = useState(0);
  const [discounttype, setDiscounttype] = useState("");
  const [discount_amount, setDiscountamount] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [referalInvit, setReferalInvit] = useState({
    status: true,
    message: "",
  });
  const [flag, setFlag] = useState(0);

  const AfterCalHandler = (total, Discount, subtotal, Discounttype, Discamount) => {

    // setPropslocationprice(x);
    setAftercal(total);
    setCoupenCaltoggler(true);
    setHaveaCoup(false);
    setCoupremovehere(true);
    setDiscount(Discount);
    setSubtotal(subtotal);
    setDiscounttype(Discounttype);
    setDiscountamount(Discamount);
  }

  const removeHandler = () => {

    setCoupenCaltoggler(false);
    setHaveaCoup(true);
    setCoupremovehere(false);
    setDiscount(0);
    setAftercal(props.propslocationprice);
    setDiscounttype("");
  }

  const referalCal = () => {


    let z = aftercal;
    let x = aftercal / 100;
    let y = x * 5;
    let c = aftercal - y;
    c = parseFloat(c).toFixed(2);
    setAftercal(c);

  }

  const toggleVoucher = () => {
    setVoucher(!voucher)
  }
  if (voucher) {
    document.body.classList.add('active-modal')
  }
  else {
    document.body.classList.remove('active-modal')
  }
  const coupenNameHandler = (x) => {
    setCoupenName(x);
  }



  useEffect(() => {

    axios.get(`${process.env.REACT_APP_SERVER_PATH}/isUserMakeFirstBooking/${userId}`).then(response => {
      setReferalInvit({
        status: response.data.status,
        message: response.data.message,
      })
      setFlag(1);
    }).catch(e => {
      console.log(e, 'error')
    })
  }, [])

  if (flag === 1) {
    if (referalInvit.status === false && (subtotal >= 20)) {
      referalCal();
      setFlag(0);
    }
  }
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_PATH}/professionals/${props.location.id}`).then((response) => {
      console.log(response.data, "response.data from Payments");
      setName(`${response.data.User?.first_name} ${response.data.User?.last_name}`)

    }).catch(e => {
      console.log('Error in Professional Api in Payment');
    })
  }, [])

  useEffect(async () => {
    console.log(coupenName, "coupenName");
    let objCopy = {};

    objCopy = { ...props.bookingData, coupon_code: coupenName };
    console.log(coupenName, "coupenName")
    console.log(objCopy, "objCopy");
    let token = localStorage.getItem('token')
    // token = JSON.parse(token);
    console.log(`${url_id.id} kalalalalalal`);
    const v = await axios.post(`${process.env.REACT_APP_SERVER_PATH}/professionals/${url_id}/request_call`, objCopy, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    console.log("cdsfdf")


    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'GB',
        currency: 'GBP',
        total: {
          label: 'CareerPaths Meeting',
          amount: 1099,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      // Check the availability of the Payment Request API.
      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [coupenName]);

  if (paymentRequest) {
    return <PaymentRequestButtonElement options={{ paymentRequest }} />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      // confirmParams: {
      //   // Make sure to change this to your payment completion page
      //   // return_url: "http://localhost:3000/booking-confirm",
      //   // return_url:'if_required'
      // },
      redirect: 'if_required'
    })


    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      setMessage(error.message);
    } else {
      // setMessage("An unexpected error occured.");
      props.activeStep3()
    }

    setIsLoading(false);
  };


  console.log(referalInvit.status, "referalInvit.status");
  return (
    <div>
      {voucher && (
        <Voucher
          prices={props.prices}
          Handler3={props.Handler2}
          toggle={toggleVoucher}
          overlay="overlay"
          modal="modal"
          modalcontent="modal-content"
          closeModal="close-modal"
          modalValue={voucher}
          coupenName={coupenNameHandler}
          propslocationprice={props.propslocationprice}
          AfterCalHandler={AfterCalHandler}
        />
      )}
      <form id="payment-form" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4" > Add payment Information </h1>
        <PaymentElement id="payment-element" />
        {/* {((referalInvit.status || !referalInvit.status) && subtotal <20) ?  haveacoup &&  <p className = "cursor-pointer" style = {{color: Colors.blue,marginTop:"2%" }}  onClick={toggleVoucher}>Do you have a coupon?</p> : null} */}
        {/* { haveacoup &&  <p className = "cursor-pointer" style = {{color: Colors.blue,marginTop:"2%" }}  onClick={toggleVoucher}>Do you have a coupon?</p>} */}
        {(((!referalInvit.status) && (subtotal < 20)) || ((referalInvit.status) && (subtotal >= 20)) || ((referalInvit.status) && (subtotal < 20))) ? (haveacoup && <p className="cursor-pointer" style={{ color: Colors.blue, marginTop: "2%" }} onClick={toggleVoucher}>Do you have a coupon?</p>) : null}
        {coupremovehere && <div style={{ marginTop: "4px", display: "flex", alignItems: "center" }}>
          <p className="mr-2" style={{ color: "grey" }} > Coupon  </p>
          <p className="font-bold" style={{ marginTop: "2px" }}> {coupenName}  <a className="cursor-pointer" onClick={removeHandler}>remove</a></p>
        </div>}
        <p className="appearance-none border-b-2 rounded w-full mt-2 py-3  text-gray-700 leading-tight focus:outline-none ">15 mints video call {name} </p>

        <div>
          <div className="w-full mt-3 py-1 px-1" style={{ color: 'grey', display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p> SubTotal </p>
            <p> {pricetoDecimal(subtotal)} </p>
          </div>
          {coupenCaltoggler && <div className="w-full  py-1 px-1" style={{ color: 'green', display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p> Discount coupon </p>
            <p> {pricetoDecimal(discount)} {discounttype === "percentage" ? String(discount_amount) + "%" : ""} </p>
          </div>}

          {((!referalInvit.status) && (subtotal >= 20)) ? (<div className="w-full mt-3 py-1 px-1" style={{ color: 'grey', display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p> Your Referal Discount </p>
            <p> 5% </p>
          </div>) : null}

          <div className="w-full font-bold pt-3 py-1 px-1 mt-3" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p> Total </p>
            <p> {pricetoDecimal(aftercal)} </p>
          </div>
        </div>



        <button className="text-center  text-xl p-4 w-full bg-blue-400 mt-7 rounded text-white hover:text-2xl  hover:bg-blue-500" type="submit"
          style={{ backgroundColor: Colors.blue }}
        >{
            'Submit request'
          }</button >

        {/* Show any error or success messages */}

        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}