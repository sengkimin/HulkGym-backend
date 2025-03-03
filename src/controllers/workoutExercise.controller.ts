import { Request, Response } from "express";
import { Exercise } from "../entity/workoutExercise.entity";
import { AppDataSource } from "../config/data-source";

const workoutExerciseRepository = AppDataSource.getRepository(Exercise);

export const createWorkoutExercise = async (req: Request, res: Response) => {
  try {
    const newWorkoutExercise = workoutExerciseRepository.create(req.body);
    await workoutExerciseRepository.save(newWorkoutExercise);
    res.status(201).json(newWorkoutExercise);
  } catch (error) {
    res.status(500).json({ message: "Error creating workout exercise" });
  }
};

export const getWorkoutExercise = async (req: Request, res: Response) => {
  try {
    const workoutExercises = await workoutExerciseRepository.find();
    res.json(workoutExercises);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workout exercise" });
  }
};

export const getWorkoutExerciseById = async (req: Request, res: Response) => {
  try {
    const workoutExercise = await workoutExerciseRepository.findOneBy({ id: +req.params.id });
    if (!workoutExercise) return res.status(404).json({ message: "Workout exercise not found" });
    res.json(workoutExercise);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workout exercise " });
  }
};


export const updateWorkoutExercise = async (req: Request, res: Response) => {
  try {
    await workoutExerciseRepository.update(req.params.id, req.body);
    res.json({ message: "workout exercise updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating workout exercise" });
  }
};

export const deleteWorkoutExercise = async (req: Request, res: Response) => {
  try {
    await workoutExerciseRepository.delete(req.params.id);
    res.json({ message: "workout exercise deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting workout exercise" });
  }
};