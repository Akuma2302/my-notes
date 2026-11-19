import { subjectRepository } from '../repositories/subject.repository.js';
import { toSubject } from '../models/subject.model.js';
import { chapterService } from './chapter.service.js';
import { ApiError } from '../utils/ApiError.js';

export const subjectService = {
  list: () => subjectRepository.findAll().map(toSubject),
  getById(id) {
    const row = subjectRepository.findById(id);
    if (!row) throw ApiError.notFound(`Subject ${id} not found`);
    return { ...toSubject(row), chapters: chapterService.list({ subject: id }) };
  }
};
