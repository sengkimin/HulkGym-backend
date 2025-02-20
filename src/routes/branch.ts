import { Router } from "express";
import { getBranch } from "../controllers/branch.controller";
import protectRoute from "../middleware/auth";

const router = Router();

router.get("/all", protectRoute(), getBranch);

export default router;
