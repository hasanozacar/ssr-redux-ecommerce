'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectAllProducts } from '../store/slices/products';
import { AppDispatch, RootState } from '../store/index';



export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectAllProducts);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">Ürün Listesi</h1>
      <ul className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p>{product.price}₺</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
