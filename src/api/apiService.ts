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