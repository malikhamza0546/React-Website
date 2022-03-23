import React, { useEffect, useRef } from 'react'
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";

export default function AudioTrack({ track }) {
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

  return (
    <div className="flex w-full">
      <div className="text-gray-700">
        <div className="">
          <audio ref={ref} />
        </div>
      </div>
    </div>
  )
}


