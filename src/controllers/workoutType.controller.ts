import { Request, Response } from "express";
import { TypesOfWorkout } from "../entity/workoutType.entity";
import { AppDataSource } from "../config/data-source";

const typesOfWorkoutRepository = AppDataSource.getRepository(TypesOfWorkout);

export const createTypesOfWorkout = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    

    const newTypesOfWorkout = typesOfWorkoutRepository.create(req.body);
    await typesOfWorkoutRepository.save(newTypesOfWorkout);
    res.status(201).json(newTypesOfWorkout);
  } catch (error) {
    res.status(500).json({ message: "Error creating types of workout." });
  }
};

export const getTypesOfWorkout = async (req: Request, res: Response) => {
  try {
    const typesOfWorkout = await typesOfWorkoutRepository.find();
    res.json(typesOfWorkout);
  } catch (error) {
    res.status(500).json({ message: "Error fetching types of workout." });
  }
};

export const getTypesOfWorkoutById = async (req: Request, res: Response) => {
  try {
    const typeOfWorkout = await typesOfWorkoutRepository.findOneBy({ id: +req.params.id });
    if (!typeOfWorkout) return res.status(404).json({ message: "Type of workout not found" });
    res.json(typeOfWorkout);
  } catch (error) {
    res.status(500).json({ message: "Error fetching type of workout " });
  }
};


export const updateTypesOfWorkout = async (req: Request, res: Response) => {
  try {
    await typesOfWorkoutRepository.update(req.params.id, req.body);
    res.json({ message: "Type of workout updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating type of workout" });
  }
};

export const deleteTypesOfWorkout = async (req: Request, res: Response) => {
  try {
    await typesOfWorkoutRepository.delete(req.params.id);
    res.json({ message: "Type of workout deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting type of workout" });
  }
};

  