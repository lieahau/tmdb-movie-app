import { fireEvent, screen } from "@testing-library/react";
import MovieDetail from "../pages/MovieDetail";
import { getMovieDetail, getPosterUrl } from "../api/apiService";
import { renderWithRouter } from "./test-utils";
import { mockMovie } from "./mockdata";

jest.mock("../api/apiService", () => ({
  getMovieDetail: jest.fn(),
}));

describe("MovieDetail", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    (getMovieDetail as jest.Mock).mockResolvedValue(mockMovie);
    await renderWithRouter(<MovieDetail />);
    const imgs = screen.getAllByRole("img");
    imgs.forEach((img) => fireEvent.load(img));
  });

  test("renders movie detail after fetching data", async () => {
    expect(await screen.findByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("Test Overview")).toBeInTheDocument();
  });

  test("uses placeholder image when poster_path is null", async () => {
    const img = await screen.findByRole("img") as HTMLImageElement;
    expect(img.src).toContain("/No-Image-Placeholder.png");
  });

  test("shows error message on fetch failure", async () => {
    (getMovieDetail as jest.Mock).mockRejectedValueOnce(new Error("fail"));

    await renderWithRouter(<MovieDetail />);

    expect(
      await screen.findByText("Failed to fetch movie details.")
    ).toBeInTheDocument();
  });
});
