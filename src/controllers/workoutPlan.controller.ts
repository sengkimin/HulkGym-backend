
import { Request, Response } from 'express';
import { AppDataSource } from '../config';
import { WorkoutPlan } from '../entity/workoutPlan.entity';

const workoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};

export const createWorkoutPlan = async (req: Request, res: Response) => {
  try {
    const workout_plan = workoutPlanRepository.create(req.body);
    const result = await workoutPlanRepository.save(workout_plan);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

export const getAllWorkoutPlan = async (_req: Request, res: Response) => {
  try {
    const workout_plan = await workoutPlanRepository.find();
    res.status(200).json(workout_plan);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const getAllWorkoutPlanById = async (req: Request, res: Response) => {
    try {
      const workout_plan = await workoutPlanRepository.findOneBy({ id: req.params.id });
      if (!workout_plan) {
        return res.status(404).json({ message: 'Workout Plan not found' });
      }
      res.status(200).json(workout_plan);
    } catch (error) {
      res.status(500).json({ error: getErrorMessage(error) });
    }
  };
  
  export const updateWorkoutPlan = async (req: Request, res: Response) => {
    try {
      const workout_plan = await workoutPlanRepository.findOneBy({ id: req.params.id });
      if (!workout_plan) {
        return res.status(404).json({ message: 'Workout plan not found' });
      }
      const updateWorkoutPlan = workoutPlanRepository.merge(workout_plan, req.body);
      const result = await workoutPlanRepository.save(updateWorkoutPlan);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: getErrorMessage(error) });
    }
  };
  
  export const deleteWorkoutPlan = async (req: Request, res: Response) => {
    try {
      const result = await workoutPlanRepository.delete(req.params.id);
      
      if (result.affected === 0) {
        return res.status(404).json({ message: 'Workout plan not found' });
      }
  
      return res.status(200).json({ message: 'Workout plan deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: getErrorMessage(error) });
    }
  };
  
  