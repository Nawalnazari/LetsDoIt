interface Props {
  visible: boolean;
  title: string;
  submitLabel: string;
  formTitle: string;
  formDesc: string;
  formError: string;
  loading: boolean;
  onChangeTitle: (v: string) => void;
  onChangeDesc: (v: string) => void;
  onSubmit: () => void;
  onDismiss: () => void;
}

export default function TodoFormDialog({
  visible,
  title,
  submitLabel,
  formTitle,
  formDesc,
  formError,
  loading,
  onChangeTitle,
  onChangeDesc,
  onSubmit,
  onDismiss,
}: Props) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onDismiss} />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-slate-800">{title}</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Title *</label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => onChangeTitle(e.target.value)}
              placeholder="Task title"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Description</label>
            <textarea
              value={formDesc}
              onChange={(e) => onChangeDesc(e.target.value)}
              placeholder="Optional description"
              rows={3}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
            />
          </div>

          {formError && (
            <p className="text-sm text-error">{formError}</p>
          )}
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={onDismiss}
            className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={loading}
            className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {loading ? 'Saving...' : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
