import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { Promotion } from "../entity/promotion.entity";

// Get all promotions
export const getPromotions = async (req: Request, res: Response) => {
  try {
    const promotionRepository = AppDataSource.getRepository(Promotion);
    const promotions = await promotionRepository.find({
      select: ["id","title", "description", "discount_percentage", "start_date", "end_date", "image"],
    });

    return res.status(200).json({ message: "Success", promotions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

// Get a single promotion by ID
export const getPromotionById = async (req: Request, res: Response) => {
  const promotionRepository = AppDataSource.getRepository(Promotion);
  const { id } = req.params;

  try {
    const promotion = await promotionRepository.findOne({
      where: { id },
      select: ["id", "title", "description", "discount_percentage", "start_date", "end_date", "image"]
    });

    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }

    return res.status(200).json(promotion);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching promotion" });
  }
};

// Create a new promotion
export const createPromotion = async (req: Request, res: Response) => {
  try {
    const promotionRepository = AppDataSource.getRepository(Promotion);
    const { title, description, discount_percentage, start_date, end_date, image } = req.body;

    const newPromotion = promotionRepository.create({
      title,
      description,
      discount_percentage,
      start_date,
      end_date,
      image
    });

    await promotionRepository.save(newPromotion);
    return res.status(201).json({ message: "Promotion created successfully!", promotion: newPromotion });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

// Update a promotion
export const updatePromotion = async (req: Request, res: Response) => {
  const promotionRepository = AppDataSource.getRepository(Promotion);
  const { id } = req.params;

  try {
    const promotion = await promotionRepository.findOneBy({ id });

    if (!promotion) {
      return res.status(404).json({ success: false, message: "Promotion not found!" });
    }

    Object.assign(promotion, req.body);
    await promotionRepository.save(promotion);
    
    return res.status(200).json({ message: "Promotion updated successfully!", promotion });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

// Delete a promotion
export const deletePromotion = async (req: Request, res: Response) => {
  const promotionRepository = AppDataSource.getRepository(Promotion);
  const { id } = req.params;

  try {
    const promotion = await promotionRepository.findOneBy({ id });

    if (!promotion) {
      return res.status(404).json({ success: false, message: "Promotion not found!" });
    }

    await promotionRepository.remove(promotion);
    return res.status(200).json({ message: "Promotion deleted successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};