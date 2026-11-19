// All API routes, mounted under /api in app.js.
import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { contentController } from '../controllers/content.controller.js';
import { chapterController } from '../controllers/chapter.controller.js';
import chapterRoutes from './chapter.routes.js';
import skillRoutes from './skill.routes.js';
import practiceRoutes from './practice.routes.js';
import searchRoutes from './search.routes.js';
import riskRoutes from './risk.routes.js';
import subjectRoutes from './subject.routes.js';

const router = Router();
router.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
router.get('/content', asyncHandler(contentController.bundle));
router.get('/connections', asyncHandler(chapterController.connections));
router.use('/subjects', subjectRoutes);
router.use('/chapters', chapterRoutes);
router.use('/skills', skillRoutes);
router.use('/practice', practiceRoutes);
router.use('/search', searchRoutes);
router.use('/risks', riskRoutes);
export default router;
