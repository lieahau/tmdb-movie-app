import { screen, fireEvent } from "@testing-library/react";
import { MovieCategory } from "../types/enum";
import MovieFilters from "../components/MovieFilters";
import { renderWithRouter } from "./test-utils";

describe("MovieFilters", () => {
  const mockOnSearchChange = jest.fn();
  const mockOnCategoryChange = jest.fn();
  const mockOnSubmit = jest.fn();

  const defaultProps = {
    search: "",
    category: MovieCategory.NowPlaying,
    onSearchChange: mockOnSearchChange,
    onCategoryChange: mockOnCategoryChange,
    onSubmit: mockOnSubmit,
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await renderWithRouter(<MovieFilters {...defaultProps} />);
  });

  test("renders search input and category buttons", () => {
    expect(screen.getByPlaceholderText("Search movie...")).toBeInTheDocument();
    expect(screen.getByText("Now Playing")).toBeInTheDocument();
    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText("Top Rated")).toBeInTheDocument();
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
  });

  test("calls onSearchChange when typing in search input", () => {
    const input = screen.getByPlaceholderText("Search movie...");
    fireEvent.change(input, { target: { value: "Matrix" } });
    expect(mockOnSearchChange).toHaveBeenCalledWith("Matrix");
  });

  test("calls onSubmit when form is submitted", () => {
    const form = screen.getByLabelText("search-form");
    if (form) fireEvent.submit(form);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test("calls onCategoryChange when a category button is clicked", () => {
    fireEvent.click(screen.getByText("Popular"));
    expect(mockOnCategoryChange).toHaveBeenCalledWith(MovieCategory.Popular);
  });

  test("highlights the active category button", () => {
    const activeButton = screen.getByText("Now Playing");
    expect(activeButton).toHaveClass("bg-gray-800 text-white");
  });
});
