import { render, screen, fireEvent } from "@testing-library/react";
import { StatusMessage } from "../components/StatusMessage";

describe("StatusMessage", () => {
  test("renders loading message", () => {
    render(<StatusMessage loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error message and calls onRetry when clicked", () => {
    const onRetry = jest.fn();
    render(<StatusMessage error="Something failed" onRetry={onRetry} />);

    expect(screen.getByText("Something failed")).toBeInTheDocument();

    const retryBtn = screen.getByText("Retry");
    fireEvent.click(retryBtn);
    expect(onRetry).toHaveBeenCalled();
  });

  test("renders 'No movies found' when noData is true", () => {
    render(<StatusMessage noData />);
    expect(screen.getByText("No movies found.")).toBeInTheDocument();
  });

  test("renders nothing when no flags are provided", () => {
    const { container } = render(<StatusMessage />);
    expect(container.firstChild).toBeNull();
  });
});
