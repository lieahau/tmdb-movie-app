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
      <div className="text-gray-900 dark:text-gray-100">
        <button className="mb-4 hover:underline" onClick={() => navigate(-1)}>
          ← Back
        </button>
        
        <StatusMessage
          loading={loading}
          error={error}
          onRetry={() => window.location.reload()}
        />
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
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full max-w-[350px] md:max-w-[300px] rounded"
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
