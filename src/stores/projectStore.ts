import { create } from 'zustand';
import { Project, ProjectType } from '../features/projects/types';
import { ProjectsServicing } from '../services/ProjectService';

interface ProjectSection {
  title: string;
  data: Project[];
}

interface ProjectStore {
  projects: Project[];
  selectedType: ProjectType | 'all';
  sections: ProjectSection[];
  isLoading: boolean;
  error: string | null;
  setSelectedType: (type: ProjectType | 'all') => void;
  loadProjects: (service: ProjectsServicing) => Promise<void>;
  getFilteredSections: () => ProjectSection[];
}

const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  selectedType: 'all',
  sections: [],
  isLoading: false,
  error: null,

  setSelectedType: (type) => set({ selectedType: type }),

  loadProjects: async (service: ProjectsServicing) => {
    set({ isLoading: true, error: null });

    try {
      const typedProjects = await service.fetchProjects();

      // Group projects by type
      const grouped = typedProjects.reduce((acc, project) => {
        const type = project.type;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(project);
        return acc;
      }, {} as Record<ProjectType, Project[]>);

      // Create sections with proper titles
      const sections: ProjectSection[] = [];

      if (grouped['work']) {
        sections.push({
          title: 'Work',
          data: grouped['work']
        });
      }

      if (grouped['personal']) {
        sections.push({
          title: 'Personal',
          data: grouped['personal']
        });
      }

      if (grouped['open-source']) {
        sections.push({
          title: 'Open Source',
          data: grouped['open-source']
        });
      }

      set({ projects: typedProjects, sections, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to load projects', isLoading: false });
    }
  },

  getFilteredSections: () => {
    const { sections, selectedType } = get();

    if (selectedType === 'all') {
      return sections;
    }

    return sections.filter(section => {
      // Map section title back to type
      const typeMap: Record<string, ProjectType> = {
        'Work': 'work',
        'Personal': 'personal',
        'Open Source': 'open-source'
      };

      return typeMap[section.title] === selectedType;
    });
  }
}));

export default useProjectStore;