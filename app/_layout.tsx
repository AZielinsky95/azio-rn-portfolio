import { Stack } from "expo-router";
import { AppDependenciesProvider } from "../src/providers/AppDependenciesProvider";
import { MockProjectService } from "../src/services/MockProjectService";

const dependencies = {
  projectService: new MockProjectService(),
};

export default function RootLayout() {
  return (
    <AppDependenciesProvider dependencies={dependencies}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AppDependenciesProvider>
  );
}