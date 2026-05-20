import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  description: string;
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // GET POSTS
  const fetchPosts = async () => {
    const res = await fetch("http://localhost:5000/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ADD POST
  const addPost = async () => {
    if (!title || !description) return;

    await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    setTitle("");
    setDescription("");

    fetchPosts();
  };

  // DELETE POST
  const deletePost = async (id: number) => {
    await fetch(`http://localhost:5000/posts/${id}`, {
      method: "DELETE",
    });

    fetchPosts();
  };

  // EDIT POST
  const editPost = async (id: number) => {
    const newTitle = prompt("Enter new title");
    const newDescription = prompt("Enter new description");

    if (!newTitle || !newDescription) return;

    await fetch(`http://localhost:5000/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
      }),
    });

    fetchPosts();
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* NAVBAR */}
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "10px",
        }}
      >
        <h1>Mini Blog</h1>
      </div>

      {/* CREATE POST */}
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "500px",
          margin: "auto",
        }}
      >
        <h2>Create Post</h2>

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <textarea
          placeholder="Write description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button
          onClick={addPost}
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Publish Post
        </button>
      </div>

      {/* POSTS */}
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ textAlign: "center" }}>Recent Posts</h2>

        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: "white",
              padding: "15px",
              margin: "15px auto",
              maxWidth: "500px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.description}</p>

            <button
              onClick={() => editPost(post.id)}
              style={{
                backgroundColor: "blue",
                color: "white",
                padding: "8px 12px",
                border: "none",
                marginRight: "10px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => deletePost(post.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "8px 12px",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;