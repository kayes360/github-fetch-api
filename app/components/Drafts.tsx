"use client";
import { Edit, Trash2 } from "lucide-react";
import { UserPost } from "../types/model";

interface DraftsProps {
  title: string;
  body: string;
  drafts: UserPost[];
  onDeleteDraft: (id: string) => void;
  onEditDraft: (draft: UserPost) => void;
  onSubmit: (action: "draft" | "publish" | "update") => void;
}

export default function Drafts({
  title,
  body,
  drafts,
  onDeleteDraft,
  onEditDraft,
  onSubmit,
}: DraftsProps) {
  if (drafts.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium mb-4">Drafts</h2>

          <button
            onClick={() => onSubmit("publish")}
            // Corrected logic: button is disabled if there are no drafts
            disabled={drafts.length === 0}
            className="px-4 py-2 bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
          >
            Publish ALL
          </button>
        </div>
        <p className="text-gray-600 text-sm">
          No drafts yet. Create a post and save it as a draft.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Drafts ({drafts.length})</h2>
        <button
          onClick={() => onSubmit("publish")}
          // Corrected logic: button is enabled if there is at least one draft
          disabled={drafts.length === 0}
          className="px-4 py-2 bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
        >
          Publish ALL
        </button>
      </div>
      <div className="space-y-3">
        {drafts.map((draft) => (
          <div key={draft.id} className="border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-black truncate">
                  {draft.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {draft.body}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEditDraft(draft)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  title="Edit draft"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDeleteDraft(draft.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200  "
                  title="Delete draft"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}