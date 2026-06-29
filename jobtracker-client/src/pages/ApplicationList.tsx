import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getApplications,
  createApplication,
  deleteApplication,
} from "../api/applications";
import type { Application } from "../types";
import StatusBadge from "../components/StatusBadge";
import ApplicationForm from "../components/ApplicationForm";

export default function ApplicationList() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      console.error("Failed to fetch applications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleCreate = async (
    formData: Omit<
      Application,
      "id" | "createdAt" | "notes" | "statusHistories"
    >,
  ) => {
    try {
      await createApplication(formData);
      setShowForm(false);
      fetchApplications();
    } catch (err) {
      console.error("Failed to create application", err);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!confirm("Delete this application?")) return;
    try {
      await deleteApplication(id);
      setApplications((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Failed to delete application", err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Applications</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
        >
          + Add Application
        </button>
      </div>

      {/* Empty state */}
      {applications.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No applications yet</p>
          <p className="text-sm mt-1">Click "Add Application" to get started</p>
        </div>
      ) : (
        /* Table */
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Company
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Role
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Date Applied
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => navigate(`/applications/${app.id}`)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {app.company}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{app.role}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(app.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={(e) => handleDelete(e, app.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <ApplicationForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
