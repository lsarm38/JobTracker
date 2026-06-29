import type { StatusHistory } from '../types/index';

const colors: Record<string, string> = {
  Applied: 'bg-blue-500',
  Interview: 'bg-yellow-500',
  Offer: 'bg-green-500',
  Rejected: 'bg-red-500',
};

export default function StatusTimeline({ history }: { history: StatusHistory[] }) {
  if (history.length === 0) return null;

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 mb-3">Status Timeline</h2>
      <ol className="relative border-l border-gray-200 space-y-4 ml-2">
        {history.map(entry => (
          <li key={entry.id} className="ml-4">
            <div className={`absolute -left-1.5 w-3 h-3 rounded-full ${colors[entry.newStatus] ?? 'bg-gray-400'}`} />
            <p className="text-sm text-gray-700">
              <span className="font-medium">{entry.oldStatus}</span>
              {' → '}
              <span className="font-medium">{entry.newStatus}</span>
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {new Date(entry.changedAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}