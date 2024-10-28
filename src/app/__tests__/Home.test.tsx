import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import Home from "../page";
import { store } from "../../store";
import { fetchProducts } from "../../store/slices/products";
import "@testing-library/jest-dom";
import 'whatwg-fetch'; // fetch polyfill

const mockProducts = [
  {
    id: 1,
    title: "Product 1",
    price: 100,
    category: "electronics",
    image: "image1.jpg",
    rating: { rate: 4.5, count: 10 },
  },
  {
    id: 2,
    title: "Product 2",
    price: 200,
    category: "jewelery",
    image: "image2.jpg",
    rating: { rate: 4.0, count: 15 },
  },
];

// Set mock API 
beforeEach(() => {
  fetch.resetMocks();
});

describe("Home Page", () => {
  it("renders loading state initially", () => {
    store.dispatch(fetchProducts.pending(""));
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(screen.getByText("Yükleniyor...")).toBeInTheDocument();
  });

  it("renders error state when fetching fails", async () => {
    fetch.mockReject(new Error("Bir hata oluştu"));

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Hata: Ürünler yüklenirken bir hata oluştu")).toBeInTheDocument();
    });
  });

  it("renders product list correctly", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockProducts));

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      const productElements = screen.getAllByRole("listitem");
      expect(productElements.length).toBe(2);

      // Verify that products name
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("100₺")).toBeInTheDocument();
    });
  });

  it("allows users to filter products by search query", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockProducts));

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText("Ürün ara...");
      fireEvent.change(searchInput, { target: { value: "Product 1" } });
      // Verify that product 
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      // Verify that price of product 
      expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
    });
  });

  it("allows users to sort products by rating", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockProducts));

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      const sortSelect = screen.getByDisplayValue("Puan Artan");
      fireEvent.change(sortSelect, { target: { value: "desc" } });

      const sortedProducts = screen.getAllByRole("listitem");
      // Verify that  sorted products 
      expect(sortedProducts[0]).toHaveTextContent("Product 1");
      expect(sortedProducts[1]).toHaveTextContent("Product 2");
    });
  });

  it("allows users to paginate through products", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockProducts));
  
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  
    // Control Pagination button
    await waitFor(() => {
      const paginationButtons = screen.getAllByRole("button");
      
      //Verify that button of  
      expect(paginationButtons.length).toBeGreaterThan(0);
  
      // Click on the first button of pagination
      fireEvent.click(paginationButtons[0]); 
  
      //Verify that products 
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });
  });
});
