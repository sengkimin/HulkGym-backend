import { Request, Response } from "express";
import { WorkoutPlan } from "../entity/workoutPlan.entity";
import { AppDataSource } from "../config/data-source";

const workoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);

export const createWorkoutPlan = async (req: Request, res: Response) => {
  try {
    const newWorkoutPlan = workoutPlanRepository.create(req.body);
    await workoutPlanRepository.save(newWorkoutPlan);
    res.status(201).json(newWorkoutPlan);
  } catch (error) {
    res.status(500).json({ message: "Error creating workout plan" });
  }
};

export const getWorkoutPlans = async (req: Request, res: Response) => {
  try {
    const workoutPlans = await workoutPlanRepository.find();
    res.json(workoutPlans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workout plans" });
  }
};

export const getWorkoutPlanById = async (req: Request, res: Response) => {
  try {
    const workoutPlan = await workoutPlanRepository.findOneBy({ id: +req.params.id });
    if (!workoutPlan) return res.status(404).json({ message: "Workout Plan not found" });
    res.json(workoutPlan);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workout plan" });
  }
};


export const updateWorkoutPlan = async (req: Request, res: Response) => {
  try {
    await workoutPlanRepository.update(req.params.id, req.body);
    res.json({ message: "Workout Plan updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating workout plan" });
  }
};

export const deleteWorkoutPlan = async (req: Request, res: Response) => {
  try {
    await workoutPlanRepository.delete(req.params.id);
    res.json({ message: "Workout Plan deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting workout plan" });
  }
};

  