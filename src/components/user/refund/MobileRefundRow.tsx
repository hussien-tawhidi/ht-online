// components/RefundTable/MobileRefundCard.tsx
"use client";

import {
  PiCaretDownThin,
  PiCaretUpThin,
  PiDownloadSimpleThin,
} from "react-icons/pi";
import { useRouter } from "next/navigation";

interface Refund {
  id: string;
  refundAmount: number;
  refundReason: string;
  orderDate: string;
  product: { name: string };
  status: string;
}

interface Props {
  refund: Refund;
  expandedRow: string | null;
  handleToggleRow: (id: string) => void;
  getStatusBadge: (status: string) => React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
}

export default function MobileRefundRow({
  refund,
  expandedRow,
  handleToggleRow,
  getStatusBadge,
  session,
}: Props) {
  const router = useRouter();

  return (
    <tr className='md:hidden'>
      <td colSpan={6} className='p-3'>
        <div className='bg-white shadow rounded-lg p-4 space-y-2 border border-darker/20'>
          <div className='flex justify-between items-center'>
            <span className='font-bold text-gray-800'>
              {refund.product.name}
            </span>
            <button onClick={() => handleToggleRow(refund.id)}>
              {expandedRow === refund.id ? (
                <PiCaretUpThin />
              ) : (
                <PiCaretDownThin />
              )}
            </button>
          </div>
          <p className='text-sm text-gray-500'>
            <strong>مبلغ:</strong> {refund.refundAmount.toLocaleString()} تومان
          </p>
          <p className='text-sm text-gray-500'>
            <strong>وضعیت:</strong> {getStatusBadge(refund.status)}
          </p>
          <button
            onClick={() =>
              router.push(
                `/user/${session.data?.user?.name}/refunds/${refund.id}`
              )
            }
            className='inline-flex items-center gap-1 text-darker bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded text-xs transition'
            title='دریافت فاکتور PDF'>
            <PiDownloadSimpleThin className='w-4 h-4' />
            دانلود فاکتور
          </button>

          {expandedRow === refund.id && (
            <div className='pt-3 border-t text-sm text-gray-600 space-y-1'>
              <p>
                <strong>دلیل بازپرداخت:</strong> {refund.refundReason || "—"}
              </p>
              <p>
                <strong>تاریخ سفارش:</strong> {refund.orderDate || "—"}
              </p>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
