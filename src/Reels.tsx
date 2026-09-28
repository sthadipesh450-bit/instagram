import { FaComment, FaHeart, FaPlay, FaVolumeUp } from "react-icons/fa";

const reels = [
  {
    id: 1,
    username: "travel_vibes",
    title: "Sunset walk in Lisbon",
    likes: "24.8K",
    comments: "1.2K",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    accent: "rose",
  },
  {
    id: 2,
    username: "coffee_lover",
    title: "Morning coffee ritual",
    likes: "18.4K",
    comments: "845",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    accent: "gold",
  },
  {
    id: 3,
    username: "city_nights",
    title: "Night lights in motion",
    likes: "31.1K",
    comments: "2.1K",
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80",
    accent: "purple",
  },
  {
    id: 4,
    username: "studio_days",
    title: "Creative setup tour",
    likes: "12.3K",
    comments: "503",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    accent: "sky",
  },
];

function Reels() {
  return (
    <section className="reels-page" aria-label="Reels page">
      <div className="reels-page-header">
        <div>
          <p className="reels-kicker">Instagram</p>
          <h3>Reels</h3>
        </div>
        <button type="button" className="reels-filter-btn">
          Trending
        </button>
      </div>

      <div className="reels-grid">
        {reels.map((reel) => (
          <article key={reel.id} className={`reel-page-card ${reel.accent}`}>
            <div className="reel-page-media">
              <img src={reel.image} alt={reel.title} />

              <div className="reel-page-overlay">
                <div className="reel-page-topline">
                  <span className="reel-video-badge">
                    <FaPlay size={10} />
                  </span>
                  <span className="reel-page-tag">Reel</span>
                </div>

                <div className="reel-page-actions">
                  <span>
                    <FaHeart size={14} />
                    {reel.likes}
                  </span>
                  <span>
                    <FaComment size={14} />
                    {reel.comments}
                  </span>
                  <span>
                    <FaVolumeUp size={12} />
                  </span>
                </div>
              </div>
            </div>

            <div className="reel-page-meta">
              <div className="reel-page-user">
                <div className="reel-page-avatar">{reel.username.charAt(0).toUpperCase()}</div>
                <span>@{reel.username}</span>
              </div>
              <p>{reel.title}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reels;
