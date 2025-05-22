import { VideoIcon } from "lucide-react";

const VideoCallBtn = ({ handleVideoCall }) => {
  return (
    <div className=" p-3 border-b flex justify-end max-w-7xl mx-auto w-full absolute top-2 ">
      <button
        onClick={handleVideoCall}
        className="btn btn-success btn-xs text-white"
      >
        <VideoIcon className=" size-5" />
      </button>
    </div>
  );
};

export default VideoCallBtn;
