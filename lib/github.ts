export async function publishFileToGitHub(filename: string, content: string) {
  const res = await fetch("/api/publish", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename, content }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to publish file");
  }

  return await res.json();
}
