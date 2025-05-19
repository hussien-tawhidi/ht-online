"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import PromoCode from "@/components/cart/PromoCode";
import GiftWrap from "@/components/cart/GiftWrap";
import Donation from "@/components/cart/Donation";
import CartNote from "@/components/cart/CartNode";

export default function UserCart() {
  const [isClient, setIsClient] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [cartNote, setCartNote] = useState("");
  const [giftWrap, setGiftWrap] = useState(false);
  const [donation, setDonation] = useState(false);
  const [discount, setDiscount] = useState(0);

  const cartItem = useSelector((state: RootState) => state.cart.items);
  useEffect(() => setIsClient(true), []);
  const router = useRouter();

  const totalPrice = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalQuantity = cartItem.reduce((acc, item) => acc + item.quantity, 0);
  const freeShippingThreshold = 500000;
  const remainingForFreeShipping = freeShippingThreshold - totalPrice;

  useEffect(() => {
    if (promoCode === "OFF20") {
      setDiscount(0.2); // Apply 20% discount
    } else {
      setDiscount(0);
    }
  }, [promoCode]);

  const handleCheckout = () => {
    if (cartItem.length === 0) {
      alert("Your cart is empty. Please add items before proceeding.");
      return;
    }
    router.push("/checkout");
  };

  const finalTotal = totalPrice - totalPrice * discount;

  if (!isClient) return null;

  return (
    <div className='p-4 mt-20'>
      <h1 className='text-2xl font-bold mb-6 text-tusi'>سبد خرید شما</h1>

      {cartItem.length === 0 ? (
        <>
          <p className='text-tusi text-center mb-4'>سبد خرید شما خالی است</p>
          <button
            onClick={() => router.push("/")}
            className='mx-auto block bg-tusi text-lighter px-4 py-2 rounded-md hover:bg-tusi/90 transition'>
            ادامه خرید
          </button>
        </>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Cart Items */}
          <div className='lg:col-span-2 space-y-4'>
            {cartItem.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          <div className='rounded-xl p-5 shadow-md sticky top-24 h-fit'>
            <CartSummary
              cartItemLength={cartItem.length}
              totalQuantity={totalQuantity}
              totalPrice={totalPrice}
              discount={discount}
              finalTotal={finalTotal}
              remainingForFreeShipping={remainingForFreeShipping}
            />
            <PromoCode promoCode={promoCode} setPromoCode={setPromoCode} />
            <GiftWrap giftWrap={giftWrap} setGiftWrap={setGiftWrap} />
            <Donation donation={donation} setDonation={setDonation} />
            <CartNote cartNote={cartNote} setCartNote={setCartNote} />
            <button
              onClick={handleCheckout}
              className='mt-6 w-full bg-tusi hover:bg-tusi/90 text-lighter py-3 rounded-lg text-sm font-medium transition shadow-sm disabled:opacity-50'>
              ادامه فرآیند خرید
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
