import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../api/apiService";
import { StatusMessage } from "../components/StatusMessage";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetail(id);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading || error) {
    return (
      <div className="min-h-screen text-gray-900 dark:text-gray-100">
        <button className="mb-4 hover:underline" onClick={() => navigate(-1)}>← Back</button>
        <div className="flex items-center justify-center w-screen h-[calc(100vh-3rem)]">
          <StatusMessage
            loading={loading}
            error={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const director = movie.credits.crew.find((c: any) => c.job === "Director");
  const cast = movie.credits.cast.slice(0, 5);

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <button className="mb-4 hover:underline" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <div className="flex-shrink-0 relative">
          {!imgLoaded && (
            <div className="w-full max-w-[350px] md:max-w-[300px] aspect-[2/3] bg-gray-200 animate-pulse rounded" />
          )}
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/No-Image-Placeholder.png"}
            alt={movie.title}
            className={`w-full max-w-[350px] md:max-w-[300px] rounded ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImgLoaded(true)}
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
          <p className="mb-2">{movie.overview}</p>
          <p className="mb-2">
            <strong>Director:</strong> {director?.name}
          </p>
          <p>
            <strong>Main Cast:</strong> {cast.map((c: any) => c.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
