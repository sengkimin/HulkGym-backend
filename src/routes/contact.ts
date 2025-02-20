import { Router } from "express";
import { createContact, getContact, getContactById } from "../controllers/contact.controller";

const router = Router();

router.post("/create", createContact);
router.get("/getAll", getContact);
router.get("/:id", getContactById);


export default router;
