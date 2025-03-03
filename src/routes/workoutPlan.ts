import { Router } from "express";
import { createWorkoutPlan, getWorkoutPlans, getWorkoutPlanById, updateWorkoutPlan, deleteWorkoutPlan } from "../controllers/workoutPlan.controller";
import protectRoute from "../middleware/auth";

const router = Router();

router.post("/cworkout", protectRoute(), createWorkoutPlan);
router.get("/gworkout", protectRoute(), getWorkoutPlans);
router.get("/ggworkout/:id", protectRoute(), getWorkoutPlanById);
router.patch("/uworkout/:id", protectRoute(), updateWorkoutPlan);
router.delete("/dworkout/:id", protectRoute(), deleteWorkoutPlan);


export default router;