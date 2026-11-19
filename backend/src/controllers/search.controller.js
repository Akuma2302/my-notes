import { searchService } from '../services/search.service.js';
import { ok } from '../utils/response.js';

export const searchController = {
  search: (req, res) => { const { results, total } = searchService.search(req.valid.query.q); ok(res, results, { total }); }
};
