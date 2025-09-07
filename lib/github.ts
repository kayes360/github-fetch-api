export async function publishFileToGitHub(filename: string, content: string) {
  const repoOwner = "kayes360";
  const repoName = "posts-md";
  const path = `posts/${filename}`;
  const token = process.env.GITHUB_TOKEN;  

  const res = await fetch(
    `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Add post ${filename}`,
        content: Buffer.from(content).toString("base64"),
      }),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to publish file");
  }

  return await res.json();
}
