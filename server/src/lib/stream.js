import {StreamChat} from "stream-chat";

import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_PASSWD;

if (!apiKey || !apiSecret) {
  console.error("STREAM_API_KEY or STREAM_API_SECRET not found in .env file");
}

const serverClient = new StreamChat(apiKey, apiSecret);

export const upsertStreamUser = async userData => {
  try {
    await serverClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("error in upsert Stream User", error);
  }
};

export const generateStreamToken = async userId => {
  try {
    //user id as a string
    const userIdAsString = userId.toString();
    return serverClient.createToken(userIdAsString);
  } catch (error) {
    console.log("Error is generationg stream token is stram library", error);
  }
};
