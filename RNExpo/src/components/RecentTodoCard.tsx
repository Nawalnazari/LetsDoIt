import { StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { Todo } from '../types';

interface Props {
  todo: Todo;
}

export default function RecentTodoCard({ todo }: Props) {
  const theme = useTheme();

  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content style={styles.content}>
        <View
          style={[
            styles.dot,
            { backgroundColor: todo.completed ? '#4CAF50' : theme.colors.error },
          ]}
        />
        <View style={styles.textGroup}>
          <Text
            variant="bodyMedium"
            numberOfLines={1}
            style={todo.completed ? styles.strikethrough : undefined}
          >
            {todo.title}
          </Text>
          {!!todo.description && (
            <Text
              variant="bodySmall"
              numberOfLines={1}
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {todo.description}
            </Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 8 },
  content: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  textGroup: { flex: 1 },
  strikethrough: { textDecorationLine: 'line-through', opacity: 0.5 },
});
