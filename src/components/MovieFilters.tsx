import { MovieCategory } from "../types/enum";

interface MovieFiltersProps {
  search: string;
  category: MovieCategory;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: MovieCategory) => void;
  onSubmit: () => void;
}

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      aria-label="search-form"
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4"
    >

      {/* Search bar */}
      <input
        className="border p-2 rounded w-full md:flex-grow bg-white dark:bg-gray-700 dark:text-gray-100"
        placeholder="Search movie..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Category buttons */}
      <div className="flex flex-wrap gap-2 md:flex-nowrap md:shrink-0">
        {categories.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => onCategoryChange(c.value)}
            className={`
              px-3 py-1 rounded w-full md:w-auto
              ${category === c.value
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}
            `}
          >
            {c.label}
          </button>
        ))}
      </div>
    </form>
  );
};

export default MovieFilters;
