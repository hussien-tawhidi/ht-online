interface DonationProps {
  donation: boolean;
  setDonation: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Donation({ donation, setDonation }: DonationProps) {
  return (
    <label className='flex items-center gap-2 text-sm text-tusi mt-3'>
      <input
        type='checkbox'
        checked={donation}
        onChange={() => setDonation(!donation)}
        className='accent-tusi'
      />
      می‌خواهید ۱۰۰۰ تومان به خیریه اهدا کنید؟
    </label>
  );
}
