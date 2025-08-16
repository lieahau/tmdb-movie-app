import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { tmdb } from "../api/tmdb";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await tmdb.get(`/movie/${id}`, {
          params: { append_to_response: "credits" },
        });
        setMovie(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return null;

  // Extract director & main cast
  const director = movie.credits.crew.find((c: any) => c.job === "Director");
  const cast = movie.credits.cast.slice(0, 5);

  return (
    <div>
      <button className="mb-4 underline" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="mb-4 rounded"
      />

      <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
      <p className="mb-2">{movie.overview}</p>

      <p className="mb-2">
        <strong>Director:</strong> {director?.name}
      </p>

      <p>
        <strong>Main Cast:</strong>{" "}
        {cast.map((c: any) => c.name).join(", ")}
      </p>
    </div>
  );
};

export default MovieDetail;
