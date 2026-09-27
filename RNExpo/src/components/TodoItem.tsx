import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Checkbox, IconButton, Menu, Text, Surface } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Surface style={styles.container} elevation={0}>
      <TouchableOpacity onPress={onToggle} style={styles.checkboxArea}>
        <Checkbox
          status={todo.completed ? 'checked' : 'unchecked'}
          onPress={onToggle}
          color={theme.colors.primary}
        />
      </TouchableOpacity>

      <View style={styles.textArea}>
        <Text
          variant="bodyLarge"
          numberOfLines={2}
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

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <IconButton icon="dots-vertical" onPress={() => setMenuVisible(true)} size={20} />
        }
      >
        <Menu.Item
          leadingIcon="pencil"
          onPress={() => { setMenuVisible(false); onEdit(); }}
          title="Edit"
        />
        <Menu.Item
          leadingIcon="delete"
          onPress={() => { setMenuVisible(false); onDelete(); }}
          title="Delete"
          titleStyle={{ color: theme.colors.error }}
        />
      </Menu>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  checkboxArea: { marginRight: 4 },
  textArea: { flex: 1 },
  strikethrough: { textDecorationLine: 'line-through', opacity: 0.5 },
});
