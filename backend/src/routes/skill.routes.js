import { Router } from 'express';
import { skillController } from '../controllers/skill.controller.js';
import { validate } from '../middlewares/validate.js';
import { skillIdParam } from '../validators/common.validator.js';

const router = Router();
router.get('/', skillController.list);
router.get('/:id', validate(skillIdParam, 'params'), skillController.get);
export default router;
