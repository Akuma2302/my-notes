import { Router } from 'express';
import { chapterController } from '../controllers/chapter.controller.js';
import { validate } from '../middlewares/validate.js';
import { chapterIdParam, chapterListQuery } from '../validators/common.validator.js';

const router = Router();
router.get('/', validate(chapterListQuery, 'query'), chapterController.list);   // ?full=true&subject=sqa
router.get('/:id', validate(chapterIdParam, 'params'), chapterController.get);
export default router;
