import React from "react";
import AudioTrack from "./AudioTrack";
import VideoTrack from "./VideoTrack";
import { useTrack } from "use-twilio-video";

function Participant({ participant, name, flag }) {
  const { videoOn, audioOn, videoTrack, audioTrack } = useTrack({
    participant,
  });

  return (
    <div className="flex w-full rounded-lg">
      <div className="text-gray-700">
        <div className="rounded-lg">
          {videoOn ? <VideoTrack track={videoTrack} name={name} /> : flag === 0 ? <div className="rounded-xl w-72 h-48 bg-gray-600">
            <div className='absolute bg-white m-4 px-4 py-2 rounded-full'>{name}</div>
          </div> : <div style={{ width: "740px", height: "550px" }} className="bg-gray-600 rounded-xl"><div className='absolute bg-white m-4 px-4 py-2 rounded-full'>{name}</div></div>}
          <br />
          {audioOn ? <AudioTrack track={audioTrack} /> : <img src="/mute.svg" alt="audio off" className="-mt-2 w-6 h-6" />}
        </div>
      </div>
    </div >
  );
}

export default Participant;
