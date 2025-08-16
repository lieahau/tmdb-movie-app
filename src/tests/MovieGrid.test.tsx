import { screen } from "@testing-library/react";
import { mockMovies } from "./mockdata";
import { renderWithRouter } from "./test-utils";
import MovieGrid from "../components/MovieGrid";

describe("MovieGrid", () => {
  it("renders a list of movies", async () => {
    await renderWithRouter(<MovieGrid movies={mockMovies} />);
    
    expect(screen.getByText("Movie A")).toBeInTheDocument();
    expect(screen.getByText("Movie B")).toBeInTheDocument();
    
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(3);
  });
});