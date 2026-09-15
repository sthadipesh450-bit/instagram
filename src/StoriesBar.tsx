import { useState } from "react";
import stories from "./stories";
import type { Story } from "./stories";

function StoriesBar() {
  const [storyList, setStoryList] = useState<Story[]>(stories);
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  const openStory = (story: Story) => {
    setActiveStory(story);

    // mark this story as viewed (removes the colored ring)
    const updated = storyList.map((s) =>
      s.id === story.id ? { ...s, viewed: true } : s
    );
    setStoryList(updated);
  };

  const closeStory = () => {
    setActiveStory(null);
  };

  return (
    <>
      <div className="stories-bar">
        {storyList.map((story) => (
          <div
            key={story.id}
            className="story-item"
            onClick={() => openStory(story)}
          >
            <div className={story.viewed ? "story-ring viewed" : "story-ring"}>
              <img src={story.avatar} alt={story.username} />
            </div>
            <p>{story.username}</p>
          </div>
        ))}
      </div>

      {/* Full-screen story viewer, only shows when a story is clicked */}
      {activeStory && (
        <div className="story-modal" onClick={closeStory}>
          <div className="story-modal-content">
            <p className="story-modal-username">{activeStory.username}</p>
            <img src={activeStory.image} alt={activeStory.username} />
          </div>
        </div>
      )}
    </>
  );
}

export default StoriesBar;