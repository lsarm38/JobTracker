import { useState } from 'react';
import type { Note } from '../types/index';

interface Props {
  notes: Note[];
  onAdd: (content: string) => void;
  onDelete: (noteId: number) => void;
}

export default function NotesList({ notes, onAdd, onDelete }: Props) {
  const [content, setContent] = useState('');

  const handleAdd = () => {
    if (!content.trim()) return;
    onAdd(content.trim());
    setContent('');
  };

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 mb-3">Notes</h2>

      {/* Add note */}
      <div className="flex gap-2 mb-4">
        <input
          value={content}
          onChange={e => setContent(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Add a note..."
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Notes list */}
      {notes.length === 0 ? (
        <p className="text-sm text-gray-400">No notes yet — add one above.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map(note => (
            <li
              key={note.id}
              className="flex items-start justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
            >
              <div>
                <p className="text-sm text-gray-700">{note.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => onDelete(note.id)}
                className="text-gray-300 hover:text-red-400 text-xs ml-4 mt-0.5"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}