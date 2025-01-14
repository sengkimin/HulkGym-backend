import { Router } from "express";
import { login, register } from "../controllers/auth";
import { checkTelegramData, telegramController } from "../controllers/telegram.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/validate", checkTelegramData);

export default router;
