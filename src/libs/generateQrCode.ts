import QRCode from "qrcode";

/**
 * Generates a QR code as a Data URL from a given string.
 * @param data - The string to encode as a QR code.
 * @returns A Promise that resolves to the QR code image as a base64 data URL.
 */
export const generateQrCode = async (data: string): Promise<string> => {
  try {
    const url = await QRCode.toDataURL(data);
    return url;
  } catch (err) {
    console.error("QR Code generation failed:", err);
    return "";
  }
};
