import { Router } from 'express';
import { searchController } from '../controllers/search.controller.js';
import { validate } from '../middlewares/validate.js';
import { searchQuery } from '../validators/search.validator.js';

const router = Router();
router.get('/', validate(searchQuery, 'query'), searchController.search);      // ?q=fault
export default router;
