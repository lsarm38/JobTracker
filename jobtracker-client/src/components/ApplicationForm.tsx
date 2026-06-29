import { useState } from "react";
import type { Application } from "../types";

type FormData = Omit<
  Application,
  "id" | "createdAt" | "notes" | "statusHistories"
>;

interface Props {
  initial?: FormData;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  mode?: "add" | "edit";
}

const empty: FormData = {
  company: "",
  role: "",
  status: "Applied",
  jobUrl: "",
  appliedDate: new Date().toISOString().split("T")[0],
};

export default function ApplicationForm({
  initial = empty,
  onSubmit,
  onCancel,
  mode = "add",
}: Props) {
  const [form, setForm] = useState<FormData>(initial);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">
          {mode === "edit" ? "Edit Application" : "Add Application"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="e.g. Google"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="e.g. Software Engineer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job URL
            </label>
            <input
              name="jobUrl"
              value={form.jobUrl}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Applied
            </label>
            <input
              type="date"
              name="appliedDate"
              value={form.appliedDate}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              {mode === "edit" ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
