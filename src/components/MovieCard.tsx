import { Link } from "react-router-dom";
import { Movie } from "../types/interfaces";

interface MovieCardProps {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-white shadow p-2 rounded">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded mb-2"
        />
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-sm text-gray-500">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : "TBA"}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
