import Image from "next/image";
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "@/store/slice/cartSlice";

interface CartItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();

  return (
    <div className='flex items-center relative justify-between rounded-lg sm:p-4 p-2 shadow-sm'>
      <div className='flex items-center gap-4'>
        <Image
          src={item.image[0]?.url || "/placeholder.png"}
          alt={item.name}
          width={60}
          height={60}
          className='rounded object-cover'
        />
        <div>
          <h2 className='font-semibold text-tusi'>{item.name}</h2>
          <p className='sm:text-sm text-[10px] text-tusi sm:my-2 my-1'>
            قیمت: {item.price.toLocaleString()} تومان
          </p>
          <div className='flex items-center sm:gap-2 gap-0.5 mt-2  border-tusi justify-between'>
            <button
              onClick={() => dispatch(decreaseQty(item._id))}
              disabled={item.quantity === 1}
              className='sm:p-2 p-1 text-tusi border-tusi cursor-pointer'>
              <AiOutlineMinus />
            </button>
            <motion.span
              key={item.quantity}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.2 }}
              className='sm:w-[20px] w-[10px] text-center font-medium text-tusi'>
              {item.quantity}
            </motion.span>
            <button
              onClick={() => dispatch(increaseQty(item._id))}
              className='sm:p-2 p-1 text-tusi border-tusi cursor-pointer'>
              <AiOutlinePlus />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => dispatch(removeFromCart(item._id))}
        className='p-2 sm:relative absolute top-0 left-0 text-tusi cursor-pointer text-2xl'>
        <MdOutlineDelete />
      </button>
    </div>
  );
}
