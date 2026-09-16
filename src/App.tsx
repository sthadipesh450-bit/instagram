import { useState } from "react";
import posts from "./posts";
import type { Post } from "./posts";
import NewPostForm from "./NewPostForm";
import StoriesBar from "./StoriesBar";
import Navbar from "./Navbar";
import { FaRegHeart } from "react-icons/fa";
import "./App.css";

function App() {
  const [postList, setPostList] = useState<Post[]>(posts);
  const [showForm, setShowForm] = useState(false);

  const handleLike = (id: number) => {
    const updated = postList.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPostList(updated);
  };

  const handleAddPost = (newPost: Post) => {
    setPostList([newPost, ...postList]);
    setShowForm(false);
  };

  return (
    <div className="app">
      <Navbar />

      <main className="feed">
        <StoriesBar />

        <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ New Post"}
        </button>

        {showForm && <NewPostForm onAddPost={handleAddPost} />}

        {postList.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <div className="post-avatar" />
              <p className="post-username">{post.username}</p>
            </div>

            <img src={post.image} alt={post.caption} className="post-image" />

            <div className="post-actions">
              <button className="icon-btn" onClick={() => handleLike(post.id)}>
                <FaRegHeart size={22} />
              </button>
            </div>

            <p className="post-likes">{post.likes} likes</p>
            <p className="post-caption">
              <strong>{post.username}</strong> {post.caption}
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;