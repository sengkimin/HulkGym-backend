import { Router } from "express";
import { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany } from "../controllers/company.controller";
import protectRoute from "../middleware/auth";

const router = Router();

router.post("/ccompany", protectRoute(), createCompany);
router.get("/gcompany", protectRoute(), getAllCompanies);
router.get("/ggcompany/:id", protectRoute(), getCompanyById);
router.patch("/ucompany/:id", protectRoute(), updateCompany);
router.delete("/dcompany/:id", protectRoute(), deleteCompany);


export default router;
