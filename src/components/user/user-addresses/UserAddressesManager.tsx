"use client"

import { useState } from "react";
import UserAddressCard from "./UserAddressCard";

import { AddressForm } from "./AddressForm";
import { AddressModal } from "./AddressModal";
import { initialAddresses } from "../data";

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

export default function UserAddressesManager() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [deleteAddress, setDeleteAddress] = useState<Address | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Set default address handler
  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  // Delete address handler
  const handleConfirmDelete = () => {
    if (!deleteAddress) return;
    setAddresses((prev) => prev.filter((addr) => addr.id !== deleteAddress.id));
    setDeleteAddress(null);
  };

  // Save edited or new address handler
  const handleSaveAddress = (address: Address) => {
    if (editAddress) {
      // Editing existing
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === address.id ? address : addr))
      );
      setEditAddress(null);
    } else {
      // Adding new
      setAddresses((prev) => [
        ...prev,
        { ...address, id: Date.now().toString() },
      ]);
      setIsAddingNew(false);
    }

    if (address.isDefault) {
      handleSetDefault(address.id);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <button
        onClick={() => setIsAddingNew(true)}
        className='mb-6 px-4 py-2 bg-tusi text-lighter rounded hover:bg-tusi/90 transition'>
        افزودن آدرس جدید
      </button>

      <div className='grid gap-4 md:grid-cols-2'>
        {addresses.map((addr) => (
          <UserAddressCard
            key={addr.id}
            address={addr}
            onEdit={setEditAddress}
            onDelete={setDeleteAddress}
          />
        ))}
      </div>

      {/* Edit/Add AddressModal */}
      <AddressModal
        isOpen={!!editAddress || isAddingNew}
        onClose={() => {
          setEditAddress(null);
          setIsAddingNew(false);
        }}
        title={editAddress ? "ویرایش آدرس" : "افزودن آدرس جدید"}>
        <AddressForm
          initialData={editAddress}
          onSave={handleSaveAddress}
          onCancel={() => {
            setEditAddress(null);
            setIsAddingNew(false);
          }}
        />
      </AddressModal>

      {/* Delete Confirmation AddressModal */}
      <AddressModal
        isOpen={!!deleteAddress}
        onClose={() => setDeleteAddress(null)}
        title='حذف آدرس'>
        <p>آیا از حذف این آدرس مطمئن هستید؟</p>
        <div className='mt-4 flex justify-end gap-2'>
          <button
            onClick={() => setDeleteAddress(null)}
            className='px-4 py-2 rounded bg-darker/20 hover:bg-darker/30'>
            لغو
          </button>
          <button
            onClick={handleConfirmDelete}
            className='px-4 py-2 rounded bg-[#8b0000]/70 text-lighter hover:bg-[#8b0000]'>
            حذف
          </button>
        </div>
      </AddressModal>
    </div>
  );
}
