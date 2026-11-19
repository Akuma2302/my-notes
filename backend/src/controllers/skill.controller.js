import { skillService } from '../services/skill.service.js';
import { ok } from '../utils/response.js';

export const skillController = {
  list: (req, res) => ok(res, skillService.list()),
  get: (req, res) => ok(res, skillService.getById(req.valid.params.id))
};
