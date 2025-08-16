import { Movie, TMDBResponse } from "../types/interfaces";
import { tmdb } from "./tmdb";

export const getMoviesByCategory = async (
  category: string,
  page = 1
): Promise<Movie[]> => {
  const res = await tmdb.get<TMDBResponse<Movie>>(`/movie/${category}`, {
    params: { page },
  });
  return res.data.results;
};

export const getSearchMovies = async (query: string, page = 1): Promise<Movie[]> => {
  const res = await tmdb.get<TMDBResponse<Movie>>("/search/movie", {
    params: { query, page },
  });
  return res.data.results;
};

export const getMovieDetail = async (id: string) => {
  const res = await tmdb.get(`/movie/${id}`, {
    params: { append_to_response: "credits" },
  });
  return res.data;
};

export const getPosterUrl = (posterPath: string | null) => {
  return posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "/No-Image-Placeholder.png";
}
