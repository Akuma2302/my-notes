// Everything the app needs in one call, so the phone loads once and then works offline.
import { chapterService } from './chapter.service.js';
import { skillService } from './skill.service.js';
import { subjectService } from './subject.service.js';

export const contentService = {
  bundle() {
    const { skills, groups } = skillService.list();
    return { subjects: subjectService.list(), chapters: chapterService.list({ full: true }), skills, skillGroups: groups, clusters: chapterService.clusters() };
  }
};
