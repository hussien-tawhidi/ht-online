"use client";
import { useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer";
import {
  BiArrowBack,
  BiDownload,
  BiErrorCircle,
  BiLoaderAlt,
  BiPrinter,
} from "react-icons/bi";
import { useRouter } from "next/navigation";
import { refunds, RefundType } from "../../data";
import RefundsPDFDocument from "./RefundsPDFDocument";

export default function DownloadRefund({ downloadId }: { downloadId: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [printing, setPrinting] = useState<boolean>(false);
  const [refund, setRefund] = useState<RefundType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  
  const fetchRefund = async () => {
    setLoading(true);
    setError(null);
    try {
      const refundData = refunds.find((item) => item.id === downloadId);
      if (refundData) {
        setRefund(refundData);
      } else {
        setError("درخواست بازگشت یافت نشد.");
      }
    } catch (err) {
      console.error("Failed to fetch refund:", err);
      setError("خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRefund();
  }, [downloadId]);

  const handlePrint = async () => {
    if (!refund || printing) return;
    setPrinting(true);
    const blob = await pdf(<RefundsPDFDocument refund={refund} />).toBlob();
    const url = URL.createObjectURL(blob);
    const win = window.open(url);
    if (win) {
      win.onload = () => {
        setTimeout(() => {
          win.print();
          setPrinting(false);
        }, 500);
      };
    } else {
      setPrinting(false);
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
        <p className='font-medium'>خطا: {error}</p>
        <button
          onClick={fetchRefund}
          className='px-4 py-2 bg-[#8b0000]/60 text-white rounded hover:bg-[#8b0000]/70 transition'>
          تلاش دوباره
        </button>
      </div>
    );

  if (!refund)
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
        جزئیات فاکتور سفارش #{refund.id}
      </h1>

      <div className='flex flex-col xl:flex-row gap-6'>
        {/* PDF Viewer */}
        <div className='flex-1 h-[90vh] border rounded-lg overflow-hidden shadow'>
          <PDFViewer width='100%' height='100%' showToolbar>
            <RefundsPDFDocument refund={refund} />
          </PDFViewer>
        </div>

        {/* Actions */}
        <div className='w-full xl:w-[280px] flex flex-col gap-4'>
          {/* Download */}
          <PDFDownloadLink
            document={<RefundsPDFDocument refund={refund} />}
            fileName={`invoice-${refund.id}.pdf`}
            className='bg-darker/70 hover:bg-darker text-lighter px-5 py-3 rounded-lg text-center flex items-center justify-center gap-2 transition'>
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
            disabled={printing}
            className={`${
              printing ? "opacity-50 cursor-not-allowed" : ""
            } bg-darker/70 hover:bg-darker text-lighter px-5 py-3 rounded-lg text-center flex items-center justify-center gap-2 transition`}>
            <BiPrinter className='w-5 h-5' />
            {printing ? "در حال آماده‌سازی چاپ..." : "چاپ فاکتور"}
          </button>
        </div>
      </div>
    </div>
  );
}
