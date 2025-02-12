import { Router } from 'express';
import { createBranch , getBranch , updateBranch , deleteBranch , getBranchById} from '../controllers/branch.controller';
import protectRoute from '../middleware/auth';

const router = Router();

router.post("/create", protectRoute(), createBranch);
router.get ('/all', protectRoute() , getBranch);
router.put ('/update:id', protectRoute() , updateBranch);
router.delete('/delete:id', protectRoute() , deleteBranch);
router.get ('/getby:id', protectRoute() , getBranchById)
export default router;
