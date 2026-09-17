export interface Comment {
  id: number;
  username: string;
  text: string;
  likes: number;
}

export interface Post {
  id: number;
  username: string;
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
}

const posts: Post[] = [
  {
    id: 1,
    username: "sarah_travels",
    image: "https://picsum.photos/id/1015/500/500",
    caption: "Beautiful mountains today!",
    likes: 24,
    comments: [
      { id: 101, username: "travel_bug", text: "This view is stunning!", likes: 5 },
      { id: 102, username: "alex_88", text: "I need to visit there soon.", likes: 3 },
    ],
  },
  {
    id: 2,
    username: "foodie_mike",
    image: "https://picsum.photos/id/292/500/500",
    caption: "Best pasta ever 🍝",
    likes: 51,
    comments: [
      { id: 201, username: "chef_lover", text: "Looks delicious!", likes: 8 },
      { id: 202, username: "hungry_now", text: "I’m ordering this tonight.", likes: 4 },
    ],
  },
  {
    id: 3,
    username: "city_life",
    image: "https://picsum.photos/id/1016/500/500",
    caption: "Downtown at sunset",
    likes: 12,
    comments: [
      { id: 301, username: "nightowl", text: "Perfect lighting.", likes: 2 },
      { id: 302, username: "pixel_queen", text: "This looks like a movie scene.", likes: 6 },
    ],
  },
];

export default posts;