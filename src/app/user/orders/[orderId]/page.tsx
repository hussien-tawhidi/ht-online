import OrderDetails from "@/components/user/user-orders/order-download/OrderDetails";

export default async function OrderDetailsPage({
  params,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  const orderId = await params.orderId;
  return <OrderDetails orderId={orderId} />;
}
