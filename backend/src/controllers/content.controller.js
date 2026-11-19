import { contentService } from '../services/content.service.js';
import { ok } from '../utils/response.js';

export const contentController = {
  bundle: (req, res) => ok(res, contentService.bundle())
};
