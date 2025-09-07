 
export async function POST(req: Request) {
  try {
    const { filename, content } = await req.json();

    const repoOwner = "kayes360";
    const repoName = "posts-md";
    const path = `posts/${filename}`;
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return new Response(
        JSON.stringify({ error: "GitHub token not found" }),
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Add post ${filename}`,
          content: Buffer.from(content).toString("base64"),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.message }), {
        status: response.status,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Something went wrong" }),
      { status: 500 }
    );
  }
}
