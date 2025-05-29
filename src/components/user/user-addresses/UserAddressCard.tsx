import { motion } from "framer-motion";
import { BiCheckShield, BiHome, BiEdit, BiTrash } from "react-icons/bi";

type Address = {
  id: string;
  name: string;
  receiver: string;
  phone: string;
  city: string;
  address: string;
  postalCode: string;
  isDefault: boolean;
};

type UserAddressCardProps = {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
};

export default function UserAddressCard({
  address,
  onEdit,
  onDelete,
}: UserAddressCardProps) {
  return (
    <motion.div
      layout
      key={address.id}
      className='border border-darker/20 bg-lighter shadow rounded-xl p-4 relative'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}>
      {address.isDefault && (
        <span className='absolute top-2 left-2 bg-tusi/10 text-tusi text-xs px-2 py-1 rounded-full flex items-center gap-1'>
          <BiCheckShield className='w-4 h-4' />
          آدرس پیش‌فرض
        </span>
      )}

      <div className='flex items-center gap-2 text-tusi mb-2'>
        <BiHome className='w-5 h-5' />
        <h2 className='text-md font-semibold'>{address.name}</h2>
      </div>

      <p className='text-sm text-darker/80'>
        گیرنده: {address.receiver}
        <br />
        شماره تماس: {address.phone}
        <br />
        شهر: {address.city}
        <br />
        آدرس: {address.address}
        <br />
        کد پستی: {address.postalCode}
      </p>

      <div className='flex justify-end mt-4 gap-2 text-sm'>
        <button
          onClick={() => onEdit(address)}
          className='px-3 py-1 bg-darker/10 text-darker rounded hover:bg-darker/20 flex items-center gap-1 transition'>
          <BiEdit />
          ویرایش
        </button>
        <button
          onClick={() => onDelete(address)}
          className='px-3 py-1 bg-[#8b0000]/10 text-[#8b0000] rounded hover:bg-[#8b0000]/20 flex items-center gap-1 transition'>
          <BiTrash />
          حذف
        </button>
      </div>
    </motion.div>
  );
}
