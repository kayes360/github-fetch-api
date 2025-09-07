"use client";
import { useState } from "react";
import { UserPost } from "../types/model";
import Drafts from "./Drafts";
import PostForm from "./PostForm";

export default function PostManagement() {
  const [drafts, setDrafts] = useState<UserPost[]>([]);
  const [editingPost, setEditingPost] = useState<UserPost | null>(null);

  const [title, setTitle] = useState(editingPost?.title || "");
  const [body, setBody] = useState(editingPost?.body || "");

  const handleAddToDraft = (post: Omit<UserPost, "id">) => {
    const newDraft: UserPost = {
      ...post,
      id: Date.now().toString(),
    };
    setDrafts((prev) => [...prev, newDraft]);
  };

  const handlePublish = (post: Omit<UserPost, "id">) => {
    console.log("Publishing post:", post);
    alert("Post published successfully!");
  };

  const handleDeleteDraft = (id: string) => {
    setDrafts((prev) => prev.filter((draft) => draft.id !== id));
  };

  const handleEditDraft = (draft: UserPost) => {
    setEditingPost(draft);
  };

  const handleUpdateDraft = (updatedPost: UserPost) => {
    setDrafts((prev) =>
      prev.map((draft) => (draft.id === updatedPost.id ? updatedPost : draft))
    );
    setEditingPost(null);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  const handleSubmit = (action: "draft" | "publish" | "update") => {
    if (!title.trim() || !body.trim()) return;

    const post = { title: title.trim(), body: body.trim() };

    if (action === "update" && editingPost) {
      const updatedPost = { ...editingPost, ...post };
      setDrafts((prev) =>
        prev.map((draft) => (draft.id === updatedPost.id ? updatedPost : draft))
      );
      setEditingPost(null);
    } else if (action === "draft") {
      const newDraft: UserPost = {
        ...post,
        id: Date.now().toString(),
      };
      setDrafts((prev) => [...prev, newDraft]);
    } else if (action === "publish") {
      console.log("Publishing post:", post);
      alert("Post published successfully!");
    }
 
    setTitle("");
    setBody("");
  };

  return (
    <div className=" w-2xl bg-gray-50">
      <div className="  mx-auto">
        <PostForm
          title={title}
          body={body}
          setTitle={setTitle}
          setBody={setBody}
          onAddToDraft={handleAddToDraft}
          onPublish={handlePublish}
          onUpdateDraft={handleUpdateDraft}
          editingPost={editingPost}
          onCancelEdit={handleCancelEdit}
          onSubmit={handleSubmit}
        />
        <Drafts
          title={title}
          body={body}
          drafts={drafts}
          onDeleteDraft={handleDeleteDraft}
          onEditDraft={handleEditDraft}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
