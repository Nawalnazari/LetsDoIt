import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Divider, FAB, Portal, Text, useTheme } from 'react-native-paper';
import TodoItem from '../../components/TodoItem';
import TodoFilterChips from '../../components/TodoFilterChips';
import TodoFormDialog from '../../components/TodoFormDialog';
import DeleteConfirmDialog from '../../components/DeleteConfirmDialog';
import { useTodoViewModel } from './useTodoViewModel';
import { Todo } from '../../types';

export default function TodoScreen() {
  const theme = useTheme();
  const vm = useTodoViewModel();

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <TodoFilterChips
        filter={vm.filter}
        todoCount={vm.todos.length}
        onFilterChange={vm.setFilter}
      />

      <FlatList
        data={vm.todos}
        keyExtractor={(item: Todo) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={() => vm.handleToggle(item.id)}
            onEdit={() => vm.openEdit(item)}
            onDelete={() => vm.setDeleteTarget(item)}
          />
        )}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={vm.refreshing} onRefresh={vm.onRefresh} />}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {vm.loading ? (
              <Text style={{ color: theme.colors.onSurfaceVariant }}>Loading...</Text>
            ) : (
              <>
                <Text variant="headlineMedium" style={styles.emptyIcon}>🎉</Text>
                <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
                  {vm.filter === 'completed' ? 'No completed tasks yet.' : 'No tasks here. Add one!'}
                </Text>
              </>
            )}
          </View>
        }
      />

      <FAB icon="plus" style={styles.fab} onPress={vm.openAdd} />

      <Portal>
        <TodoFormDialog
          visible={vm.addVisible}
          title="New Task"
          submitLabel="Add"
          formTitle={vm.formTitle}
          formDesc={vm.formDesc}
          formError={vm.formError}
          loading={vm.creating}
          onChangeTitle={vm.setFormTitle}
          onChangeDesc={vm.setFormDesc}
          onSubmit={vm.handleAdd}
          onDismiss={vm.closeAdd}
        />

        <TodoFormDialog
          visible={!!vm.editTodo}
          title="Edit Task"
          submitLabel="Save"
          formTitle={vm.formTitle}
          formDesc={vm.formDesc}
          formError={vm.formError}
          loading={vm.updating}
          onChangeTitle={vm.setFormTitle}
          onChangeDesc={vm.setFormDesc}
          onSubmit={vm.handleUpdate}
          onDismiss={vm.closeEdit}
        />

        <DeleteConfirmDialog
          visible={!!vm.deleteTarget}
          itemName={vm.deleteTarget?.title}
          onConfirm={vm.handleDelete}
          onDismiss={() => vm.setDeleteTarget(null)}
        />
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  list: { paddingBottom: 100 },
  divider: { marginHorizontal: 16 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  emptyIcon: { marginBottom: 8 },
  fab: { position: 'absolute', right: 16, bottom: 16 },
});
