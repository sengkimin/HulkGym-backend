import { Router } from "express";
import { getBranch } from "../controllers/branch.controller";
import protectRoute from "../middleware/auth";

const router = Router();

router.post("/create", protectRoute(), getBranch);

export default router;
