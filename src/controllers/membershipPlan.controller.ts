import { Request, Response } from 'express';
import { AppDataSource } from "../config";
import { MembershipPlan } from '../entity/membershipPlans.entity';

// Create a membership plan
export const createMembershipPlan = async (req: Request, res: Response) => {
  try {
    const membershipPlanRepository = AppDataSource.getRepository(MembershipPlan);
    const { name, price, features } = req.body;

    const newMembershipPlan = new MembershipPlan();
    newMembershipPlan.name = name;
    newMembershipPlan.price = price;
    newMembershipPlan.features = features;

    await membershipPlanRepository.save(newMembershipPlan);
    return res.status(201).json(newMembershipPlan);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating membership plan', error });
  }
};

// Get all membership plans
export const getAllMembershipPlans = async (req: Request, res: Response) => {
  try {
    const membershipPlanRepository = AppDataSource.getRepository(MembershipPlan);
    const membershipPlans = await membershipPlanRepository.find();
    return res.status(200).json(membershipPlans);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching membership plans', error });
  }
};

// Get membership plan by ID
export const getMembershipPlanById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const membershipPlanRepository = AppDataSource.getRepository(MembershipPlan);
    const membershipPlan = await membershipPlanRepository.findOneBy({ id });

    if (!membershipPlan) {
      return res.status(404).json({ message: 'Membership plan not found' });
    }

    return res.status(200).json(membershipPlan);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching membership plan', error });
  }
};

export const updateMembershipPlan = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, price, features } = req.body;
  
      const membershipPlanRepository = AppDataSource.getRepository(MembershipPlan);
      const membershipPlan = await membershipPlanRepository.findOneBy({ id});
  
      if (!membershipPlan) {
        return res.status(404).json({ message: 'Membership plan not found' });
      }
  
      // Update the properties
      membershipPlan.name = name || membershipPlan.name;
      membershipPlan.price = price || membershipPlan.price;
      membershipPlan.features = features || membershipPlan.features;
  
   
      await membershipPlanRepository.save(membershipPlan);
      return res.status(200).json(membershipPlan);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating membership plan', error });
    }
  };
// Delete membership plan by ID
export const deleteMembershipPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const membershipPlanRepository = AppDataSource.getRepository(MembershipPlan);
    const membershipPlan = await membershipPlanRepository.findOneBy({ id });

    if (!membershipPlan) {
      return res.status(404).json({ message: 'Membership plan not found' });
    }

    await membershipPlanRepository.remove(membershipPlan);
    return res.status(200).json({ message: 'Membership plan deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting membership plan', error });
  }
};
