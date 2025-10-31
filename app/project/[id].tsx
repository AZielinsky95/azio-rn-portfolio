import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import useProjectStore from '../../src/stores/projectStore';
import { colors, spacing, radius } from '../../src/styles/tokens';
import { PROJECT_IMAGES } from '../../src/assets/images';

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { projects } = useProjectStore();

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Project not found</Text>
      </SafeAreaView>
    );
  }

  const imageSource = project.image ? PROJECT_IMAGES[project.image] : null;

  const handleOpenURL = () => {
    if (project.url) {
      Linking.openURL(project.url).catch(err => {
        console.error('Failed to open URL:', project.url, err);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={colors.onSurface} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon */}
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.icon}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View style={styles.iconPlaceholder} />
        )}

        {/* Title */}
        <Text style={styles.title}>{project.title}</Text>

        {/* Type Badge */}
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>
            {project.type === 'work' ? 'Work' :
             project.type === 'personal' ? 'Personal' :
             'Open Source'}
          </Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{project.description}</Text>

        {/* Technologies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technologies</Text>
          <View style={styles.pills}>
            {project.technologies.map((tech, i) => (
              <View key={i} style={styles.pill}>
                <Text style={styles.pillText}>{tech}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Link Button */}
        <Pressable
          style={({ pressed }) => [
            styles.linkButton,
            { opacity: pressed ? 0.7 : 1 }
          ]}
          onPress={handleOpenURL}
        >
          <Ionicons name="link" size={20} color={colors.surface} />
          <Text style={styles.linkButtonText}>View Project</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  icon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  iconPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#D1D1D6',
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  typeBadge: {
    backgroundColor: '#E5E5EA',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.small,
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
  typeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurface,
  },
  description: {
    fontSize: 17,
    lineHeight: 24,
    color: colors.onSurfaceSecondary,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing.md,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  pill: {
    backgroundColor: colors.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.medium,
  },
  pillText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.pillText,
  },
  linkButton: {
    backgroundColor: '#1C1C1E',
    paddingVertical: spacing.lg,
    borderRadius: radius.large,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  linkButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.surface,
  },
});
