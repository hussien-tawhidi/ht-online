type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export function AddressModal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className='fixed inset-0 bg-darker/40 flex items-center justify-center z-50'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-lighter rounded-lg p-6 max-w-md w-full shadow-lg'>
        {title && <h3 className='text-xl font-semibold mb-4'>{title}</h3>}
        {children}
        <button
          onClick={onClose}
          className='mt-6 px-4 py-2 bg-darker/20 rounded hover:bg-darker/30'>
          بستن
        </button>
      </div>
    </div>
  );
}
