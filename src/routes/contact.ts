import { Router } from "express";
import { createContact, deleteById, getContact, getContactById, updateById } from "../controllers/contact.controller";

const router = Router();

router.post("/create", createContact);
router.get("/getAll", getContact);
router.get("/:id", getContactById);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

export default router;
