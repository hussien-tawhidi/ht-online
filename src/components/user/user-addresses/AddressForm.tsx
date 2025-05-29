"use client";

import { useState } from "react";
import { AddressType } from "../data";
import AddressInputField from "./AddressInputField";

type AddressFormProps = {
  initialData?: AddressType | null;
  onSave: (address: AddressType) => void;
  onCancel: () => void;
};

export function AddressForm({
  initialData,
  onSave,
  onCancel,
}: AddressFormProps) {
  const [form, setForm] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    receiver: initialData?.receiver || "",
    phone: initialData?.phone || "",
    city: initialData?.city || "",
    address: initialData?.address || "",
    postalCode: initialData?.postalCode || "",
    isDefault: initialData?.isDefault || false,
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation (add more if needed)
    if (
      !form.name ||
      !form.receiver ||
      !form.phone ||
      !form.city ||
      !form.address
    ) {
      alert("لطفا همه فیلدهای ضروری را پر کنید.");
      return;
    }

    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 text-right'>
      <div className='grid md:grid-cols-2 gap-4'>
        <AddressInputField
          label='نام آدرس'
          name='name'
          value={form.name}
          onChange={handleChange}
          placeholder='مثلا: خانه، محل کار'
          required
        />

        <AddressInputField
          label='نام گیرنده'
          name='receiver'
          value={form.receiver}
          onChange={handleChange}
          required
        />

        <AddressInputField
          label='شماره تماس'
          name='phone'
          type='tel'
          value={form.phone}
          onChange={handleChange}
          placeholder='مثلا: 09123456789'
          required
          pattern='[0-9]{10,}'
        />

        <AddressInputField
          label='شهر'
          name='city'
          value={form.city}
          onChange={handleChange}
          required
        />

        <div className='md:col-span-2'>
          <AddressInputField
            label='آدرس کامل'
            name='address'
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className='md:col-span-2'>
          <AddressInputField
            label='کد پستی'
            name='postalCode'
            value={form.postalCode}
            onChange={handleChange}
            placeholder='اختیاری'
          />
        </div>
      </div>

      <div className='flex items-center gap-2 mt-2'>
        <input
          id='defaultAddress'
          type='checkbox'
          name='isDefault'
          checked={form.isDefault}
          onChange={handleChange}
          className='w-4 h-4 accent-tusi'
        />
        <label htmlFor='defaultAddress' className='text-sm font-medium'>
          این آدرس را به عنوان پیش‌فرض تنظیم کن
        </label>
      </div>

      <div className='flex justify-end gap-3 pt-6 border-t border-darker/10 mt-4'>
        <button
          type='button'
          onClick={onCancel}
          className='px-4 py-2 rounded bg-darker/10 hover:bg-darker/30 transition'>
          لغو
        </button>
        <button
          type='submit'
          className='px-4 py-2 rounded bg-tusi text-lighter hover:bg-tusi/90 transition'>
          ذخیره
        </button>
      </div>
    </form>
  );
}
