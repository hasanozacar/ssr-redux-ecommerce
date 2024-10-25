import { configureStore } from '@reduxjs/toolkit';
import productsReducer, { fetchProducts } from '../slices/products';
import { Product } from '../../types';

describe('productsSlice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });
  });

  it('should handle fetchProducts.pending', () => {
    // pending
    store.dispatch(fetchProducts.pending("")); 

    const state = store.getState().products;
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fetchProducts.fulfilled', () => {
    const examplePayload = {
      entities: {
        products: {
          1: { id: 1, title: 'Product 1', price: 100, description: 'Description 1', category: 'Category 1', image: 'image1.jpg', rating: { rate: 4.5, count: 10 } },
        },
      },
      result: [1],
    };
    
    // fulfilled
    store.dispatch(fetchProducts.fulfilled(examplePayload, '')); 

    const state = store.getState().products;
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.entities.products).toEqual(examplePayload.entities.products);
    expect(state.ids).toEqual(examplePayload.result);
  });

  it('should handle fetchProducts.rejected', () => {
    const errorMessage = 'Hata mesajı';

    // rejected
    store.dispatch(fetchProducts.rejected(new Error(errorMessage), ''));

    const state = store.getState().products;
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Ürünler yüklenirken bir hata oluştu");
  });
});
