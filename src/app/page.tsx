"use client";
//#region Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "../store/slices/products";
import { AppDispatch, RootState } from "../store/index";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
//#endregion

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  //#region States
  const products = useSelector(selectAllProducts);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1); // Sayfa durumu
  const productsPerPage = 8;
  //#endregion

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //  Filtering Products
  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPrice = (minPrice !== "" ? product.price >= minPrice : true) && (maxPrice !== "" ? product.price <= maxPrice : true);

    return matchesSearchQuery && matchesCategory && matchesPrice;
  });

  // Sorting
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.rating.rate - b.rating.rate; // Yükselen sıraya göre sıralama
    } else {
      return b.rating.rate - a.rating.rate; // Azalan sıraya göre sıralama
    }
  });

  //pagination
  const totalProducts = sortedProducts.length; 
  const totalPages = Math.ceil(totalProducts / productsPerPage); 

  // Şu anki sayfadaki ürünleri al
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);



  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Ürün Listesi</h1>
      <div className="flex justify-center mb-6 space-x-4">
        <input
          type="text"
          placeholder="Ürün ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-1/4 p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Tüm Kategoriler</option>
          <option value="electronics">Elektronik</option>
          <option value="jewelery">Takı</option>
          <option value="men's clothing">Erkek Giyim</option>
          <option value="women's clothing">Kadın Giyim</option>
        </select>

        <input
          type="number"
          placeholder="Min Fiyat"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          placeholder="Max Fiyat"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border border-gray-300 rounded-lg"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="w-1/4 p-2 border border-gray-300 rounded-lg"
        >
          <option value="asc">Puan Artan</option>
          <option value="desc">Puan Azalan</option>
        </select>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <li key={product.id} className="border rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-500 font-medium">{product.price}₺</p>
            <p className="text-yellow-500 font-medium">
              Rating: {product.rating.rate} ({product.rating.count} oy)
            </p>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 p-2 rounded-lg ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
