"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CheckoutProgress from "@/components/checkout/CheckoutProgress";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import OrderSummary from "@/components/checkout/OrderSummary";
import { RootState } from "@/store/store";

export default function Checkout() {
  const cartItem = useSelector((state: RootState) => state.cart.items);
  const [checkout, setCheckout] = useState({
    shippingAddress: {
      name: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
    },
    paymentMethod: "creditCard",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const totalPrice = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { shippingAddress } = checkout;

    if (
      !shippingAddress.name ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.phone
    ) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/order-success");
    }, 2000);
  };
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // Render nothing (or a skeleton) on the server
    return null;
  }

  return (
    <div className='max-w-6xl mx-auto p-4 md:p-6 mt-20'>
      {/* Progress Indicator */}
      <CheckoutProgress currentStep={1} />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left Column */}
        <div className='lg:col-span-2'>
          <ShippingForm
            handleSubmit={handleSubmit}
            shippingAddress={checkout.shippingAddress}
            setShippingAddress={(newAddress) =>
              setCheckout({ ...checkout, shippingAddress: newAddress })
            }
          />
          <PaymentMethod
            paymentMethod={checkout.paymentMethod}
            setPaymentMethod={(newMethod) =>
              setCheckout({ ...checkout, paymentMethod: newMethod })
            }
          />
        </div>

        {/* Right Column */}
        <div className='lg:col-span-1'>
          <OrderSummary
            cartItems={cartItem}
            totalPrice={totalPrice}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
