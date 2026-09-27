import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Text, useTheme } from 'react-native-paper';
import { Filter } from '../screens/TodoScreen/useTodoViewModel';

interface Props {
  filter: Filter;
  todoCount: number;
  onFilterChange: (f: Filter) => void;
}

const FILTERS: Filter[] = ['all', 'pending', 'completed'];

export default function TodoFilterChips({ filter, todoCount, onFilterChange }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.chipRow}>
        {FILTERS.map((f) => (
          <Chip
            key={f}
            selected={filter === f}
            onPress={() => onFilterChange(f)}
            style={styles.chip}
            compact
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Chip>
        ))}
      </View>
      <Text variant="bodySmall" style={[styles.summary, { color: theme.colors.onSurfaceVariant }]}>
        {todoCount} {filter === 'all' ? 'total' : filter} task{todoCount !== 1 ? 's' : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  chipRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingTop: 12 },
  chip: {},
  summary: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 2 },
});
