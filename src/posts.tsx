export interface Post {
  id: number;
  username: string;
  image: string;
  caption: string;
  likes: number;
}

const posts: Post[] = [
  {
    id: 1,
    username: "sarah_travels",
    image: "https://picsum.photos/id/1015/500/500",
    caption: "Beautiful mountains today!",
    likes: 24,
  },
  {
    id: 2,
    username: "foodie_mike",
    image: "https://picsum.photos/id/292/500/500",
    caption: "Best pasta ever 🍝",
    likes: 51,
  },
  {
    id: 3,
    username: "city_life",
    image: "https://picsum.photos/id/1016/500/500",
    caption: "Downtown at sunset",
    likes: 12,
  },
];

export default posts;