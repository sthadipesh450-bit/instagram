export interface Story {
  id: number;
  username: string;
  avatar: string;
  image: string;
  viewed: boolean;
}

const stories: Story[] = [
  {
    id: 1,
    username: "sarah_travels",
    avatar: "https://i.pravatar.cc/150?img=1",
    image: "https://picsum.photos/id/1018/500/800",
    viewed: false,
  },
  {
    id: 2,
    username: "foodie_mike",
    avatar: "https://i.pravatar.cc/150?img=2",
    image: "https://picsum.photos/id/1080/500/800",
    viewed: false,
  },
  {
    id: 3,
    username: "city_life",
    avatar: "https://i.pravatar.cc/150?img=3",
    image: "https://picsum.photos/id/1041/500/800",
    viewed: false,
  },
  {
    id: 4,
    username: "art_daily",
    avatar: "https://i.pravatar.cc/150?img=4",
    image: "https://picsum.photos/id/1050/500/800",
    viewed: false,
  },
];

export default stories;