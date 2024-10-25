import { render, screen } from "@testing-library/react";
import Loading from "../Loading";


import "@testing-library/jest-dom";

describe("Loading Component", () => {
  it("renders the loading text correctly", () => {
    // Render components
    render(<Loading />);

    // Check that the that message
    const loadingElement = screen.getByText("Yükleniyor...");
    expect(loadingElement).toBeInTheDocument();
  });

  it("applies the correct CSS classes", () => {
    // Bileşeni render et
    render(<Loading />);

    // Check that CSS classes are applied correctly
    const loadingElement = screen.getByText("Yükleniyor...");
    expect(loadingElement).toHaveClass("text-center", "text-2xl");
  });
});
