import { useState } from "react";
import posts from "./posts";
import type { Post } from "./posts";
import NewPostForm from "./NewPostForm";
import "./App.css";

function App() {
  const [postList, setPostList] = useState<Post[]>(posts);

  const handleLike = (id: number) => {
    const updated = postList.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPostList(updated);
  };

  const handleAddPost = (newPost: Post) => {
    setPostList([newPost, ...postList]); // add new post to the top
  };

  return (
    <div>
      <h1>My Instagram</h1>

      <NewPostForm onAddPost={handleAddPost} />

      {postList.map((post) => (
        <div key={post.id} className="post">
          <p><strong>{post.username}</strong></p>
          <img src={post.image} alt={post.caption} />
          <p>{post.caption}</p>
          <p>{post.likes} likes</p>
          <button onClick={() => handleLike(post.id)}>❤️ Like</button>
        </div>
      ))}
    </div>
  );
}

export default App;