import { practiceService } from '../services/practice.service.js';
import { ok } from '../utils/response.js';

export const practiceController = {
  flashcards: (req, res) => { const d = practiceService.flashcards(req.valid.query); ok(res, d, { count: d.length }); },
  quiz: (req, res) => { const d = practiceService.quiz(req.valid.query); ok(res, d, { count: d.length }); },
  cases: (req, res) => { const d = practiceService.cases(); ok(res, d, { count: d.length }); }
};
