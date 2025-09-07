"use client";
import { useEffect, useState } from "react";
import { UserPost } from "../types/model";
import Drafts from "./Drafts";
import PostForm from "./PostForm";
import { publishFileToGitHub } from "@/lib/github";
function Alert({
  type,
  message,
  onClose,
}: {
  type: "success" | "error" | "info" | "warning";
  message: string;
  onClose: () => void;
}) {
  const styles: Record<string, string> = {
    success: "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400",
    error: "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400",
    info: "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400",
    warning:
      "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
  };

  // Auto-dismiss after 5s
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer); // cleanup
  }, [onClose]);

  return (
    <div
      className={`flex items-center p-4 mb-4 rounded-lg ${styles[type]}`}
      role="alert"
    >
      <svg className="shrink-0 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 
        1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 
        1 0 0 1 0-2h1v-3H8a1 
        1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 
        1 0 0 1 0 2Z"
        />
      </svg>
      <div className="ms-3 text-sm font-medium">{message}</div>
      <button
        type="button"
        onClick={onClose}
        className="ms-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:opacity-70"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}

export default function PostManagement() {
  const [drafts, setDrafts] = useState<UserPost[]>([]);
  const [editingPost, setEditingPost] = useState<UserPost | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [title, setTitle] = useState(editingPost?.title || "");
  const [body, setBody] = useState(editingPost?.body || "");
  const [alert, setAlert] = useState<{
    type: "success" | "error" | "info" | "warning";
    message: string;
  } | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDrafts = localStorage.getItem("userDrafts");
      if (savedDrafts) {
        setDrafts(JSON.parse(savedDrafts));
      }
      setIsLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("userDrafts", JSON.stringify(drafts));
    }
  }, [drafts, isLoaded]);
  const handleAddToDraft = (post: Omit<UserPost, "id">) => {
    const newDraft: UserPost = {
      ...post,
      id: Date.now().toString(),
    };
    setDrafts((prev) => [...prev, newDraft]);
  };

  const handlePublish = (post: Omit<UserPost, "id">) => {
    console.log("Publishing post:", post);

    setAlert({
      type: "success",
      message: "All drafts published successfully!",
    });
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
      setAlert({
        type: "success",
        message: "All drafts published successfully!",
      });
    }

    setTitle("");
    setBody("");
  };
  const handlePublishAll = async () => {
    if (drafts.length === 0) return;

    try {
      for (const draft of drafts) {
        const slug = draft.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

        const filename = `${Date.now()}-${slug}.md`;

        const markdown = `# ${draft.title}\n\n${draft.body}`;

        await publishFileToGitHub(filename, markdown);
      }

      setAlert({
        type: "success",
        message: "All drafts published successfully!",
      });
      setDrafts([]);
      localStorage.removeItem("userDrafts");
    } catch (err: any) {
      console.error(err);
      setAlert({
        type: "error",
        message: "Failed to publish drafts: " + err.message,
      });
    }
  };

  return (
    <div className=" w-2xl bg-gray-50 ">
      <div className="  mx-auto">
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
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
          handlePublishAll={handlePublishAll}
        />
      </div>
    </div>
  );
}
