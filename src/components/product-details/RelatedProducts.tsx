import { sampleProducts } from "@/products-samples";
import ProductCarousel from "../home/ProductCarousel";

export default function RelatedProducts({ currentId }: { currentId: string }) {
  const related = sampleProducts.filter((p) => p._id !== currentId).slice(0, 10);

  return <ProductCarousel products={related} title='محصولات مشابه' />;
}
