import { useState, useEffect } from "react";
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
  const [darkMode, setDarkMode] = useState(false);
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

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

  const handleAddComment = (postId: number) => {
    const text = commentDrafts[postId]?.trim();

    if (!text) return;

    const newComment = {
      id: Date.now(),
      username: "you",
      text,
      likes: 0,
    };

    setPostList((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );

    setCommentDrafts((currentDrafts) => ({ ...currentDrafts, [postId]: "" }));
  };

  const handleLikeComment = (postId: number, commentId: number) => {
    setPostList((currentPosts) =>
      currentPosts.map((post) =>
        post.id !== postId
          ? post
          : {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, likes: comment.likes + 1 }
                  : comment
              ),
            }
      )
    );
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((prev) => !prev)}
      />

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

            <div className="comments-section">
              {post.comments.slice(0, 3).map((comment) => (
                <div key={comment.id} className="comment-item">
                  <p>
                    <strong>{comment.username}</strong> {comment.text}
                  </p>
                  <button
                    type="button"
                    className="comment-like-btn"
                    onClick={() => handleLikeComment(post.id, comment.id)}
                  >
                    <FaRegHeart size={12} />
                    <span>{comment.likes}</span>
                  </button>
                </div>
              ))}

              <div className="comment-form">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentDrafts[post.id] ?? ""}
                  onChange={(e) =>
                    setCommentDrafts((currentDrafts) => ({
                      ...currentDrafts,
                      [post.id]: e.target.value,
                    }))
                  }
                />
                <button type="button" onClick={() => handleAddComment(post.id)}>
                  Post
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;