import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
  Image,
} from "@react-pdf/renderer";
import moment from "moment-jalaali";

// Register Vazir font
Font.register({
  family: "Vazir",
  fonts: [
    { src: "/font/Vazir-Regular.ttf", fontWeight: "normal" },
    { src: "/font/Vazir-Black.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Vazir",
    direction: "rtl",
  },
  section: { marginBottom: 15 },
  header: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
    borderBottom: "1px solid #000",
    paddingBottom: 5,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
  },
  status: {
    padding: 3,
    borderRadius: 4,
    color: "#fff",
    textAlign: "center",
    fontSize: 10,
    marginTop: 5,
    width: 80,
  },
  statusMap: {
    pending: { backgroundColor: "#f59e0b" },
    delivered: { backgroundColor: "#16a34a" },
    cancelled: { backgroundColor: "#ef4444" },
  },
  totals: {
    marginTop: 10,
    borderTop: "1px solid #ddd",
    paddingTop: 8,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#666",
  },
  qrCode: {
    width: 60,
    height: 60,
    marginTop: 10,
  },
});

const statusMap = {
  pending: "در انتظار",
  delivered: "تحویل شده",
  cancelled: "لغو شده",
};

export interface OrderInvoicePDFProps {
  order: {
    _id: string;
    customer: string;
    status: "pending" | "delivered" | "cancelled";
    date: string;
    items: { name: string; qty: number; price: number }[];
    total: number;
    discount?: number;
    shipping?: number;
    tax?: number;
  };
  qrImage: string;
}


const OrderInvoicePDF = ({ order, qrImage }: OrderInvoicePDFProps) => {
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const tax = order.tax ?? 0;
  const discount = order.discount ?? 0;
  const shipping = order.shipping ?? 0;
  const grandTotal = subtotal + tax + shipping - discount;

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>صورتحساب سفارش</Text>
        </View>

        <View style={styles.section}>
          <Text>کد سفارش: {order._id}</Text>
          <Text>مشتری: {order.customer}</Text>
          <Text>تاریخ: {moment(order.date).format("jYYYY/jMM/jDD")}</Text>
          <View
            style={[
              styles.status,
              styles.statusMap[order.status as keyof typeof styles.statusMap],
            ]}>
            <Text>{statusMap[order.status]}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.tableHeader}>
            <Text>نام محصول</Text>
            <Text>تعداد</Text>
            <Text>قیمت (تومان)</Text>
          </View>
          {order.items.map((item, i) => (
            <View key={i} style={styles.row}>
              <Text>{item.name}</Text>
              <Text>{item.qty}</Text>
              <Text>{item.price.toLocaleString("fa-IR")}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, styles.totals]}>
          <View style={styles.row}>
            <Text>جمع جزء:</Text>
            <Text>{subtotal.toLocaleString("fa-IR")} تومان</Text>
          </View>
          <View style={styles.row}>
            <Text>مالیات:</Text>
            <Text>{tax.toLocaleString("fa-IR")} تومان</Text>
          </View>
          <View style={styles.row}>
            <Text>تخفیف:</Text>
            <Text>{discount.toLocaleString("fa-IR")} تومان</Text>
          </View>
          <View style={styles.row}>
            <Text>هزینه ارسال:</Text>
            <Text>{shipping.toLocaleString("fa-IR")} تومان</Text>
          </View>
          <View style={[styles.row, { marginTop: 5 }]}>
            <Text style={styles.label}>مبلغ نهایی:</Text>
            <Text style={styles.label}>
              {grandTotal.toLocaleString("fa-IR")} تومان
            </Text>
          </View>
        </View>
        <Text style={{ marginTop: 20, fontSize: 10, color: "#555" }}>
          یادداشت: مرجوعی کالا فقط تا ۷ روز پس از دریافت امکان‌پذیر است.
        </Text>
        <View style={styles.section}>
          <Text style={styles.label}>تماس با ما:</Text>
          <Text>۰۲۱-۱۲۳۴۵۶۷۸ | support@ht-online.com</Text>
          <Text>آدرس: تهران، خیابان مثال، پلاک ۱۱</Text>
        </View>

        <View style={styles.section}>
          <Text>کد QR سفارش:</Text>
          <Image style={styles.qrCode} src={qrImage} />
        </View>

        <View style={styles.section}>
          <Link src={`https://yourstore.com/orders/${order._id}`}>
            مشاهده سفارش در وب‌سایت
          </Link>
        </View>

        <Text
          render={({ pageNumber, totalPages }) =>
            `صفحه ${pageNumber} از ${totalPages}`
          }
          style={styles.footer}
          fixed
        />
      </Page>
    </Document>
  );
};

export default OrderInvoicePDF;
