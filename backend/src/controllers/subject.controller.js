import { subjectService } from '../services/subject.service.js';
import { ok } from '../utils/response.js';

export const subjectController = {
  list: (req, res) => ok(res, subjectService.list()),
  get: (req, res) => ok(res, subjectService.getById(req.valid.params.id))
};
