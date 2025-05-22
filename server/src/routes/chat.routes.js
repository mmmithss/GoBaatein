import express from "express";

const router = express.Router();

import {protectRoute} from "../middlewares/auth.middleware.js";
import {getStreamToken} from "../controllers/chat.controllers.js";

router.get("/token", protectRoute, getStreamToken);

export default router;