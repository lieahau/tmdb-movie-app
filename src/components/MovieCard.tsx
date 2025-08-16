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
    <Link to={`/movie/${movie.id}`} className="h-full text-gray-900 dark:text-gray-100 no-underline">
      <div className="bg-white dark:bg-gray-800 shadow p-2 rounded flex flex-col h-full">
        {/* Image */}
        <div className="relative w-full aspect-[2/3] overflow-hidden mb-2 group">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}

          <img
            src={posterUrl}
            alt={movie.title}
            onLoad={() => setImgLoaded(true)}
            className={`object-cover w-full h-full transition-opacity ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* DETAILS button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="px-4 py-1 rounded border border-white text-white transition-all group-hover:border-white hover:bg-white hover:text-gray-800">
              DETAILS
            </span>
          </div>
        </div>

        {/* Title */}
        {imgLoaded ? (
          <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
        ) : (
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-1 animate-pulse" />
        )}

        {/* Year */}
        {imgLoaded ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "TBA"}
          </p>
        ) : (
          <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
