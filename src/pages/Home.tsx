import { useEffect, useState } from "react";
import { tmdb } from "../api/tmdb";
import { Link } from "react-router-dom";

type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
};

const categories = [
  { label: "Now Playing", value: "now_playing" },
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("now_playing");
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (newPage = 1) => {
    try {
      setLoading(true);
      setError(null);

      let url = `/movie/${category}`;
      let params: any = { page: newPage };

      if (search) {
        url = "/search/movie";
        params.query = search;
      }

      const res = await tmdb.get(url, { params });
      if (newPage === 1) {
        setMovies(res.data.results);
      } else {
        setMovies((prev) => [...prev, ...res.data.results]);
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <div className="bg-white shadow p-2 rounded">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded mb-2"
              />
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-500">
                {new Date(movie.release_date).getFullYear()}
              </p>
            </div>
          </Link>
        ))}
      </div>

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
