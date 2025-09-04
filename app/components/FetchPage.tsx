import ReactMarkdown from "react-markdown";

async function fetchMarkdownContent() {
  const response = await fetch(
    "https://api.github.com/repos/kayes360/github-fetch-api/contents/app/contents/posts_markdown.md"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await response.json();
  const decodedContent = Buffer.from(data.content, "base64").toString("utf-8");
  return decodedContent;
}

export default async function FetchPage() {
  try {
    const content = await fetchMarkdownContent();

    return (
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    );
  } catch (error) {
    return <div>Error fetching markdown content</div>;
  }
}
