import DownloadRefund from "@/components/user/refund/download/DownloadRefund";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function downloadRefundFactor({ params }: any) {
  const downloadId = await params.downloadId;
  console.log("🚀 ~ downloadRefundFactor ~ downloadId:", downloadId);

  return (
    <div>
      <DownloadRefund downloadId={downloadId} />
    </div>
  );
}
