interface Props {
  visible: boolean;
  itemName?: string;
  onConfirm: () => void;
  onDismiss: () => void;
}

export default function DeleteConfirmDialog({ visible, itemName, onConfirm, onDismiss }: Props) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onDismiss} />
      <div className="relative bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Delete task?</h2>
        <p className="text-sm text-slate-500 mb-6">
          "{itemName}" will be permanently deleted.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onDismiss}
            className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-lg bg-error text-white text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
