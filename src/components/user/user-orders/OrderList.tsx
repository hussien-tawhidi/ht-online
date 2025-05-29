"use client";

import OrderCard from "./OrderCard";
import { FC } from "react";

interface OrderListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orders: any[];
}

const OrderList: FC<OrderListProps> = ({ orders }) => {
  if (orders.length === 0) {
    return <p className='text-center text-darker/60 mt-10'>سفارشی یافت نشد.</p>;
  }

  return (
    <div className='space-y-6'>
      {orders.map((order) => (
        <OrderCard
          customer={order.customer}
          key={order._id}
          id={order._id}
          date={new Date(order.date).toLocaleDateString("fa-IR")}
          items={order.items?.length || 0}
          total={new Intl.NumberFormat("fa-IR", {
            style: "currency",
            currency: "IRR",
          }).format(order.total || 0)}
          status={order.status}
        />
      ))}
    </div>
  );
};

export default OrderList;
