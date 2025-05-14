import ProductDetails from "@/components/product-details/ProductDetails";

export default function productDetailsPage({
  params,
}: {
  params: { productId: string };
}) {
  return <ProductDetails productId={params.productId} />;
}
