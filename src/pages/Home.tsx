import { useEffect, useState } from "react";
import { tmdb } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "../types/interfaces";
import { getMoviesByCategory, getSearchMovies } from "../api/apiService";
import { MovieCategory } from "../types/enum";

const categories = [
  { label: "Now Playing", value: MovieCategory.NowPlaying },
  { label: "Popular", value: MovieCategory.Popular },
  { label: "Top Rated", value: MovieCategory.TopRated },
  { label: "Upcoming", value: MovieCategory.Upcoming },
];

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

      if (newPage === 1) setMovies(results);
      else setMovies((prev) => [...prev, ...results]);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchMovies(1);
  };

  return (
    <div>
      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Search movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {/* Categories */}
      <div className="flex gap-2 mb-4">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`px-3 py-1 rounded ${
              category === c.value ? "bg-gray-800 text-white" : "bg-gray-200"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

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
