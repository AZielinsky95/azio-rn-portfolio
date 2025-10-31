import { Project } from '../features/projects/types';
import { ProjectsServicing } from './ProjectService';
import projectsData from '../data/projects.json';

export class MockProjectService implements ProjectsServicing {
  async fetchProjects(): Promise<Project[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return projectsData as Project[];
  }
}
