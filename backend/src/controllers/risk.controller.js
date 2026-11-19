import { riskService } from '../services/risk.service.js';
import { ok, created } from '../utils/response.js';

export const riskController = {
  list: (req, res) => ok(res, riskService.list()),
  create: (req, res) => created(res, riskService.create(req.valid.body)),
  remove: (req, res) => { riskService.remove(req.valid.params.id); res.status(204).end(); }
};
