import { Router } from "express";
import { createTypesOfWorkout, getTypesOfWorkout, getTypesOfWorkoutById, updateTypesOfWorkout, deleteTypesOfWorkout } from "../controllers/workoutType.controller";
import protectRoute from "../middleware/auth";

const router = Router();

router.post("/ctypeofworkout", protectRoute(), createTypesOfWorkout);
router.get("/gtypeofworkout", protectRoute(), getTypesOfWorkout);
router.get("/ggtypeofworkout/:id", protectRoute(), getTypesOfWorkoutById);
router.patch("/utypeofworkout/:id", protectRoute(), updateTypesOfWorkout);
router.delete("/dtypeofworkout/:id", protectRoute(), deleteTypesOfWorkout);


export default router;