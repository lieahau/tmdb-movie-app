import { Movie } from "../types/interfaces";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
};

const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-fr">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
