import React, { useEffect } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  View,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProjectCard from '../src/components/ProjectCard';
import useProjectStore from '../src/stores/projectStore';
import { colors, spacing, typography } from '../src/styles/tokens';
import { ProjectType } from '../src/features/projects/types';
import { useDependencies } from '../src/providers/AppDependenciesProvider';

const filterOptions: Array<{ label: string; value: ProjectType | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Work', value: 'work' },
  { label: 'Personal', value: 'personal' },
  { label: 'Open Source', value: 'open-source' },
];

export default function PortfolioScreen() {
  const { projectService } = useDependencies();
  const { loadProjects, getFilteredSections, selectedType, setSelectedType } = useProjectStore();

  useEffect(() => {
    loadProjects(projectService);
  }, []);

  const sections = getFilteredSections();

  // Flatten sections for FlatList with section headers
  const flatData = sections.reduce((acc, section) => {
    acc.push({ type: 'header', title: section.title });
    section.data.forEach((item, index) => {
      acc.push({ type: 'item', data: item, index });
    });
    return acc;
  }, [] as any[]);

  const renderItem = ({ item }: any) => {
    if (item.type === 'header') {
      return (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
        </View>
      );
    }
    if (item.index % 2 === 0) {
      // Left column item - find the next item for right column
      const nextIndex = flatData.indexOf(item) + 1;
      const nextItem = flatData[nextIndex];
      const hasNext = nextItem && nextItem.type === 'item';

      return (
        <View style={styles.row}>
          <ProjectCard project={item.data} />
          {hasNext ? <ProjectCard project={nextItem.data} /> : <View style={styles.spacer} />}
        </View>
      );
    }
    return null; // Skip odd-indexed items as they're rendered with even items
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Large iOS-style Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.largeTitle}>AZIO Labs</Text>
          <Text style={styles.subtitle}>Portfolio</Text>
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {filterOptions.map(option => (
            <Pressable
              key={option.value}
              style={[
                styles.filterChip,
                selectedType === option.value && styles.filterChipActive
              ]}
              onPress={() => setSelectedType(option.value)}
            >
              <Text style={[
                styles.filterText,
                selectedType === option.value && styles.filterTextActive
              ]}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={flatData.filter((item) =>
          item.type === 'header' || (item.type === 'item' && item.index % 2 === 0)
        )}
        renderItem={renderItem}
        keyExtractor={(item) =>
          item.type === 'header' ? `header-${item.title}` : `item-${item.data.id}`
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    borderBottomWidth: 2,
    borderBottomColor: colors.surface,
  },
  headerContent: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  largeTitle: {
    fontSize: 42,
    fontWeight: '700',
    color: colors.onSurface,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.onSurfaceSecondary,
    marginBottom: spacing.lg,
  },
  filterContainer: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingBottom: spacing.md,
  },
  filterChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: '#E5E5EA',
    borderRadius: 100,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#1C1C1E',
  },
  filterText: {
    ...typography.body,
    color: colors.onSurface,
    fontWeight: '500',
  },
  filterTextActive: {
    color: colors.surface,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  sectionHeader: {
    width: '100%',
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spacer: {
    width: (Dimensions.get('window').width - spacing.lg * 3) / 2,
  },
});