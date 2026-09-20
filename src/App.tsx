import { useState, useEffect } from "react";
import posts from "./posts";
import type { Post } from "./posts";
import NewPostForm from "./NewPostForm";
import StoriesBar from "./StoriesBar";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import { FaComment, FaPlay, FaRegHeart } from "react-icons/fa";
import "./App.css";

type AuthMode = "login" | "signup";

type User = {
  name: string;
  email: string;
  password: string;
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
  const [profileTab, setProfileTab] = useState<"posts" | "saved" | "tagged">("posts");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
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

  const handleLoginSubmit = ({ email, password }: { email: string; password: string }) => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setAuthError("Please fill in all fields.");
      return;
    }

    const users = getStoredUsers();
    const matchedUser = users.find(
      (user) => user.email.toLowerCase() === trimmedEmail && user.password === trimmedPassword
    );

    if (!matchedUser) {
      setAuthError("Invalid email or password.");
      return;
    }

    localStorage.setItem("instagram-current-user", JSON.stringify(matchedUser));
    setCurrentUser(matchedUser);
    setAuthError("");
  };

  const handleSignupSubmit = ({ name, email, password }: { name: string; email: string; password: string }) => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setAuthError("Please fill in all fields.");
      return;
    }

    const users = getStoredUsers();
    const emailExists = users.some(
      (user) => user.email.toLowerCase() === trimmedEmail
    );

    if (emailExists) {
      setAuthError("An account with this email already exists.");
      return;
    }

    const newUser: User = {
      name: trimmedName,
      email: trimmedEmail,
      password: trimmedPassword,
    };

    localStorage.setItem("instagram-users", JSON.stringify([...users, newUser]));
    localStorage.setItem("instagram-current-user", JSON.stringify(newUser));
    setCurrentUser(newUser);
    setAuthError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("instagram-current-user");
    setCurrentUser(null);
    setAuthMode("login");
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
    displayName: currentUser ? currentUser.name : "Your profile",
    bio: "Photographer • foodie • exploring the world one city at a time",
    website: "mila-travel.com",
    followers: "24.8K",
    following: "318",
  };

  const profileTabPosts =
    profileTab === "posts"
      ? postList
      : profileTab === "saved"
        ? postList.filter((post) => [1, 3].includes(post.id))
        : postList.filter((post) => [2].includes(post.id));

  const reels = [
    {
      id: 1,
      user: "travel_vibes",
      title: "Sunset walk",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      likes: "24.8K",
      comments: "1.2K",
      duration: "0:22",
    },
    {
      id: 2,
      user: "coffee_lover",
      title: "Cafe morning routine",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
      likes: "18.4K",
      comments: "845",
      duration: "0:18",
    },
    {
      id: 3,
      user: "city_nights",
      title: "Late-night lights",
      image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80",
      likes: "31.1K",
      comments: "2.1K",
      duration: "0:29",
    },
  ];

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
          <div className="auth-promo" aria-label="Instagram preview panel">
            <div className="promo-phone">
              <div className="promo-screen">
                <div className="promo-topbar">
                  <span className="mini-dot" />
                  <span className="mini-dot" />
                  <span className="mini-dot" />
                </div>
                <div className="promo-story-row">
                  <span className="story-pill story-one" />
                  <span className="story-pill story-two" />
                  <span className="story-pill story-three" />
                </div>
                <div className="promo-feed-card">
                  <div className="promo-card-head">
                    <span className="promo-avatar" />
                    <span>mila_travel</span>
                  </div>
                  <div className="promo-image" />
                  <div className="promo-actions">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
            <div className="promo-copy">
              <p className="promo-kicker">Share your world</p>
              <h2>Connect with friends and post every moment.</h2>
              <ul>
                <li>Discover stories from people you love</li>
                <li>Post photos and keep memories alive</li>
                <li>Follow creators, trends, and communities</li>
              </ul>
            </div>
          </div>

          <div className="auth-card">
            <div className="auth-brand">
              <span className="auth-logo">◎</span>
              <h1>My Instagram</h1>
            </div>

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

            {authMode === "login" ? (
              <Login
                onSubmit={handleLoginSubmit}
                onSwitchToSignup={() => {
                  setAuthMode("signup");
                  setAuthError("");
                }}
                error={authError}
              />
            ) : (
              <Signup
                onSubmit={handleSignupSubmit}
                onSwitchToLogin={() => {
                  setAuthMode("login");
                  setAuthError("");
                }}
                error={authError}
              />
            )}
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
              <div className="profile-avatar" aria-label="Profile avatar">
                <span>{profile.displayName.charAt(0).toUpperCase()}</span>
              </div>

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

                <p className="profile-display-name">{profile.displayName}</p>
                <p className="profile-bio">{profile.bio}</p>
                <a href="https://example.com" className="profile-website">
                  {profile.website}
                </a>
              </div>
            </div>

            <div className="profile-tabs" role="tablist" aria-label="Profile tabs">
              {[
                { id: "posts", label: "Posts" },
                { id: "saved", label: "Saved" },
                { id: "tagged", label: "Tagged" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={profileTab === tab.id ? "profile-tab active" : "profile-tab"}
                  onClick={() => setProfileTab(tab.id as "posts" | "saved" | "tagged")}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="profile-grid" aria-label="User posts">
              {profileTabPosts.length > 0 ? (
                profileTabPosts.map((post) => (
                  <div key={post.id} className="profile-grid-item">
                    <img src={post.image} alt={post.caption} />
                  </div>
                ))
              ) : (
                <div className="profile-empty-state">No photos here yet.</div>
              )}
            </div>
          </section>
        ) : (
          <>
            <StoriesBar />

            <section className="reels-section" aria-label="Reels section">
              <div className="reels-header">
                <h3>Reels</h3>
                <button type="button">Watch all</button>
              </div>

              <div className="reels-row">
                {reels.map((reel) => (
                  <article key={reel.id} className="reel-card">
                    <div className="reel-media">
                      <img src={reel.image} alt={reel.title} />

                      <div className="reel-overlay">
                        <span className="reel-play"><FaPlay size={10} /></span>
                        <span className="reel-duration">{reel.duration}</span>
                      </div>

                      <div className="reel-stats">
                        <span>
                          <FaRegHeart size={12} />
                          {reel.likes}
                        </span>
                        <span>
                          <FaComment size={12} />
                          {reel.comments}
                        </span>
                      </div>
                    </div>

                    <div className="reel-info">
                      <span className="reel-user">@{reel.user}</span>
                      <span className="reel-title">{reel.title}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

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