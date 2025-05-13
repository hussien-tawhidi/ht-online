interface GiftWrapProps {
  giftWrap: boolean;
  setGiftWrap: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GiftWrap({ giftWrap, setGiftWrap }: GiftWrapProps) {
  return (
    <label className='flex items-center gap-2 text-sm text-tusi mt-3'>
      <input
        type='checkbox'
        checked={giftWrap}
        onChange={() => setGiftWrap(!giftWrap)}
        className='accent-tusi'
      />
      این سفارش یک هدیه است (بسته‌بندی شود)
    </label>
  );
}
