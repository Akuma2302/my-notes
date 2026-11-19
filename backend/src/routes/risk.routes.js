import { Router } from 'express';
import { riskController } from '../controllers/risk.controller.js';
import { validate } from '../middlewares/validate.js';
import { createRiskBody, riskIdParam } from '../validators/risk.validator.js';

const router = Router();
router.get('/', riskController.list);
router.post('/', validate(createRiskBody), riskController.create);
router.delete('/:id', validate(riskIdParam, 'params'), riskController.remove);
export default router;
