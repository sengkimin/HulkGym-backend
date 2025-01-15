import { Router } from "express";
import { getActivity } from "../controllers/activity.controller";
import protectRoute from "../middleware/auth";

const router = Router();

router.get("/all", protectRoute(), getActivity);

export default router;
