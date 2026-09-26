import { useEffect, useState } from "react";
import stories from "./stories";
import type { Story } from "./stories";

function StoriesBar() {
  const [storyList, setStoryList] = useState<Story[]>(stories);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeStory = activeIndex !== null ? storyList[activeIndex] : null;

  useEffect(() => {
    if (activeIndex === null) return;

    setStoryList((currentStories) =>
      currentStories.map((story, index) =>
        index === activeIndex ? { ...story, viewed: true } : story
      )
    );

    const timer = window.setTimeout(() => {
      setActiveIndex((currentIndex) => {
        if (currentIndex === null) return null;
        return currentIndex < storyList.length - 1 ? currentIndex + 1 : null;
      });
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, storyList.length]);

  const openStory = (storyId: number) => {
    const nextIndex = storyList.findIndex((story) => story.id === storyId);
    if (nextIndex >= 0) {
      setActiveIndex(nextIndex);
    }
  };

  const closeStory = () => {
    setActiveIndex(null);
  };

  const goPrevious = () => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) return null;
      return currentIndex > 0 ? currentIndex - 1 : 0;
    });
  };

  const goNext = () => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) return null;
      return currentIndex < storyList.length - 1 ? currentIndex + 1 : null;
    });
  };

  return (
    <>
      <div className="stories-bar">
        {storyList.map((story) => (
          <div
            key={story.id}
            className="story-item"
            onClick={() => openStory(story.id)}
          >
            <div className={story.viewed ? "story-ring viewed" : "story-ring"}>
              <img src={story.avatar} alt={story.username} />
            </div>
            <p>{story.username}</p>
          </div>
        ))}
      </div>

      {activeStory && (
        <div className="story-modal" onClick={closeStory}>
          <div className="story-modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="story-progress">
              {storyList.map((story, index) => (
                <span
                  key={story.id}
                  className={
                    index < (activeIndex ?? 0)
                      ? "story-progress-bar seen"
                      : index === activeIndex
                        ? "story-progress-bar active"
                        : "story-progress-bar"
                  }
                />
              ))}
            </div>

            <div className="story-topbar">
              <div className="story-user-info">
                <img src={activeStory.avatar} alt={activeStory.username} />
                <div>
                  <strong>{activeStory.username}</strong>
                  <span>Just now</span>
                </div>
              </div>

              <button type="button" className="story-close-btn" onClick={closeStory}>
                ×
              </button>
            </div>

            <div className="story-image-wrap">
              <img src={activeStory.image} alt={activeStory.username} className="story-image" />
            </div>

            <button
              type="button"
              className="story-nav story-nav-prev"
              onClick={goPrevious}
              aria-label="Previous story"
            >
              ‹
            </button>
            <button
              type="button"
              className="story-nav story-nav-next"
              onClick={goNext}
              aria-label="Next story"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default StoriesBar;