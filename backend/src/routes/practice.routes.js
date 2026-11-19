import { Router } from 'express';
import { practiceController } from '../controllers/practice.controller.js';
import { validate } from '../middlewares/validate.js';
import { chapterFilterQuery } from '../validators/common.validator.js';

const router = Router();
router.get('/flashcards', validate(chapterFilterQuery, 'query'), practiceController.flashcards);  // ?chapter=ch3 or ?subject=sqa
router.get('/quiz', validate(chapterFilterQuery, 'query'), practiceController.quiz);
router.get('/cases', practiceController.cases);
export default router;
