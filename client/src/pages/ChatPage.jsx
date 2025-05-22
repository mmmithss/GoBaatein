import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import { StreamChat } from "stream-chat";
import ChatLoader from "../components/ChatLoader";

import "stream-chat-react/css/v2/index.css";
import "../index.css";
import VideoCallBtn from "../components/VideoCallBtn";
import toast from "react-hot-toast";
const ChatPage = () => {
  const { id: friendID } = useParams();
  const { authUser } = useAuthUser();
  const { data: streamToken } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    //do this only after authUser is available
    enabled: !!authUser, //using !! to convert authUser to boolean
  });
  const apiKey = import.meta.env.VITE_STREAM_API_KEY;

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect");
    const initializeChat = async () => {
      if (!streamToken || !authUser) return;

      try {
        console.log("initialializing chat client");
        const client = StreamChat.getInstance(apiKey);
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          streamToken
        );

        const channelId = [authUser._id, friendID].sort().join("-");

        const msgchannel = client.channel("messaging", channelId, {
          members: [authUser._id, friendID],
        });

        await msgchannel.watch();

        setChatClient(client);
        setChannel(msgchannel);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [streamToken, authUser, friendID]);
  console.log(chatClient);
  console.log(channel);
  console.log(isLoading);
  const handleVideoCall = async () => {
    if (channel) {
      const videoCallurl = `${window.location.origin}/video-call/${channel.id}`;

      channel.sendMessage({
        Text: `Video call started, click the link to join Link: ${videoCallurl}`,
      });

      toast.success("Video call link sent");
    }
  };
  if (isLoading || !chatClient || !channel) return <ChatLoader />;
  return (
    <div className=" h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className=" w-full relative">
            <VideoCallBtn handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
