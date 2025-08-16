import { useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../types/interfaces";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg";

  return (
    <Link to={`/movie/${movie.id}`} className="h-full">
      <div className="bg-white shadow p-2 rounded flex flex-col h-full">
        {/* Image */}
        <div className="w-full aspect-[2/3] overflow-hidden mb-2 relative">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <img
            src={posterUrl}
            alt={movie.title}
            className={`object-cover w-full h-full transition-opacity ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImgLoaded(true)}
          />
        </div>

        {/* Title */}
        {imgLoaded ? (
          <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
        ) : (
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-1 animate-pulse" />
        )}

        {/* Year */}
        {imgLoaded ? (
          <p className="text-sm text-gray-500">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : "TBA"}
          </p>
        ) : (
          <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
