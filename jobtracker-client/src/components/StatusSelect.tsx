import type { Application } from "../types/index";

const statuses: Application["status"][] = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

interface Props {
  current: Application["status"];
  onChange: (status: Application["status"]) => void;
}

export default function StatusSelect({ current, onChange }: Props) {
  const colors: Record<Application["status"], string> = {
    Applied: "border-blue-300 bg-blue-50 text-blue-700",
    Interview: "border-yellow-300 bg-yellow-50 text-yellow-700",
    Offer: "border-green-300 bg-green-50 text-green-700",
    Rejected: "border-red-300 bg-red-50 text-red-700",
  };

  return (
    <select
      value={current}
      onChange={(e) => onChange(e.target.value as Application["status"])}
      className={`border rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${colors[current]}`}
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
