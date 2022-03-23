import React, { useEffect, useRef } from 'react'
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";

const VideoTrack = ({ track, name }) => {
  const ref = useRef()

  useEffect(() => {
    if (track) {
      const el = ref.current
      track.attach(el)

      return () => {
        track.detach(el)
      }
    }
  }, [track])
  return (<div className="flex w-full rounded-lg">
    <div className="text-gray-700">
      <div>
        <div className='absolute bg-white m-4 px-4 py-2 rounded-full'>{name}</div>
        {/* <BiMicrophone className="text-xl" /> */}
        <video width="740" height="410" style={{ maxWidth: '100%' }} ref={ref} className="rounded-lg" >
        </video>

      </div>
    </div>
  </div>)
}

export default VideoTrack
