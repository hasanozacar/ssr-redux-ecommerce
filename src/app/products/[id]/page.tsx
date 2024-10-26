"use client";
import { useSelector } from "react-redux";
import { selectAllProducts } from "@/store/slices/products";
import { useParams, useRouter } from "next/navigation";
import DOMPurify from "dompurify";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const products = useSelector(selectAllProducts);
  const product = products.find((p) => p.id === parseInt(id as string));

  if (!product) {
    return <div className="text-center text-red-500">Ürün bulunamadı</div>;
  }

  const sanitizedDescription = DOMPurify.sanitize(product.description);

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-4">{product.title}</h1>
      <div className="flex justify-center mb-4">
        <img src={product.image} alt={product.title} className="w-64 h-64 object-contain rounded-lg" />
      </div>
      <div className="text-center mb-4">
        <p className="text-xl font-semibold text-gray-800">{product.price}₺</p>
        <p className="text-yellow-500 font-medium">
          Rating: {product.rating.rate} ({product.rating.count} oy)
        </p>
      </div>

      <div className="text-gray-700 leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => router.back()}
          className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Geri
        </button>
        <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">Sepete Ekle</button>
      </div>
    </div>
  );
}
