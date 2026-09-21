import { FaComment, FaPlay, FaRegHeart } from "react-icons/fa";
import NewPostForm from "./NewPostForm";
import StoriesBar from "./StoriesBar";
import type { Post } from "./posts";

interface HomeFeedProps {
  postList: Post[];
  showForm: boolean;
  onToggleForm: () => void;
  onAddPost: (newPost: Post) => void;
  onLike: (id: number) => void;
  onAddComment: (postId: number) => void;
  onLikeComment: (postId: number, commentId: number) => void;
  commentDrafts: Record<number, string>;
  onCommentDraftChange: (postId: number, value: string) => void;
}

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

function HomeFeed({
  postList,
  showForm,
  onToggleForm,
  onAddPost,
  onLike,
  onAddComment,
  onLikeComment,
  commentDrafts,
  onCommentDraftChange,
}: HomeFeedProps) {
  return (
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
                  <span className="reel-play">
                    <FaPlay size={10} />
                  </span>
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

      <button className="toggle-form-btn" onClick={onToggleForm}>
        {showForm ? "Cancel" : "+ New Post"}
      </button>

      {showForm && <NewPostForm onAddPost={onAddPost} />}

      {postList.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <div className="post-avatar" />
            <p className="post-username">{post.username}</p>
          </div>

          <img src={post.image} alt={post.caption} className="post-image" />

          <div className="post-actions">
            <button className="icon-btn" onClick={() => onLike(post.id)}>
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
                  onClick={() => onLikeComment(post.id, comment.id)}
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
                onChange={(e) => onCommentDraftChange(post.id, e.target.value)}
              />
              <button type="button" onClick={() => onAddComment(post.id)}>
                Post
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default HomeFeed;
