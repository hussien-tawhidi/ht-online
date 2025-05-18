import ProductDetails from "@/components/product-details/ProductDetails";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductDetailsPage({ params }: any) {
  return (
    <>
      <ProductDetails productId={params.productId} />
    </>
  );
}
