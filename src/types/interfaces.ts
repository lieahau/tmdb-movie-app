export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

export type TMDBResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};