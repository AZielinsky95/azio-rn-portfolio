import React, { createContext, useContext } from 'react';
import { AppDependencies } from '../lib/AppDependencies';
import { MockProjectService } from '../services/MockProjectService';

const defaultDependencies: AppDependencies = {
  projectService: new MockProjectService(),
};

const DependenciesContext = createContext<AppDependencies>(defaultDependencies);

export const AppDependenciesProvider = ({
  dependencies,
  children,
}: {
  dependencies?: AppDependencies;
  children: React.ReactNode;
}) => (
  <DependenciesContext.Provider value={dependencies ?? defaultDependencies}>
    {children}
  </DependenciesContext.Provider>
);

export const useDependencies = () => useContext(DependenciesContext);
