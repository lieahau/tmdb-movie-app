import { Movie } from "../types/interfaces";

export const mockMovies: Movie[] = [
  { id: 1, title: "Movie A", release_date: "2024-01-01", poster_path: "/imgA.jpg" },
  { id: 2, title: "Movie B", release_date: "2024-02-02", poster_path: "/imgB.jpg" },
  { id: 3, title: "Movie C", release_date: "2024-03-03", poster_path: "/imgC.jpg" },
];

export const mockMovie = {
  id: 1,
  title: "Test Movie",
  overview: "Test Overview",
  poster_path: null,
  credits: {
    crew: [{ job: "Director", name: "John Doe" }],
    cast: [{ name: "Actor A" }],
  },
};
