import { useState } from "react";
import type { Post } from "./posts";

interface NewPostFormProps {
  onAddPost: (post: Post) => void;
}

function NewPostForm({ onAddPost }: NewPostFormProps) {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !image) {
      alert("Please fill in a username and image URL");
      return;
    }

    const newPost: Post = {
      id: Date.now(), // quick way to get a unique number
      username,
      image,
      caption,
      likes: 0,
      comments: [],
    };

    onAddPost(newPost);

    // clear the form
    setUsername("");
    setImage("");
    setCaption("");
  };

  return (
    <form onSubmit={handleSubmit} className="new-post-form">
      <h2>Create a new post</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default NewPostForm;