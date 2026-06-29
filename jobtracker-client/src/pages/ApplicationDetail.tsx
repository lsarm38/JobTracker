import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApplication, updateApplication } from '../api/applications';
import { createNote, deleteNote } from '../api/notes';
import type { Application } from '../types/index';
import StatusSelect from '../components/StatusSelect';
import NotesList from '../components/NotesList';
import StatusTimeline from '../components/StatusTimeline';

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchApp = async () => {
    try {
      const data = await getApplication(Number(id));
      setApp(data);
    } catch {
      navigate('/applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApp();
  }, [id]);

  const handleStatusChange = async (status: Application['status']) => {
    if (!app) return;
    setSaving(true);
    try {
      await updateApplication(app.id, { ...app, status });
      await fetchApp();
    } finally {
      setSaving(false);
    }
  };

  const handleAddNote = async (content: string) => {
    if (!app) return;
    await createNote(app.id, content);
    await fetchApp();
  };

  const handleDeleteNote = async (noteId: number) => {
  if (!app) return;
  await deleteNote(app.id, noteId);
  setApp(prev => {
    if (!prev) return prev;
    return { ...prev, notes: prev.notes.filter(n => n.id !== noteId) };
  });
};

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!app) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/applications')}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back to Applications
      </button>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">{app.company}</h1>
            <p className="text-gray-500 mt-1">{app.role}</p>
          </div>
          <div className="flex items-center gap-2">
            {saving && <span className="text-xs text-gray-400">Saving...</span>}
            <StatusSelect current={app.status} onChange={handleStatusChange} />
          </div>
        </div>

        <div className="flex gap-6 text-sm text-gray-500 pt-2 border-t border-gray-100">
          <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
          {app.jobUrl && (
            <a
              href={app.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Job Posting →
            </a>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <NotesList
          notes={app.notes}
          onAdd={handleAddNote}
          onDelete={handleDeleteNote}
        />
      </div>

      {/* Timeline */}
      {app.statusHistories.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <StatusTimeline history={app.statusHistories} />
        </div>
      )}
    </div>
  );
}