import { useDashboardViewModel } from "./useDashboardViewModel";
import TodoFormDialog from "../../components/TodoFormDialog";

export default function DashboardPage() {
  const vm = useDashboardViewModel();

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-slate-500">{vm.greeting},</p>
          <h1 className="text-xl font-bold text-slate-800">{vm.user?.name}</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
          {vm.initials}
        </div>
      </div>

      {/* Progress card */}
      <div className="bg-primary rounded-2xl p-5 text-white mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm opacity-80">Today's Progress</p>
            <p className="text-2xl font-bold mt-0.5">
              {vm.completed}/{vm.total} tasks
            </p>
          </div>
          <div className="text-3xl font-bold opacity-90">
            {vm.total > 0 ? Math.round(vm.progress * 100) : 0}%
          </div>
        </div>
        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${vm.progress * 100}%` }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total", value: vm.total, color: "text-primary" },
          { label: "Pending", value: vm.pending, color: "text-error" },
          { label: "Done", value: vm.completed, color: "text-green-600" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white rounded-xl p-3 text-center shadow-sm border border-slate-100"
          >
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent tasks */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-slate-700">Recent Tasks</h2>
        <button
          onClick={() => vm.onRefresh()}
          className="text-xs text-primary hover:underline"
        >
          Refresh
        </button>
      </div>

      {vm.loading && !vm.todos.length ? (
        <div className="text-center py-10 text-slate-400 text-sm">
          Loading...
        </div>
      ) : vm.recentTodos.length === 0 ? (
        <div className="bg-white rounded-xl p-6 text-center text-slate-400 text-sm shadow-sm border border-slate-100">
          No tasks yet. Tap + to add your first one!
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-100">
          {vm.recentTodos.map((todo) => (
            <div key={todo.id} className="flex items-center gap-3 px-4 py-3">
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  todo.completed ? "bg-green-500" : "bg-amber-400"
                }`}
              />
              <p
                className={`text-sm flex-1 truncate ${todo.completed ? "line-through text-slate-400" : "text-slate-700"}`}
              >
                {todo.title}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Logout */}
      <button
        onClick={vm.logout}
        className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Log Out
      </button>

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
    </div>
  );
}
