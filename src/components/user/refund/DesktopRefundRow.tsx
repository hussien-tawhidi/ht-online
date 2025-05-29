// components/RefundTable/DesktopRefundRow.tsx
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
  index: number;
  expandedRow: string | null;
  handleToggleRow: (id: string) => void;
  getStatusBadge: (status: string) => React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
}

export default function DesktopRefundRow({
  refund,
  index,
  expandedRow,
  handleToggleRow,
  getStatusBadge,
  session,
}: Props) {
  const router = useRouter();

  return (
    <>
      <tr
        className={`hidden md:table-row ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        } hover:bg-blue-50 transition`}>
        <td className='p-3 text-center'>
          <button onClick={() => handleToggleRow(refund.id)}>
            {expandedRow === refund.id ? (
              <PiCaretUpThin />
            ) : (
              <PiCaretDownThin />
            )}
          </button>
        </td>
        <td className='p-3'>{refund.id}</td>
        <td className='p-3 font-medium text-gray-800'>{refund.product.name}</td>
        <td className='p-3 text-gray-600'>
          {refund.refundAmount.toLocaleString()} تومان
        </td>
        <td className='p-3'>{getStatusBadge(refund.status)}</td>
        <td className='p-3'>
          <button
            onClick={() =>
              router.push(
                `/user/${session.data?.user?.name}/refunds/${refund.id}`
              )
            }
            className='inline-flex items-center gap-1 text-darker bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded text-xs transition'
            title='دریافت فاکتور PDF'>
            <PiDownloadSimpleThin className='w-4 h-4' />
            دانلود
          </button>
        </td>
      </tr>

      {/* Expanded content */}
      {expandedRow === refund.id && (
        <tr className='hidden md:table-row bg-blue-50'>
          <td colSpan={6} className='p-4 text-sm text-gray-700'>
            <div className='space-y-2'>
              <p>
                <strong>دلیل بازپرداخت:</strong> {refund.refundReason || "—"}
              </p>
              <p>
                <strong>تاریخ سفارش:</strong> {refund.orderDate || "—"}
              </p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
