import { Router } from 'express';
import { subjectController } from '../controllers/subject.controller.js';
import { validate } from '../middlewares/validate.js';
import { subjectIdParam } from '../validators/common.validator.js';

const router = Router();
router.get('/', subjectController.list);
router.get('/:id', validate(subjectIdParam, 'params'), subjectController.get);
export default router;
