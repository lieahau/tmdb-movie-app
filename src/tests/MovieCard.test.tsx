import { screen } from "@testing-library/react";
import { renderWithRouter } from "./test-utils";
import MovieCard from "../components/MovieCard";
import { mockMovies } from "./mockdata";

describe("MovieCard", () => {
  test("renders movie title, release year, and poster", async () => {
    await renderWithRouter(<MovieCard movie={mockMovies[0]} />);
    
    expect(screen.getByText("Movie A")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();

    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img.src).toContain("/imgA.jpg");
    expect(img.alt).toBe("Movie A");
  });

  test("links to the movie detail page", async () => {
    await renderWithRouter(<MovieCard movie={mockMovies[0]} />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/movie/1");
  });
});
