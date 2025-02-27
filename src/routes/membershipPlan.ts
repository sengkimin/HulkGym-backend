import { Router } from "express";
import { } from "../controllers/contact.controller";
import { createMembershipPlan, deleteMembershipPlan, getAllMembershipPlans, getMembershipPlanById, updateMembershipPlan } from "../controllers/membershipPlan.controller";


const router = Router();

router.post("/create", createMembershipPlan);
router.get("/getAll", getAllMembershipPlans);
router.get("/:id", getMembershipPlanById); 
router.put("/:id", updateMembershipPlan);
router.delete("/:id", deleteMembershipPlan);


export default router;
