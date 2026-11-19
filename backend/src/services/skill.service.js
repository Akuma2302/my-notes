import { skillRepository } from '../repositories/skill.repository.js';
import { toSkill, toSkillGroup } from '../models/skill.model.js';
import { ApiError } from '../utils/ApiError.js';

export const skillService = {
  list: () => ({ skills: skillRepository.findAll().map(toSkill), groups: skillRepository.findGroups().map(toSkillGroup) }),

  getById(id) {
    const row = skillRepository.findById(id);
    if (!row) throw ApiError.notFound(`Topic ${id} not found`);
    return { ...toSkill(row), usedIn: skillRepository.findChaptersUsing(id) };
  }
};
