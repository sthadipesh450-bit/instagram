import { useState, useEffect } from "react";
import posts from "./posts";
import type { Post } from "./posts";
import Navbar from "./Navbar";
import Messages from "./Messages";
import HomeFeed from "./HomeFeed";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
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

type ViewMode = "home" | "profile" | "messages";

function App() {
  const [postList, setPostList] = useState<Post[]>(posts);
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({});
  const [activeView, setActiveView] = useState<ViewMode>("home");
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
        onSelectView={setActiveView}
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
            className={activeView === "messages" ? "view-tab active" : "view-tab"}
            onClick={() => setActiveView("messages")}
          >
            Messages
          </button>
          <button
            type="button"
            className={activeView === "profile" ? "view-tab active" : "view-tab"}
            onClick={() => setActiveView("profile")}
          >
            Profile
          </button>
        </div>

        {activeView === "messages" ? (
          <Messages />
        ) : activeView === "profile" ? (
          <Profile
            posts={postList}
            userName={profile.username}
            displayName={profile.displayName}
            bio={profile.bio}
            website={profile.website}
            followers={profile.followers}
            following={profile.following}
            activeTab={profileTab}
            onTabChange={setProfileTab}
          />
        ) : (
          <HomeFeed
            postList={postList}
            showForm={showForm}
            onToggleForm={() => setShowForm(!showForm)}
            onAddPost={handleAddPost}
            onLike={handleLike}
            onAddComment={handleAddComment}
            onLikeComment={handleLikeComment}
            commentDrafts={commentDrafts}
            onCommentDraftChange={(postId, value) =>
              setCommentDrafts((currentDrafts) => ({
                ...currentDrafts,
                [postId]: value,
              }))
            }
          />
        )}
      </main>
    </div>
  );
}

export default App;