import { fireEvent, screen, act } from "@testing-library/react";
import Home from "../pages/Home";
import { renderWithRouter } from "./test-utils";
import { mockMovies } from "./mockdata";
import { getMoviesByCategory, getSearchMovies } from "../api/apiService";
import { MovieCategory } from "../types/enum";

jest.mock("../api/apiService", () => ({
  getMoviesByCategory: jest.fn(),
  getSearchMovies: jest.fn(),
}));

describe("Home page", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    (getMoviesByCategory as jest.Mock).mockResolvedValue(mockMovies);
    (getSearchMovies as jest.Mock).mockResolvedValue(mockMovies);
    await renderWithRouter(<Home />);
  });

  test("renders Home component and movie grid", async () => {
    // Check movie cards are rendered
    expect(await screen.findByText("Movie A")).toBeInTheDocument();
    expect(screen.getByText("Movie B")).toBeInTheDocument();
  });

  test("triggers new fetch when category is changed", async () => {
    const popularButton = screen.getByText("Popular");

    await act(async () => fireEvent.click(popularButton));

    expect(getMoviesByCategory).toHaveBeenCalledWith(MovieCategory.Popular, 1);
  });

  test("loads more movies when scrolling to bottom", async () => {
    // Mock next page data
    const nextPageMovies = [
      { id: 3, title: "Movie C", release_date: "2023-03-01", poster_path: "/path3.jpg" },
    ];
    (getMoviesByCategory as jest.Mock).mockResolvedValueOnce(nextPageMovies);

    // Simulate scroll to bottom
    await act(async () => {
      Object.defineProperty(window, "innerHeight", { value: 1000, writable: true });
      Object.defineProperty(document.body, "offsetHeight", { value: 1500, writable: true });
      Object.defineProperty(window, "scrollY", { value: 600, writable: true });

      window.dispatchEvent(new Event("scroll"));
    });

    // Expect new movies to appear
    expect(await screen.findByText("Movie C")).toBeInTheDocument();

    // Ensure API was called for page 2
    expect(getMoviesByCategory).toHaveBeenCalledWith(MovieCategory.NowPlaying, 2);
  });

  test("shows error message when API fails", async () => {
    (getMoviesByCategory as jest.Mock).mockRejectedValueOnce(new Error("fail"));

    await renderWithRouter(<Home />);

    expect(await screen.findByText("Failed to fetch movies. Please try again.")).toBeInTheDocument();
  });

  test("loads again when Retry button is clicked", async () => {
    (getMoviesByCategory as jest.Mock)
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValueOnce(mockMovies);

    await renderWithRouter(<Home />);

    const retryBtn = await screen.findByText("Retry");

    await act(async () => fireEvent.click(retryBtn));

    expect(getMoviesByCategory).toHaveBeenCalledTimes(3);
  });
});
