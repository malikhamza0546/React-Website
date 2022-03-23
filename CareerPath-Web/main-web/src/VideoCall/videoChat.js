import React, { useEffect, useState } from 'react'
import useConfig from './hooks/useConfig'
import Room from './components/Room'
import { useParams } from 'react-router-dom'
import Loader from "react-loader-spinner";
import Colors from '../Colors/Colors';

// import { useMyHook } from 'use-twilio-video'

const VideoChat = () => {
  let { name, roomid } = useParams();
  const [joined, setJoined] = useState(false)
  const {
    isLoading: configLoading,
    token,
    identity,
    roomName,
    error: configError,
    getToken
  } = useConfig();
  // back Button will not work 
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
    window.history.go(1);
  };
  useEffect(() => {
    getToken({ identity: name, roomName: roomid })
    setJoined(true)
  }, []);

  const onSubmit = (name, roomid) => {
    getToken({ identity: name, roomName: roomid })
    setJoined(true)
  }

  // Loading
  if (configLoading) return (
    <div className="flex justify-center py-10  min-h-screen items-center bg-gray-800">
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

  // error
  if (configError) return `Error: ${configError.message}`

  // Lobby
  if (!joined) {
    return (onSubmit())
  }

  return (
    <div className='bg-gray-800 w-screen h-screen'>
      <Room
        token={token}
        identity={identity}
        roomName={roomName}
        onDisconnected={() => setJoined(false)}
      />
    </div>
  )
}
export default VideoChat
