import { riskRepository } from '../repositories/risk.repository.js';
import { toRisk } from '../models/risk.model.js';
import { ApiError } from '../utils/ApiError.js';

export const riskService = {
  // Biggest exposure first, as the Ch 10 risk table says.
  list: () => riskRepository.findAll().map(toRisk).sort((a, b) => b.exposure - a.exposure),
  create: input => toRisk(riskRepository.create(input)),
  remove(id) {
    if (!riskRepository.remove(id)) throw ApiError.notFound(`Risk ${id} not found`);
  }
};
