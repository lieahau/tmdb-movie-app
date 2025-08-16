import { fireEvent, screen, waitFor } from "@testing-library/react";
import { mockMovies } from "./mockdata";
import { renderWithRouter } from "./test-utils";
import MovieGrid from "../components/MovieGrid";

describe("MovieGrid", () => {
  beforeEach(async () => {
    await renderWithRouter(<MovieGrid movies={mockMovies} />);
    const imgs = screen.getAllByRole("img");
    imgs.forEach((img) => fireEvent.load(img));
  });

  it("renders a list of movies", () => {
    expect(screen.getByText("Movie A")).toBeInTheDocument();
    expect(screen.getByText("Movie B")).toBeInTheDocument();

    const imgs = screen.getAllByRole("img");
    expect(imgs.length).toBe(3);
  });
});
