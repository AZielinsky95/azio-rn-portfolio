# AZIO Labs Portfolio

## Overview

This portfolio app highlights projects from my career as an Software Engineer. The app demonstrates a React Native architecture similar to my established iOS architecture.

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and tooling
- **Expo Router** - File-based routing system
- **TypeScript** - Type safety and better DX
- **Zustand** - Lightweight state management

## Architecture

The app follows a clean separation between navigation and business logic:

### Design Patterns

#### 1. **iOS-Style Dependency Injection**

Similar to SwiftUI's `@EnvironmentObject`, the app uses React Context for dependency injection:

```typescript
// AppDependencies.ts - Define the dependency container
export interface AppDependencies {
  projectService: ProjectsServicing;
}

// AppDependenciesProvider.tsx - Provide dependencies
const defaultDependencies: AppDependencies = {
  projectService: new MockProjectService(),
};

// Usage in screens
const { projectService } = useDependencies();
```

This allows easy swapping of implementations (e.g., mock vs. real API).

#### 2. **Service Layer Pattern**

Clean separation between data sources and UI:

```typescript
// Interface defines the contract
export interface ProjectsServicing {
  fetchProjects(): Promise<Project[]>;
}

// Mock implementation for development
export class MockProjectService implements ProjectsServicing {
  async fetchProjects(): Promise<Project[]> {
    return projectsData as Project[];
  }
}

// Easy to swap for real API later
export class ApiProjectService implements ProjectsServicing {
  async fetchProjects(): Promise<Project[]> {
    const response = await fetch("/api/projects");
    return response.json();
  }
}
```

#### 3. **State Management with Zustand**

Lightweight, TypeScript-friendly state management:

```typescript
interface ProjectStore {
  projects: Project[];
  selectedType: ProjectType | "all";
  loadProjects: (service: ProjectsServicing) => Promise<void>;
  setSelectedType: (type: ProjectType | "all") => void;
}

const useProjectStore = create<ProjectStore>((set) => ({
  // State and actions
}));
```

#### 4. **Design Tokens**

Centralized styling system for consistency:

```typescript
export const colors = {
  primary: "#007AFF",
  surface: "#FFFFFF",
  background: "#F2F2F7",
  // ...
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  xsmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 20,
};
```

## License

MIT
