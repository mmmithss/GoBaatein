import {axiosInstance} from "./Axios";

export const signup = async user => {
  const res = await axiosInstance.post("/auth/signup", user);
  return res.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const onboarding = async user => {
  const res = await axiosInstance.post("/auth/onboarding", user);
  return res.data;
};

export const login = async loginData => {
  const res = await axiosInstance.post("/auth/login", loginData);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");

  return res.data;
};

export const getMyFriends = async () => {
  const res = await axiosInstance.get("/user/friends");
  return res.data;
};
export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get("/user/");
  return res.data;
};

export const getOutgoingFriendRequests = async () => {
  const res = await axiosInstance.get("/user/outgoing-friend-requests");
  return res.data;
};

export const sendFriendRequest = async id => {
  const res = await axiosInstance.post(`/user/friend-request/${id}`);
  return res.data;
};

export const getNotifications = async () => {
  const res = await axiosInstance.get("/user/friend-requests");
  return res.data;
};

export const acceptFriendRequest = async id => {
  const res = await axiosInstance.put(`/user/friend-request/${id}/accept`);
  return res.data;
};

export const getStreamToken = async () => {
  const res = await axiosInstance.get("/chat/token");
  return res.data;
};
