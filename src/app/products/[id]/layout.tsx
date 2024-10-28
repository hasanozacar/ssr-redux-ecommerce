import productPaths from "../../../store/slices/paths";
import { ReactNode } from "react";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-4">Ürün Detayları</h2>
      {children}
    </div>
  );
}
// Dynamic paths
export async function generateStaticParams() {
  const response = await fetch(productPaths.fetchProducts);
  const data = await response.json();

  const paths = data.map((product: { id: number }) => ({
    id: product.id.toString(),
  }));

  return paths; 
}
