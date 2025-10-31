import { Project } from '../features/projects/types';

export interface ProjectsServicing {
  fetchProjects(): Promise<Project[]>;
}
