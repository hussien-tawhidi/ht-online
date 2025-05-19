import ProductDetails from "@/components/product-details/ProductDetails";
import { sampleProducts } from "@/products-samples";
import { Metadata } from "next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductDetailsPage({ params }: any) {
  return (
    <>
      <ProductDetails productId={params.productId} />
    </>
  );
}
export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  const product = sampleProducts.find((item) => item._id === params.productId);

  return {
    title: product?.name,
    description: `مشخصات و جزئیات محصول ${product?.name}`,
  };
}
