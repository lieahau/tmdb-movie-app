import { fireEvent, screen, act } from "@testing-library/react";
import Home from "../pages/Home";
import { tmdb } from "../api/tmdb";
import { renderWithRouter } from "./test-utils";
import { mockMovies } from "./mockdata";

jest.mock("../api/tmdb", () => ({
  tmdb: {
    get: jest.fn(),
  },
}));

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

    await act(async () => fireEvent.click(popularButton));

    expect(tmdb.get).toHaveBeenCalledWith("/movie/popular", { params: { page: 1 } });
  });
});
