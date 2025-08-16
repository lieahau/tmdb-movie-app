import { Link } from "react-router-dom";
import { Movie } from "../types/interfaces";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link to={`/movie/${movie.id}`} className="h-full">
      <div className="bg-white shadow p-2 rounded flex flex-col h-full">
        {/* Poster with fixed ratio */}
        <div className="w-full aspect-[2/3] overflow-hidden mb-2">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/No-Image-Placeholder.png"
            }
            alt={movie.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold truncate">{movie.title}</h2>

        {/* Release year */}
        <p className="text-sm text-gray-500">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : "TBA"}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
