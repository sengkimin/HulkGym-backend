import { Router } from "express";
import protectRoute from "../middleware/auth";
import { createWorkoutExercise, getWorkoutExercise, getWorkoutExerciseById, updateWorkoutExercise, deleteWorkoutExercise } from "../controllers/workoutExercise.controller";

const router = Router();

router.post("/cworkoutE", protectRoute(), createWorkoutExercise);
router.get("/gworkoutE", protectRoute(), getWorkoutExercise);
router.get("/ggworkoutE/:id", protectRoute(), getWorkoutExerciseById);
router.patch("/uworkoutE/:id", protectRoute(), updateWorkoutExercise);
router.delete("/dworkoutE/:id", protectRoute(), deleteWorkoutExercise);


export default router;