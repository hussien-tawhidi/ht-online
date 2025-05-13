interface CartNoteProps {
  cartNote: string;
  setCartNote: React.Dispatch<React.SetStateAction<string>>;
}

export default function CartNote({ cartNote, setCartNote }: CartNoteProps) {
  return (
    <div className='text-sm mt-3'>
      <label className='block mb-1 text-tusi'>یادداشت برای سفارش</label>
      <textarea
        rows={2}
        value={cartNote}
        onChange={(e) => setCartNote(e.target.value)}
        placeholder='مثلاً: لطفاً عصر ارسال شود'
        className='w-full border border-tusi/20 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-tusi resize-none'
      />
    </div>
  );
}
