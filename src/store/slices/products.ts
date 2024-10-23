"use client";

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, ProductsState } from "../../types";
import { RootState } from "../../store";
import productPaths from "./paths";
import { normalize, schema, NormalizedSchema } from "normalizr";

//creating Schemas
const productSchema = new schema.Entity("products");
const productListSchema = [productSchema];

const initialState: ProductsState = {
  entities: {
    products: {},
  },
  ids: [],
  loading: false,
  error: null,
};

// API call with createAsyncThunk
export const fetchProducts = createAsyncThunk<NormalizedSchema<{ products: { [key: string]: Product } }, number[]>, void, { rejectValue: string }>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(productPaths.fetchProducts);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Normalize data
      const normalizedData = normalize(data, productListSchema);

      return normalizedData as NormalizedSchema<{ products: { [key: string]: Product } }, number[]>;
    } catch (error:unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Ürünler yüklenirken bir hata oluştu");
      }
      return rejectWithValue("Ürünler yüklenirken bir hata oluştu");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<NormalizedSchema<{ products: { [key: string]: Product } }, number[]>>) => {
        state.loading = false;
        state.entities.products = action.payload.entities.products || {};
        state.ids = action.payload.result || [];
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Ürünler yüklenirken bir hata oluştu";
      });
  },
});

// Selectors
export const selectAllProducts = (state: RootState) => state.products.ids.map((id) => state.products.entities.products[id]);

export default productsSlice.reducer;
