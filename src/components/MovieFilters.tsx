import { MovieCategory } from "../types/enum";

interface MovieFiltersProps {
  search: string;
  category: MovieCategory;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: MovieCategory) => void;
  onSubmit: () => void;
};

const categories = [
  { label: "Now Playing", value: MovieCategory.NowPlaying },
  { label: "Popular", value: MovieCategory.Popular },
  { label: "Top Rated", value: MovieCategory.TopRated },
  { label: "Upcoming", value: MovieCategory.Upcoming },
];

const MovieFilters = ({
  search,
  category,
  onSearchChange,
  onCategoryChange,
  onSubmit,
}: MovieFiltersProps) => {
  return (
    <div>
      {/* Search bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="mb-4"
      >
        <input
          className="border p-2 rounded w-full"
          placeholder="Search movie..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </form>

      {/* Category buttons */}
      <div className="flex gap-2 mb-4">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => onCategoryChange(c.value)}
            className={`px-3 py-1 rounded ${
              category === c.value ? "bg-gray-800 text-white" : "bg-gray-200"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieFilters;
