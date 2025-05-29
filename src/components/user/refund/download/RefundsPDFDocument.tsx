
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import moment from "moment-jalaali";

// Register Vazir font (same as your previous)
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
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  labelText: {
    fontWeight: "bold",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    width: 100,
    marginTop: 5,
  },
  statusColors: {
    approved: { backgroundColor: "#16a34a" }, // green
    rejected: { backgroundColor: "#ef4444" }, // red
    pending: { backgroundColor: "#f59e0b" }, // yellow/orange
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
  note: {
    marginTop: 30,
    fontSize: 10,
    color: "#555",
    textAlign: "center",
  },
});

type RefundType = {
  id: string;
  orderId: string;
  orderDate: string;
  refundAmount: number;
  refundReason: string;
  status: "approved" | "rejected" | "pending";
  requestedAt: string;
  product: {
    name: string;
  };
};

type Props = {
  refund: RefundType;
};

export default function RefundsPDFDocument({ refund }: Props) {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>درخواست بازپرداخت</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.labelRow}>
            <Text style={styles.labelText}>کد سفارش:</Text>
            <Text>{refund.orderId}</Text>
          </View>
          <View style={styles.labelRow}>
            <Text style={styles.labelText}>نام محصول:</Text>
            <Text>{refund.product.name}</Text>
          </View>
          <View style={styles.labelRow}>
            <Text style={styles.labelText}>تاریخ سفارش:</Text>
            <Text>{moment(refund.orderDate).format("jYYYY/jMM/jDD")}</Text>
          </View>
          <View style={styles.labelRow}>
            <Text style={styles.labelText}>مبلغ بازپرداخت:</Text>
            <Text>{refund.refundAmount.toLocaleString("fa-IR")} تومان</Text>
          </View>
          <View style={styles.labelRow}>
            <Text style={styles.labelText}>دلیل بازپرداخت:</Text>
            <Text>{refund.refundReason}</Text>
          </View>
          <View style={styles.labelRow}>
            <Text style={styles.labelText}>تاریخ درخواست:</Text>
            <Text>{moment(refund.requestedAt).format("jYYYY/jMM/jDD")}</Text>
          </View>
          <View
            style={[styles.statusBadge, styles.statusColors[refund.status]]}>
            <Text>
              {refund.status === "approved"
                ? "تأیید شده"
                : refund.status === "rejected"
                ? "رد شده"
                : "در انتظار"}
            </Text>
          </View>
        </View>

        <Text style={styles.note}>
          توجه: بازپرداخت‌ها پس از بررسی نهایی انجام خواهند شد.
        </Text>

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
}
