import { StyleSheet } from 'react-native';
import { ProgressBar, Surface, Text, useTheme } from 'react-native-paper';

interface Props {
  completed: number;
  total: number;
  progress: number;
}

export default function ProgressCard({ completed, total, progress }: Props) {
  const theme = useTheme();

  return (
    <Surface style={styles.card} elevation={1}>
      <Text variant="titleSmall" style={styles.title}>Overall Progress</Text>
      <ProgressBar progress={progress} color={theme.colors.primary} style={styles.bar} />
      <Text variant="bodySmall" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
        {completed} of {total} tasks completed
      </Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, padding: 16, marginBottom: 16 },
  title: { marginBottom: 8 },
  bar: { height: 8, borderRadius: 4 },
  label: { marginTop: 6 },
});
