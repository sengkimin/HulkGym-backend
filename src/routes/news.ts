import { Router } from "express";
import protectRoute from "../middleware/auth";
import  {getAllNews, getNewsById, createNews, updateNews, deleteNews} from "../controllers/news.controller"
const router = Router();
router.get("/get",getAllNews);
router.get("/get/:id",getNewsById);
router.post("/create",protectRoute(),createNews);
router.put("/update/:id",protectRoute(),updateNews);
router.delete("/delete/:id",protectRoute(),deleteNews);




export default router;
