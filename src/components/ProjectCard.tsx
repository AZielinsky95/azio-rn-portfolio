import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Project } from '../features/projects/types';
import { colors, radius, spacing, typography } from '../styles/tokens';
import { PROJECT_IMAGES } from '../assets/images';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.lg * 3) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1;

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const imageSource = project.image ? PROJECT_IMAGES[project.image] : null;

  const handlePress = () => {
    router.push(`/project/${project.id}`);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { opacity: pressed ? 0.8 : 1 }
      ]}
      onPress={handlePress}
    >
      <View style={styles.content}>
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
        <Text style={styles.title} numberOfLines={1}>
          {project.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {project.description}
        </Text>
        <View style={styles.pills}>
          {project.technologies.slice(0, 2).map((tech, i) => (
            <View key={i} style={styles.pill}>
              <Text style={styles.pillText} numberOfLines={1}>{tech}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.surface,
    borderRadius: radius.large,
    marginBottom: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: spacing.sm,
  },
  iconPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D1D1D6',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 11,
    color: colors.onSurfaceSecondary,
    marginBottom: spacing.sm,
    lineHeight: 14,
  },
  pills: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: 'auto',
  },
  pill: {
    backgroundColor: colors.pill,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: radius.small,
    maxWidth: '45%',
  },
  pillText: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.pillText,
  },
});