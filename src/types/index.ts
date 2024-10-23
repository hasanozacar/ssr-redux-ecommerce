export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export interface ErrorProps {
  message: string;
}
export interface ProductsState {
  entities: {
    products: { [key: string]: Product };
  };
  ids: number[];
  loading: boolean;
  error: string | null;
}
