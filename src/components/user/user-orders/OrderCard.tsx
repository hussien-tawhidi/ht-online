"use client";

import { useState } from "react";
import OrderCardHeader from "./OrderCardHeader";
import OrderCardActions from "./OrderCardActions";

export type OrderStatus = "delivered" | "pending" | "cancelled";

export interface OrderCardProps {
  id: string;
  date: string;
  items: number;
  total: string;
  status: OrderStatus;
  customer: string;
}

const OrderCard = ({ id, date, items, total, status }: OrderCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='p-4 border border-darker/10 rounded-lg shadow-sm bg-white'>
      <OrderCardHeader
        id={id}
        date={date}
        items={items}
        total={total}
        status={status}
        isOpen={isOpen}
        toggleOpen={() => setIsOpen((prev) => !prev)}
      />

      {isOpen && (
        <div className='mt-4 text-sm text-darker/80'>
          <OrderCardActions orderId={id} status={status} isOpen={isOpen}/>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
