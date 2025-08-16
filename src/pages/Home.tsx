import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "../types/interfaces";
import { getMoviesByCategory, getSearchMovies } from "../api/apiService";
import { MovieCategory } from "../types/enum";
import MovieFilters from "../components/MovieFilters";
import { useInfiniteScroll } from "../hooks/infiniteScroll";
import { StatusMessage } from "../components/StatusMessage";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<MovieCategory>(MovieCategory.NowPlaying);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (newPage = 1) => {
    try {
      setLoading(true);
      setError(null);

      let results: Movie[] = [];
      if (search) results = await getSearchMovies(search, newPage);
      else results = await getMoviesByCategory(category, newPage);

      if (newPage === 1) {
        setMovies(results);
      } else {
        setMovies((prev) => {
          const newResults = results.filter(
            (m) => !prev.some((movie) => movie.id === m.id)
          );
          return [...prev, ...newResults];
        });
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };
  useInfiniteScroll({ loading, onLoadMore: loadMore });

  useEffect(() => {
    setPage(1);
    fetchMovies(1);
  }, [category]);

  return (
    <div>
      {/* Movie Search & Filter */}
      <MovieFilters
        search={search}
        category={category}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onSubmit={() => {
          setPage(1);
          fetchMovies(1);
        }}
      />

      {/* Movies */}
      <MovieGrid movies={movies} />

      {/* Status messages */}
      <StatusMessage
        loading={loading}
        error={error}
        onRetry={() => fetchMovies(page)}
        noData={!loading && !error && movies.length === 0}
      />
    </div>
  );
};

export default Home;
