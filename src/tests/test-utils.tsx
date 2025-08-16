import { ReactElement } from "react";
import { act, render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = async (ui: ReactElement, options?: RenderOptions) => 
    await act(async () => render(<BrowserRouter>{ui}</BrowserRouter>, options));

export { renderWithRouter };
