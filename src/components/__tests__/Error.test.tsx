import { render, screen } from "@testing-library/react";
import Error from "../Error";
import "@testing-library/jest-dom";


describe("Error Component", () => {
  it("renders the error message correctly", () => {
    const errorMessage = "Bir hata oluştu";

    // Render components
    render(<Error message={errorMessage} />);

    // Check that the error message
    const errorElement = screen.getByText(`Hata: ${errorMessage}`);
    expect(errorElement).toBeInTheDocument();
  });

  it("applies the correct CSS classes", () => {
    const errorMessage = "Bir hata oluştu";

    // Render component
    render(<Error message={errorMessage} />);

    // Check that CSS classes are applied correctly
    const errorElement = screen.getByText(`Hata: ${errorMessage}`);
    expect(errorElement).toHaveClass("text-center", "text-red-500");
  });
});
