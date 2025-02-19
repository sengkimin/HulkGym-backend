import { Router } from "express";
import protectRoute from "../middleware/auth";
import { getPromotions,getPromotionById,createPromotion,updatePromotion,deletePromotion } from "../controllers/promotion.controller";

const router = Router();
router.get("/get",getPromotions);
router.get("/get/:id",getPromotionById);
router.post("/create",protectRoute(),createPromotion);
router.put("/update/:id",protectRoute(),updatePromotion);
router.delete("/delete/:id",protectRoute(),deletePromotion);



export default router;
