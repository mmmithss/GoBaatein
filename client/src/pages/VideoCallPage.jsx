import React, { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {} from "stream-chat";
import {} from "stream-chat-react";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { getStreamToken } from "../lib/api";
import PageLoading from "../components/PageLoading";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "../index.css";

const VideoCallPage = () => {
  const apiKey = import.meta.env.VITE_STREAM_API_KEY;
  const { authUser } = useAuthUser();
  const { id: vidCallId } = useParams();
  const { data: streamToken } = useQuery({
    queryKey: ["streamToken"],
    queryFn: () => getStreamToken(vidCallId),
    enabled: !!authUser,
  });

  const [vidCallInstance, setVidCallInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [vidCallClient, setVidCallClient] = useState(null);

  useEffect(() => {
    const initVidCall = async () => {
      if (!streamToken || !authUser || !vidCallId) return;
      try {
        console.log("initializing video call client");
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const client = new StreamVideoClient({
          apiKey: apiKey,
          user: user,
          token: streamToken,
        });

        const call = client.call("default", vidCallId);
        await call.join({ create: true });

        console.log("video call initialized successfully");
        setVidCallClient(client);
        setVidCallInstance(call);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    initVidCall();
  }, [authUser, streamToken, vidCallId]);
  console.log(vidCallInstance);
  console.log(vidCallClient);

  if (isLoading || !vidCallInstance || !vidCallClient) return <PageLoading />;

  return (
    <StreamVideo client={vidCallClient}>
      <StreamCall call={vidCallInstance}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
};

const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default VideoCallPage;
