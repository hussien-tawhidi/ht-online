"use client";
import { useEffect, useState } from "react";
import OrderInvoicePDF from "@/components/user/user-orders/order-download/OrderInvoicePDF";
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer";
import { generateQrCode } from "@/libs/generateQrCode";
import {
  BiArrowBack,
  BiDownload,
  BiErrorCircle,
  BiLoaderAlt,
  BiPrinter,
} from "react-icons/bi";
import { useRouter } from "next/navigation";
interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  _id: string;
  customer: string;
  status: "pending" | "delivered" | "cancelled";
  date: string;
  items: OrderItem[];
  total: number;
  discount?: number;
  shipping?: number;
  tax?: number;
}

export default function OrderDetails({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qrImage, setQrImage] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/orders`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Order[] = await response.json();
        const filterOrder = data.find((item) => item._id === orderId) ?? null;

        if (!filterOrder) {
          throw new Error("Order not found");
        }

        setOrder(filterOrder);
        const qr = await generateQrCode(orderId);
        setQrImage(qr);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError("Failed to load order. Please try again later.");
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handlePrint = async () => {
    if (!order) return;
    const blob = await pdf(
      <OrderInvoicePDF order={order} qrImage={qrImage} />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const win = window.open(url);
    if (win) {
      win.addEventListener("load", () => {
        win.print();
      });
    }
  };

  if (loading)
    return (
      <div className='p-6 text-center text-tusi flex flex-col items-center gap-2 animate-pulse'>
        <BiLoaderAlt className='w-6 h-6 animate-spin' />
        <p>در حال بارگذاری سفارش...</p>
      </div>
    );
  if (error)
    return (
      <div className='p-6 text-center text-[#8b0000] bg-[#8b0000]/10 border border-[#8b0000]/20 rounded-md flex flex-col items-center gap-4'>
        <BiErrorCircle className='w-6 h-6' />
        <p className='font-medium'>خطا در دریافت سفارش: {error}</p>
        <button className='px-4 py-2 bg-[#8b0000]/60 text-white rounded hover:bg-[#8b0000]/70 transition'>
          تلاش دوباره
        </button>
      </div>
    );
  if (!order)
    return (
      <div className='p-6 text-center text-darker/60 bg-darker/5 border border-darker/20 rounded-md flex flex-col items-center gap-4'>
        <BiErrorCircle className='w-6 h-6 text-gray-400' />
        <p className='font-medium'>سفارشی یافت نشد.</p>
        <button
          onClick={() => router.back()}
          className='px-4 py-2 bg-darker text-lighter rounded hover:bg-darker/80 flex items-center gap-2 transition'>
          <BiArrowBack className='w-4 h-4' />
          بازگشت
        </button>
      </div>
    );

  return (
    <div dir='rtl' className='p-6 space-y-6 font-vazir'>
      <h1 className='text-2xl font-bold text-darker/80'>
        جزئیات فاکتور سفارش #{order._id}
      </h1>

      <div className='flex flex-col xl:flex-row gap-6'>
        {/* PDF Viewer */}
        <div className='flex-1 h-[90vh] border rounded-lg overflow-hidden shadow'>
          <PDFViewer width='100%' height='100%' showToolbar>
            <OrderInvoicePDF order={order} qrImage={qrImage} />
          </PDFViewer>
        </div>

        {/* Actions */}
        <div className='w-full xl:w-[280px] flex flex-col gap-4'>
          {/* Download */}
          <PDFDownloadLink
            document={<OrderInvoicePDF order={order} qrImage={qrImage} />}
            fileName={`invoice-${order._id}.pdf`}
            className='bg-darker/70 hover:bg-darker text-lighter  px-5 py-3 rounded-lg text-center flex items-center justify-center gap-2 transition'>
            {({ loading }) =>
              loading ? (
                "در حال آماده‌سازی..."
              ) : (
                <>
                  <BiDownload className='w-5 h-5' />
                  دانلود فاکتور
                </>
              )
            }
          </PDFDownloadLink>

          {/* Print */}
          <button
            onClick={handlePrint}
            className='bg-darker/70 hover:bg-darker text-lighter px-5 py-3 rounded-lg text-center flex items-center justify-center gap-2 transition'>
            <BiPrinter className='w-5 h-5' />
            چاپ فاکتور
          </button>
        </div>
      </div>
    </div>
  );
}
