export type ProjectType = "personal" | "work" | "open-source";

export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  type: ProjectType;
  technologies: string[];
  image?: string;
}