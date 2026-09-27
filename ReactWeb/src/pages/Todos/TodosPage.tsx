import { useTodosViewModel, Filter } from "./useTodosViewModel";
import TodoItem from "../../components/TodoItem";
import TodoFormDialog from "../../components/TodoFormDialog";
import DeleteConfirmDialog from "../../components/DeleteConfirmDialog";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
];

export default function TodosPage() {
  const vm = useTodosViewModel();

  return (
    <div className="max-w-lg mx-auto">
      {/* Filter chips */}
      <div className="sticky top-0 bg-slate-50 px-4 pt-4 pb-2 z-10 flex gap-2 border-b border-slate-100">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => vm.setFilter(key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              vm.filter === key
                ? "bg-primary text-white"
                : "bg-white text-slate-500 border border-slate-200 hover:border-primary hover:text-primary"
            }`}
          >
            {label}
            {key === "all" && vm.todos.length > 0 && (
              <span
                className={`ml-1.5 text-xs ${vm.filter === "all" ? "opacity-80" : "text-slate-400"}`}
              >
                {vm.todos.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="px-4 py-3">
        {vm.loading && !vm.todos.length ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            Loading...
          </div>
        ) : vm.todos.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-slate-400">
            <span className="text-5xl mb-3">🎉</span>
            <p className="text-sm">
              {vm.filter === "completed"
                ? "No completed tasks yet."
                : "No tasks here. Add one!"}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-100">
            {vm.todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => vm.handleToggle(todo.id)}
                onEdit={() => vm.openEdit(todo)}
                onDelete={() => vm.setDeleteTarget(todo)}
              />
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={vm.openAdd}
        className="fixed right-5 bottom-20 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-primary-dark transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

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
    </div>
  );
}
