import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { News } from "../entity/news.entity";

// Get all news
export const getAllNews = async (req: Request, res: Response) => {
  try {
    const newsRepository = AppDataSource.getRepository(News);
    const newsList = await newsRepository.find({
      select: ["id", "title", "description", "location", "start_date", "end_date", "image"],
    });

    return res.status(200).json({ message: "Success", news: newsList });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

// Get a single news item by ID
export const getNewsById = async (req: Request, res: Response) => {
  const newsRepository = AppDataSource.getRepository(News);
  const { id } = req.params;

  try {
    const news = await newsRepository.findOne({
      where: { id },
      select: ["id", "title", "description", "location", "start_date", "end_date", "image"]
    });

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    return res.status(200).json(news);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching news" });
  }
};

// Create a new news item
export const createNews = async (req: Request, res: Response) => {
  try {
    const newsRepository = AppDataSource.getRepository(News);
    const { title, description, location, start_date, end_date, image } = req.body;

    const newNews = newsRepository.create({
      title,
      description,
      location,
      start_date,
      end_date,
      image
    });

    await newsRepository.save(newNews);
    return res.status(201).json({ message: "News created successfully!", news: newNews });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

// Update a news item
export const updateNews = async (req: Request, res: Response) => {
  const newsRepository = AppDataSource.getRepository(News);
  const { id } = req.params;
  const { title, description, location, start_date, end_date, image } = req.body;

  try {
    const news = await newsRepository.findOne({ where: { id } });

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    news.title = title || news.title;
    news.description = description || news.description;
    news.location = location || news.location;
    news.start_date = start_date || news.start_date;
    news.end_date = end_date || news.end_date;
    news.image = image || news.image;

    await newsRepository.save(news);
    return res.status(200).json({ message: "News updated successfully!", news });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

// Delete a news item
export const deleteNews = async (req: Request, res: Response) => {
  const newsRepository = AppDataSource.getRepository(News);
  const { id } = req.params;

  try {
    const news = await newsRepository.findOne({ where: { id } });

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    await newsRepository.remove(news);
    return res.status(200).json({ message: "News deleted successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
