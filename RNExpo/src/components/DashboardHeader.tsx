import { StyleSheet, View } from 'react-native';
import { Avatar, Surface, Text, useTheme } from 'react-native-paper';

interface Props {
  greeting: string;
  userName: string;
  initials: string;
}

export default function DashboardHeader({ greeting, userName, initials }: Props) {
  const theme = useTheme();

  return (
    <Surface style={[styles.card, { backgroundColor: theme.colors.primaryContainer }]} elevation={0}>
      <View style={styles.row}>
        <View style={styles.textGroup}>
          <Text variant="titleMedium" style={{ color: theme.colors.onPrimaryContainer }}>
            {greeting},
          </Text>
          <Text variant="headlineSmall" style={[styles.name, { color: theme.colors.onPrimaryContainer }]}>
            {userName} 👋
          </Text>
        </View>
        <Avatar.Text size={48} label={initials} />
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: 20, marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center' },
  textGroup: { flex: 1 },
  name: { fontWeight: 'bold' },
});
