import ProductDetails from "@/components/product-details/ProductDetails";

type PageProps = {
  params: {
    productId: string;
  };
};

export default async function ProductDetailsPage({ params }: PageProps) {
  return <ProductDetails productId={params.productId} />;
}
