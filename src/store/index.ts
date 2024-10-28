"use client";

import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import productsReducer from "./slices/products";
import { Middleware } from "redux";

// Logger middleware oluştur
const logger = createLogger();

// Example Middleware
const apiMiddleware: Middleware = (store) => (next) => (action) => {
  console.log("API action dispatched:", action);
  return next(action); // Action'ı bir sonraki middleware'e geç
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger,apiMiddleware), // Middleware'leri ekle
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
