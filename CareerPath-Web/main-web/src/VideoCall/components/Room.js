import React, { useEffect, useState } from "react";
import Participant from "./Participant";
import { useRoom } from "use-twilio-video";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import { FiCameraOff, FiCamera } from "react-icons/fi";
import { ImPhoneHangUp } from "react-icons/im";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import jwt_decode from "jwt-decode";
import Loader from "react-loader-spinner";
import Colors from "../../Colors/Colors";


const Room = ({ token, identity, roomName, onDisconnected }) => {
  const [remoteUser, setRemoteUser] = useState(null);
  const [remoteUserName, setRemoteUserName] = useState('');
  const [bookingDetails, setBookingDetails] = useState()
  const [type, setType] = useState('')
  const {
    room,
    error,
    connectRoom,
    disconnectRoom,
    localParticipant,
    remoteParticipants,
    dominantSpeaker,
    isCameraOn,
    toggleCamera,
    isMicrophoneOn,
    toggleMicrophone,
  } = useRoom();
  const { roomid } = useParams()
  let navigate = useNavigate()
  console.log(useParams())
  const setToken = () => {
    console.log(jwt_decode(localStorage.getItem('token')).type)
    setType(jwt_decode(localStorage.getItem('token')).type)

  }
  useEffect(async () => {
    if (!room && token && roomName) {
      connectRoom({
        token,
        options: { name: roomName, dominantSpeaker: true },
      });
      return () => disconnectRoom();
    }
  }, [connectRoom, disconnectRoom, room, roomName, token]);

  useEffect(() => {
    setToken()
    if (remoteParticipants.length > 0) {
      dominantUser();
    }
  }, [remoteParticipants.length]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_PATH}/bookings/${roomid}`).then((response) => {
      console.log(response.data, 'Booking Details')
      setBookingDetails(response.data)
    }).catch(e => {
      console.log("Error in Fetching Api in Video Component")
    })
  }, [])

  const dominantUser = () => {
    console.log("dominant", remoteParticipants);
    remoteParticipants.map((p) => {
      if (p?.identity != localParticipant?.identity) {
        console.log("============p========================");
        console.log(p);
        console.log("====================================");
        setRemoteUser(p);
        setRemoteUserName(p?.identity)
      } else {
      }
    });
  };

  if (error) return `Error: ${error.message}`;
  // connected
  if (room)
    return (
      <>
        <div className="flex justify-center py-10  min-h-screen">
          <div className="flex flex-col max-w-3xl">
            <div className=" rounded-2xl p-2">
              <div className="flex flex-col items-center justify-center">
                {remoteParticipants.length ? remoteUser && <Participant participant={remoteUser} flag={1} name={type === 'customer' ? bookingDetails.User?.first_name : bookingDetails.Professionals_Metadatum?.User?.first_name} /> : <Participant participant={localParticipant} flag={2} name="you" />}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                {/* <p className="text-white">{type === 'customer' ? bookingDetails.User?.first_name : bookingDetails.Professionals_Metadatum?.User?.first_name}</p> */}
              </div>
              <div className="w-full text-white flex justify-between items-center">
                <div className="flex items-center justify-center">
                  <p className="text-xs">{bookingDetails.topic}</p>
                  <p className="ml-2 text-xl">{moment(bookingDetails.booking_time * 1000).format('hh:mm A')}</p>
                </div>
                <div>
                  <button
                    className="bg-gray-500 rounded-full mx-1 p-3"
                    onClick={() => toggleMicrophone()}
                  >
                    {isMicrophoneOn ? <BiMicrophone className="w-6 h-6" /> : <BiMicrophoneOff className="w-6 h-6" />}
                  </button>
                  <button
                    className="bg-red-500 rounded-full mx-1 p-3 px-8"
                    onClick={() => {
                      disconnectRoom();
                      onDisconnected && onDisconnected();
                      navigate(`/dashboard/bookings/${roomid}`)
                    }}
                  >
                    <ImPhoneHangUp className="w-8 h-6 shadow-xl" />
                  </button>
                  <button
                    className="bg-gray-500 rounded-full mx-1 p-3"
                    onClick={() => toggleCamera()}
                  >
                    {isCameraOn ? <FiCamera className="w-6 h-6" /> : <FiCameraOff className="w-6 h-6" />}
                  </button>
                </div>

                <div className="flex items-center justify-center">
                  {!remoteParticipants.length ? <p className="text-white text-xs">Waiting for your response</p> : null}
                </div>
              </div>

            </div>
          </div>
          {remoteParticipants.length ? <div className=" py-2  flex w-1/6 max-w-2xl">
            <div className=" text-white rounded-2xl ">
              <div className="text-gray-700">
                <Participant participant={localParticipant} name="you" flag={0} />
              </div>
            </div>
          </div> : null}
        </div>
      </>
    );

  return (
    <div className="flex justify-center py-10  min-h-screen items-center">
      <Loader
        type="TailSpin"
        color={Colors.blue}
        height={300}
        width={300}
      // timeout={5000} //5 secs
      />
      {/* <div style={{ width: "740px", height: "550px" }} className="bg-gray-600 rounded-xl"></div> */}
    </div>
  );

  // return (
  //   <div className="flex justify-center py-10  min-h-screen">
  //     <div style={{ width: "740px", height: "550px" }} className="bg-gray-600 rounded-xl"></div>
  //   </div>
  // );
}

export default Room;
