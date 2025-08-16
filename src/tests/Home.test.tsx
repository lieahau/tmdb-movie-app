import { fireEvent, screen, act } from "@testing-library/react";
import Home from "../pages/Home";
import { renderWithRouter } from "./test-utils";
import { mockMovies } from "./mockdata";
import { getMoviesByCategory, getSearchMovies } from "../api/apiService";

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

    expect(getMoviesByCategory).toHaveBeenCalledWith("popular", 1);
  });

  test("renders more movies on infinite scroll", async () => {
    // Prepare next page mock
    const nextPageMovies = [
      { id: 3, title: "Movie C", release_date: "2023-03-01", poster_path: "/path3.jpg" },
    ];
    (getMoviesByCategory as jest.Mock).mockResolvedValueOnce(nextPageMovies);

    // Scroll to bottom
    await act(async () => {
      window.innerHeight = 1000;
      Object.defineProperty(document.body, "offsetHeight", { value: 1500 });
      window.scrollY = 600;

      window.dispatchEvent(new Event("scroll"));
    });

    // Check new movie is rendered
    expect(await screen.findByText("Movie C")).toBeInTheDocument();
  });
});
