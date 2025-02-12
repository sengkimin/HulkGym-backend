import { Router } from 'express';
import { createCompany, getAllCompanies, getCompanyById } from '../controllers/company.controller';
import protectRoute from '../middleware/auth';

const router = Router();

router.post("/company", protectRoute(), createCompany);
router.get("/gcompany", protectRoute(), getAllCompanies);
router.get("/ggcompany/:id", protectRoute(), getCompanyById);

export default router;
