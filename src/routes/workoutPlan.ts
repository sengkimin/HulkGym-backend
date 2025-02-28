import { Router } from "express";
import { createWorkoutPlan, getAllWorkoutPlan, getAllWorkoutPlanById, updateWorkoutPlan, deleteWorkoutPlan } from "../controllers/workoutPlan.controller";
import protectRoute from "../middleware/auth";

const router = Router();

router.post("/create", protectRoute(), createWorkoutPlan);
router.get("/gworkout", protectRoute(), getAllWorkoutPlan);
router.get("/ggworkout/:id", protectRoute(), getAllWorkoutPlanById);
router.patch("/uworkout/:id", protectRoute(), updateWorkoutPlan);
router.delete("/dworkout/:id", protectRoute(), deleteWorkoutPlan);


export default router;