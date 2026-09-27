import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  FAB,
  Portal,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import DashboardHeader from "../../components/DashboardHeader";
import ProgressCard from "../../components/ProgressCard";
import StatCard from "../../components/StatCard";
import RecentTodoCard from "../../components/RecentTodoCard";
import TodoFormDialog from "../../components/TodoFormDialog";
import { useHomeViewModel } from "./useHomeViewModel";

export default function HomeScreen() {
  const theme = useTheme();
  const vm = useHomeViewModel();

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={vm.refreshing} onRefresh={vm.onRefresh} />
        }
      >
        <DashboardHeader
          greeting={vm.greeting}
          userName={vm.user?.name ?? ""}
          initials={vm.initials}
        />

        <ProgressCard
          completed={vm.completed}
          total={vm.total}
          progress={vm.progress}
        />

        <View style={styles.statsRow}>
          <StatCard
            label="Total"
            value={vm.total}
            color={theme.colors.primary}
          />
          <StatCard
            label="Pending"
            value={vm.pending}
            color={theme.colors.error}
          />
          <StatCard label="Done" value={vm.completed} color="#4CAF50" />
        </View>

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Recent Tasks
        </Text>

        {vm.loading && !vm.todos.length ? (
          <Text
            style={{
              color: theme.colors.onSurfaceVariant,
              textAlign: "center",
              marginTop: 16,
            }}
          >
            Loading...
          </Text>
        ) : vm.todos.length === 0 ? (
          <Surface style={styles.emptyCard} elevation={1}>
            <Text
              style={{
                color: theme.colors.onSurfaceVariant,
                textAlign: "center",
              }}
            >
              No tasks yet. Tap + to add your first one!
            </Text>
          </Surface>
        ) : (
          vm.recentTodos.map((todo) => (
            <RecentTodoCard key={todo.id} todo={todo} />
          ))
        )}

        <Button
          mode="outlined"
          onPress={vm.logout}
          style={styles.logoutButton}
          icon="logout"
        >
          Log Out
        </Button>
      </ScrollView>

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
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 100 },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  sectionTitle: { marginBottom: 10, fontWeight: "600" },
  emptyCard: { borderRadius: 12, padding: 24 },
  logoutButton: { marginTop: 24 },
  fab: { position: "absolute", right: 16, bottom: 16 },
});
