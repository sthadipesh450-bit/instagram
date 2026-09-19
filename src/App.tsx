import { useState, useEffect } from "react";
import posts from "./posts";
import type { Post } from "./posts";
import NewPostForm from "./NewPostForm";
import StoriesBar from "./StoriesBar";
import Navbar from "./Navbar";
import { FaRegHeart } from "react-icons/fa";
import "./App.css";

type AuthMode = "login" | "signup";

type User = {
  name: string;
  email: string;
  password: string;
};

const defaultAuthForm = {
  name: "",
  email: "",
  password: "",
};

const getStoredUsers = (): User[] => {
  try {
    return JSON.parse(localStorage.getItem("instagram-users") ?? "[]") as User[];
  } catch {
    return [];
  }
};

function App() {
  const [postList, setPostList] = useState<Post[]>(posts);
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({});
  const [activeView, setActiveView] = useState<"home" | "profile">("home");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authForm, setAuthForm] = useState(defaultAuthForm);
  const [authError, setAuthError] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem("instagram-current-user");
      return savedUser ? (JSON.parse(savedUser) as User) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleAuthFieldChange = (field: keyof typeof defaultAuthForm, value: string) => {
    setAuthForm((current) => ({ ...current, [field]: value }));
    setAuthError("");
  };

  const handleAuthSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = authForm.name.trim();
    const email = authForm.email.trim().toLowerCase();
    const password = authForm.password.trim();

    if (!email || !password || (authMode === "signup" && !trimmedName)) {
      setAuthError("Please fill in all fields.");
      return;
    }

    if (authMode === "signup") {
      const users = getStoredUsers();
      const emailExists = users.some(
        (user) => user.email.toLowerCase() === email
      );

      if (emailExists) {
        setAuthError("An account with this email already exists.");
        return;
      }

      const newUser: User = {
        name: trimmedName,
        email,
        password,
      };

      localStorage.setItem("instagram-users", JSON.stringify([...users, newUser]));
      localStorage.setItem("instagram-current-user", JSON.stringify(newUser));
      setCurrentUser(newUser);
      setAuthForm(defaultAuthForm);
      setAuthError("");
      return;
    }

    const users = getStoredUsers();
    const matchedUser = users.find(
      (user) => user.email.toLowerCase() === email && user.password === password
    );

    if (!matchedUser) {
      setAuthError("Invalid email or password.");
      return;
    }

    localStorage.setItem("instagram-current-user", JSON.stringify(matchedUser));
    setCurrentUser(matchedUser);
    setAuthForm(defaultAuthForm);
    setAuthError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("instagram-current-user");
    setCurrentUser(null);
    setAuthMode("login");
    setAuthForm(defaultAuthForm);
    setAuthError("");
  };

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

  const profile = {
    username: currentUser ? `@${currentUser.name.toLowerCase().replace(/\s+/g, "")}` : "@yourprofile",
    bio: "Photographer • foodie • exploring the world one city at a time",
    followers: "24.8K",
    following: "318",
  };

  const handleAddComment = (postId: number) => {
    const text = commentDrafts[postId]?.trim();

    if (!text) return;

    const newComment = {
      id: Date.now(),
      username: currentUser ? currentUser.name.split(" ")[0] : "you",
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

  if (!currentUser) {
    return (
      <div className={darkMode ? "app dark auth-page" : "app auth-page"}>
        <div className="auth-shell">
          <div className="auth-brand">
            <span className="auth-logo">◎</span>
            <h1>My Instagram</h1>
          </div>

          <div className="auth-card">
            <div className="auth-toggle">
              <button
                type="button"
                className={authMode === "login" ? "auth-tab active" : "auth-tab"}
                onClick={() => setAuthMode("login")}
              >
                Login
              </button>
              <button
                type="button"
                className={authMode === "signup" ? "auth-tab active" : "auth-tab"}
                onClick={() => setAuthMode("signup")}
              >
                Sign up
              </button>
            </div>

            <form className="auth-form" onSubmit={handleAuthSubmit}>
              {authMode === "signup" && (
                <input
                  type="text"
                  placeholder="Full name"
                  value={authForm.name}
                  onChange={(event) =>
                    handleAuthFieldChange("name", event.target.value)
                  }
                />
              )}

              <input
                type="email"
                placeholder="Email address"
                value={authForm.email}
                onChange={(event) =>
                  handleAuthFieldChange("email", event.target.value)
                }
              />

              <input
                type="password"
                placeholder="Password"
                value={authForm.password}
                onChange={(event) =>
                  handleAuthFieldChange("password", event.target.value)
                }
              />

              {authError && <p className="auth-error">{authError}</p>}

              <button type="submit" className="auth-submit-btn">
                {authMode === "login" ? "Login" : "Create account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar
        darkMode={darkMode}
        username={currentUser.name.split(" ")[0]}
        onToggleTheme={() => setDarkMode((prev) => !prev)}
        onLogout={handleLogout}
      />

      <main className="feed">
        <div className="view-switch" role="tablist" aria-label="View switcher">
          <button
            type="button"
            className={activeView === "home" ? "view-tab active" : "view-tab"}
            onClick={() => setActiveView("home")}
          >
            Home
          </button>
          <button
            type="button"
            className={activeView === "profile" ? "view-tab active" : "view-tab"}
            onClick={() => setActiveView("profile")}
          >
            Profile
          </button>
        </div>

        {activeView === "profile" ? (
          <section className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar" />

              <div className="profile-details">
                <div className="profile-top-row">
                  <div>
                    <p className="profile-label">Profile</p>
                    <h2>{profile.username}</h2>
                  </div>
                  <button type="button" className="profile-action-btn">
                    Edit Profile
                  </button>
                </div>

                <div className="profile-stats">
                  <span>
                    <strong>{postList.length}</strong> posts
                  </span>
                  <span>
                    <strong>{profile.followers}</strong> followers
                  </span>
                  <span>
                    <strong>{profile.following}</strong> following
                  </span>
                </div>

                <p className="profile-bio">{profile.bio}</p>
              </div>
            </div>

            <div className="profile-grid" aria-label="User posts">
              {postList.map((post) => (
                <div key={post.id} className="profile-grid-item">
                  <img src={post.image} alt={post.caption} />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <>
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
          </>
        )}
      </main>
    </div>
  );
}

export default App;