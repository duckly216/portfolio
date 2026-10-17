import * as Project_Images from "./image_paths";

export type Project = {
  title: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  link?: string;
  thumbnail?: string;
  exampleImages?: string[];
  featured?: boolean; // true = show in "Featured Projects" on the home page
};

// How many featured projects the home page shows at most
export const FEATURED_PROJECTS_MAX = 3;

export const projects: Project[] = [
  {
    title: "UniGenda",
    shortDescription:
      "Social website with a \"quest\" system that doubles as a to-do list and LFG posts for collaboration.",
    longDescription:
      "Social website based on a \"quest\" system. Serves mainly as a to-do list, with the additional feature of making certain items into \"looking for group\" posts to encourage collaboration within communities.",
    tags: ["Python", "Node", "Git", "HTML"],
    link: "https://github.com/duckly216/UniGenda",
    thumbnail: Project_Images.Unigenda_IMG_paths.UNIGENDA_THUMBNAIL,
    exampleImages: [
      Project_Images.Unigenda_IMG_paths.UNIGENDA_TASKS_PAGE,
      Project_Images.Unigenda_IMG_paths.UNIGENDA_TASKS_CREATION,
      Project_Images.Unigenda_IMG_paths.UNIGENDA_PUBLIC_POSTS_PAGE,
    ],
    featured: true,
  },
  {
    title: "Maze Pathfinding",
    shortDescription:
      "Visual Python app that renders an n × n maze and demonstrates pathfinding algorithms.",
    longDescription:
      "Python application with grid rendering and file input/output functionality to visualize pathfinding algorithms on an n × n maze grid. Includes different algorithm implementations and a GUI for stepping through results.",
    tags: ["Python", "Pygame", "Tkinter"],
    link: "https://github.com/Gabriel-Lopezz/MazePathfinding",
    thumbnail: Project_Images.MazePath_IMG_paths.MAZE_PATH_THUMBNAIL,
    exampleImages: [
      Project_Images.MazePath_IMG_paths.MAZE_PATH_100x100_AStar,
      Project_Images.MazePath_IMG_paths.MAZE_PATH_100x100_Dijkstra,
      Project_Images.MazePath_IMG_paths.MAZE_PATH_1000x1000_AStar,
      Project_Images.MazePath_IMG_paths.MAZE_PATH_1000x1000_Dijkstra,
    ],
    featured: true,
  },
];

export default projects;

// Used by the home page: flagged projects, in list order, capped at the max
export const featuredProjects = projects
  .filter((project) => project.featured)
  .slice(0, FEATURED_PROJECTS_MAX);