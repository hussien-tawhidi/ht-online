interface PromoCodeProps {
  promoCode: string;
  setPromoCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function PromoCode({ promoCode, setPromoCode }: PromoCodeProps) {
  return (
    <div className='text-sm text-tusi mt-5'>
      <label className='block mb-1'>کد تخفیف دارید؟</label>
      <input
        type='text'
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        placeholder='مثلاً OFF20'
        className='w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-tusi'
      />
    </div>
  );
}
