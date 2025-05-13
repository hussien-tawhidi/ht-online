import { FiTruck } from "react-icons/fi";

interface ShippingFormProps {
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShippingAddress: (newAddress: any) => void;
}

const ShippingForm = ({
  shippingAddress,
  setShippingAddress,
  handleSubmit,
}: ShippingFormProps) => {
  return (
    <div className='bg-white rounded-xl shadow-sm border border-darker/10 p-6 mb-6'>
      <h2 className='text-xl font-bold text-darker mb-6 flex items-center gap-2'>
        <FiTruck className='text-tusi' />
        اطلاعات ارسال
      </h2>
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <label htmlFor='name' className='text-sm text-darker/80 mb-1'>
            نام کامل<span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='name'
            value={shippingAddress.name}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                name: e.target.value,
              })
            }
            className='border border-darker/20 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-tusi/50 focus:border-tusi transition-all'
            placeholder='نام و نام خانوادگی'
            required
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='phone' className='text-sm text-darker/80 mb-1'>
            شماره موبایل<span className='text-red-500'>*</span>
          </label>
          <input
            type='tel'
            id='phone'
            value={shippingAddress.phone}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                phone: e.target.value,
              })
            }
            className='border border-darker/20 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-tusi/50 focus:border-tusi transition-all'
            placeholder='09xxxxxxxxx'
            required
          />
        </div>

        <div className='flex flex-col md:col-span-2'>
          <label htmlFor='address' className='text-sm text-darker/80 mb-1'>
            آدرس کامل<span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='address'
            value={shippingAddress.address}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                address: e.target.value,
              })
            }
            className='border border-darker/20 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-tusi/50 focus:border-tusi transition-all'
            placeholder='خیابان، کوچه، پلاک، واحد'
            required
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='city' className='text-sm text-darker/80 mb-1'>
            شهر<span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='city'
            value={shippingAddress.city}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                city: e.target.value,
              })
            }
            className='border border-darker/20 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-tusi/50 focus:border-tusi transition-all'
            placeholder='شهر محل سکونت'
            required
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='postalCode' className='text-sm text-darker/80 mb-1'>
            کد پستی
          </label>
          <input
            type='text'
            id='postalCode'
            value={shippingAddress.postalCode}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                postalCode: e.target.value,
              })
            }
            className='border border-darker/20 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-tusi/50 focus:border-tusi transition-all'
            placeholder='1234567890'
          />
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
