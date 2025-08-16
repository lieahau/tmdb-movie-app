import { fireEvent, render, screen, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { tmdb } from "../api/tmdb";

jest.mock("../api/tmdb", () => ({
  tmdb: {
    get: jest.fn(),
  },
}));

const mockMovies = [
  { id: 1, title: "Movie A", release_date: "2024-01-01", poster_path: "/imgA.jpg" },
  { id: 2, title: "Movie B", release_date: "2024-01-01", poster_path: "/imgB.jpg" },
];

const renderWithRouter = async (ui: React.ReactElement) => await act(async () => render(<BrowserRouter>{ui}</BrowserRouter>));

describe("Home page", () => {
  beforeEach(() => {
    (tmdb.get as jest.Mock).mockResolvedValue({ data: { results: mockMovies } });
  });

  test("renders search input", async () => {
    await renderWithRouter(<Home />);
    const inputElement = screen.getByPlaceholderText("Search movie...");
    expect(inputElement).toBeInTheDocument();
  });

  test("renders movies after fetch", async () => {
    await renderWithRouter(<Home />);

    expect(await screen.findByText("Movie A")).toBeInTheDocument();
    expect(screen.getByText("Movie B")).toBeInTheDocument();
  });

  test("triggers new fetch when category is changed", async () => {
    await renderWithRouter(<Home />);

    const popularButton = screen.getByText("Popular");

    await act(async () => {
      fireEvent.click(popularButton);
    });

    expect(tmdb.get).toHaveBeenCalledWith("/movie/popular", { params: { page: 1 } });
  });
});
