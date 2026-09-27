import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function AuthHeader() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={[styles.title, { color: theme.colors.primary }]}>
        LetsDoIt
      </Text>
      <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}>
        Stay organised, get things done.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 32 },
  title: { fontWeight: 'bold' },
});
