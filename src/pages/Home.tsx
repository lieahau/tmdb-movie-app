import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "../types/interfaces";
import { getMoviesByCategory, getSearchMovies } from "../api/apiService";
import { MovieCategory } from "../types/enum";
import MovieFilters from "../components/MovieFilters";

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

  useEffect(() => {
    setPage(1);
    fetchMovies(1);
  }, [category]);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (isBottom && !loading) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMovies(nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading, search, category]);

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

      {error && (
        <div className="mt-4 text-center">
          <p>{error}</p>
          <button
            onClick={() => fetchMovies(page)}
            className="mt-2 px-3 py-1 bg-gray-800 text-white rounded"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <p className="mt-4 text-center">No movies found.</p>
      )}

      {/* Loading indicator */}
      {loading && <p className="mt-4 text-center">Loading...</p>}
    </div>
  );
};

export default Home;
