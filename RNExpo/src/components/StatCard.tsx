import { StyleSheet } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';

interface Props {
  label: string;
  value: number;
  color: string;
}

export default function StatCard({ label, value, color }: Props) {
  const theme = useTheme();

  return (
    <Surface style={[styles.card, { borderTopColor: color, borderTopWidth: 3 }]} elevation={1}>
      <Text variant="headlineMedium" style={[styles.value, { color }]}>{value}</Text>
      <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>{label}</Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, borderRadius: 12, padding: 14, alignItems: 'center' },
  value: { fontWeight: 'bold' },
});
