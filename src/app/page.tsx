"use client";
//#region Imports
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "../store/slices/products";
import { AppDispatch, RootState } from "../store/index";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Head from "next/head";
import Link from "next/link";
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

  //  Filtering operations are optimized with useMemo
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearchQuery = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchesPrice = (minPrice !== "" ? product.price >= minPrice : true) && (maxPrice !== "" ? product.price <= maxPrice : true);

      return matchesSearchQuery && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, minPrice, maxPrice]);

  // Sorting  operations are optimized with useMemo
  const sortedProducts = useMemo(() => {
    const productsCopy = [...filteredProducts]; 
    return productsCopy.sort((a, b) => {
      const rateA = a?.rating?.rate || 0;
      const rateB = b?.rating?.rate || 0;
  
      return sortOrder === "asc" ? rateA - rateB : rateB - rateA;
    });
  }, [filteredProducts, sortOrder]);

  // Pagination işlemleri
  const totalProducts = sortedProducts.length; 
  const totalPages = Math.ceil(totalProducts / productsPerPage); 
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // Pagination operations are optimized with useMemo
  const currentProducts = useMemo(() => {
    return sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [sortedProducts, currentPage, productsPerPage]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <>
      {/* SEO */}
      <Head>
        <title>Ürün Listesi - Online Mağaza</title>
        <meta name="description" content="Online mağazamızda çeşitli kategorilerde ürünleri inceleyin." />
        <meta name="keywords" content="ürünler, alışveriş, elektronik, takı, erkek giyim, kadın giyim" />
        <meta name="robots" content="index, follow" />
      </Head>

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
              <Link href={`/products/${product.id}`} prefetch={false}>
               <img
                src={product.image}
                alt={product.title}
                loading="lazy"  // Lazily Loading Images:
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-500 font-medium">{product.price}₺</p>
              <p className="text-yellow-500 font-medium">
                Rating: {product.rating.rate} ({product.rating.count} oy)
              </p>
               </Link>

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
    </>
  );
}
