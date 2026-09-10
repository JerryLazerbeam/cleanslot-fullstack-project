import type { QuickAction } from "./adminTypes";

type Props = {
  actions: QuickAction[];
};

function QuickActions({ actions }: Props) {
  return (
    <div className="mx-4 mt-8">
      <h2 className="mb-4 text-lg font-semibold">Snabbåtgärder</h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="border border-gray-300 rounded-lg p-4 hover:bg-gray-100"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;