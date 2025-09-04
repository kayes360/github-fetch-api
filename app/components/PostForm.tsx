
'use client'
import React, { useState } from 'react';
import { Plus, X, Edit, Trash2 } from 'lucide-react';

interface UserPost {
  id: string;
  title: string;
  body: string;
}

interface PostFormProps {
  onAddToDraft: (post: Omit<UserPost, 'id'>) => void;
  onPublish: (post: Omit<UserPost, 'id'>) => void;
  onUpdateDraft?: (post: UserPost) => void;
  editingPost?: UserPost | null;
  onCancelEdit?: () => void;
}

export default function PostForm({ onAddToDraft, onPublish, onUpdateDraft, editingPost, onCancelEdit }: PostFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(editingPost?.title || '');
  const [body, setBody] = useState(editingPost?.body || '');

  // Open form when editing post is set
  React.useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
      setIsOpen(true);
    }
  }, [editingPost]);

  const handleSubmit = (action: 'draft' | 'publish' | 'update') => {
    if (!title.trim() || !body.trim()) return;
    
    const post = { title: title.trim(), body: body.trim() };
    
    if (action === 'update' && editingPost && onUpdateDraft) {
      onUpdateDraft({ ...editingPost, ...post });
    } else if (action === 'draft') {
      onAddToDraft(post);
    } else if (action === 'publish') {
      onPublish(post);
    }
    
    // Reset form
    setTitle('');
    setBody('');
    setIsOpen(false);
    if (onCancelEdit) onCancelEdit();
  };

  const handleClose = () => {
    setIsOpen(false);
    setTitle('');
    setBody('');
    if (onCancelEdit) onCancelEdit();
  };

  if (!isOpen && !editingPost) {
    return (
      <div className="p-6">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 text-sm font-medium"
        >
          <Plus size={16} />
          Create Post
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="border border-black bg-white">
        <div className="flex items-center justify-between p-4 border-b border-black">
          <h2 className="text-lg font-medium">
            {editingPost ? 'Edit Post' : 'Create New Post'}
          </h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black transition-colors duration-200"
              placeholder="Enter post title..."
            />
          </div>
          
          <div>
            <label htmlFor="body" className="block text-sm font-medium mb-2">
              Body
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black transition-colors duration-200 resize-none"
              placeholder="Write your post content..."
            />
          </div>
          
          <div className="flex gap-3 pt-2">
            {editingPost ? (
              <>
                <button
                  onClick={() => handleSubmit('update')}
                  disabled={!title.trim() || !body.trim()}
                  className="px-4 py-2 bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
                >
                  Update Draft
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleSubmit('draft')}
                  disabled={!title.trim() || !body.trim()}
                  className="px-4 py-2 border border-black bg-white text-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
                >
                  Add to Draft
                </button>
                <button
                  onClick={() => handleSubmit('publish')}
                  disabled={!title.trim() || !body.trim()}
                  className="px-4 py-2 bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
                >
                  Publish
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}