import express from "express";

const router = express.Router();

import {protectRoute} from "../middlewares/auth.middleware.js";
import {
  getRecommendedUsers,
  getMyFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  getOngoingFriendRequests,
  deleteAccount
} from "../controllers/user.controllers.js";

//using auth middleware to protect the routes
router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOngoingFriendRequests);

router.delete("/delete-account", deleteAccount);

export default router;