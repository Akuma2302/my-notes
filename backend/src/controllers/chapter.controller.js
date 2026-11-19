// Controllers stay thin: read validated input, call a service, send the result.
import { chapterService } from '../services/chapter.service.js';
import { ok } from '../utils/response.js';

export const chapterController = {
  list: (req, res) => ok(res, chapterService.list(req.valid.query)),
  get: (req, res) => ok(res, chapterService.getById(req.valid.params.id)),
  connections: (req, res) => ok(res, chapterService.connections())
};
