import type { Post } from "./posts";

interface ProfileProps {
  posts: Post[];
  userName: string;
  displayName: string;
  bio: string;
  website: string;
  followers: string;
  following: string;
  activeTab: "posts" | "saved" | "tagged";
  onTabChange: (tab: "posts" | "saved" | "tagged") => void;
}

function Profile({
  posts,
  userName,
  displayName,
  bio,
  website,
  followers,
  following,
  activeTab,
  onTabChange,
}: ProfileProps) {
  const profileTabPosts =
    activeTab === "posts"
      ? posts
      : activeTab === "saved"
        ? posts.filter((post) => [1, 3].includes(post.id))
        : posts.filter((post) => [2].includes(post.id));

  return (
    <section className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar" aria-label="Profile avatar">
          <span>{displayName.charAt(0).toUpperCase()}</span>
        </div>

        <div className="profile-details">
          <div className="profile-top-row">
            <div>
              <p className="profile-label">Profile</p>
              <h2>{userName}</h2>
            </div>
            <button type="button" className="profile-action-btn">
              Edit Profile
            </button>
          </div>

          <div className="profile-stats">
            <span>
              <strong>{posts.length}</strong> posts
            </span>
            <span>
              <strong>{followers}</strong> followers
            </span>
            <span>
              <strong>{following}</strong> following
            </span>
          </div>

          <p className="profile-display-name">{displayName}</p>
          <p className="profile-bio">{bio}</p>
          <a href="https://example.com" className="profile-website">
            {website}
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
            className={activeTab === tab.id ? "profile-tab active" : "profile-tab"}
            onClick={() => onTabChange(tab.id as "posts" | "saved" | "tagged")}
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
  );
}

export default Profile;
