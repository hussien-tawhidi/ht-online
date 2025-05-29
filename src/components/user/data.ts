import { BsMinecart } from "react-icons/bs";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { CiHeart, CiBoxList, CiLocationOn, CiShop } from "react-icons/ci";
import { FiGift, FiMessageCircle } from "react-icons/fi";

export const userLinkMenu = [
  { title: "سفارش‌های من", icon: CiBoxList, link: "/orders" },
  { title: "علاقه‌مندی‌ها", icon: CiHeart, link: "/wishlist" },
  { title: "آدرس‌ها", icon: CiLocationOn, link: "/addresses" },
  { title: "درخواست‌های بازگشت", icon: RiRefund2Line, link: "/refunds" },
  {
    title: "اعلان‌ها",
    icon: MdOutlineNotificationsActive,
    link: "/notifications",
  },

  { title: "کدهای تخفیف", icon: FiGift, link: "/coupons" },
  { title: "نظرات من", icon: FiMessageCircle, link: "/reviews" },
];

export const userProfileQuickLink = [
  { title: "رفتن به سبد خرید", icon: BsMinecart, link: "/cart" },
  { title: "رفتن به فروشگاه", icon: CiShop, link: "/" },
];

export const numbers = [
  {
    title: "کیف پول",
    image: "/userMenu/bag.png",
    link: "/",
    numb: "۳۰,۰۰۰ تومان",
    linkTitle: "افزایش صورت حساب",
    className: "bg-[#90caf9] border-l-4 border-[#2196f3]",
  },
  {
    title: "سفارشات ارسال شده",
    image: "/userMenu/shipped.png",
    link: "/",
    numb: 30,
    linkTitle: "همه سفارشات ارسال شده",
    className: "bg-[#fecf9a] border-l-4 border-[#fdb667]", // blue-50 to sky-100, border sky-400
  },
  {
    title: "سفارشات در حال پردازش",
    image: "/userMenu/baslet.png",
    link: "/",
    numb: 30,
    linkTitle: "سفاشات در حال پردازش",
    className: "bg-[#667090] border-l-4 border-[#4d587e]", // green-50 to emerald-100, border emerald-400
  },
];
export const mockOrders = [
  {
    id: "ORD123456",
    date: "1403/02/01",
    status: "delivered",
    total: "۱,۲۰۰,۰۰۰ تومان",
    items: 3,
  },
  {
    id: "ORD123457",
    date: "1403/02/03",
    status: "pending",
    total: "۸۰۰,۰۰۰ تومان",
    items: 2,
  },
  {
    id: "ORD123458",
    date: "1403/02/04",
    status: "cancelled",
    total: "۰ تومان",
    items: 1,
  },
  {
    id: "ORD123459",
    date: "1403/02/05",
    status: "delivered",
    total: "۱,۵۰۰,۰۰۰ تومان",
    items: 5,
  },
  {
    id: "ORD123460",
    date: "1403/02/06",
    status: "pending",
    total: "۷۰۰,۰۰۰ تومان",
    items: 2,
  },
  {
    id: "ORD123461",
    date: "1403/02/07",
    status: "delivered",
    total: "۲,۲۰۰,۰۰۰ تومان",
    items: 4,
  },
  {
    id: "ORD123462",
    date: "1403/02/08",
    status: "delivered",
    total: "۹۰۰,۰۰۰ تومان",
    items: 1,
  },
  {
    id: "ORD123463",
    date: "1403/02/09",
    status: "cancelled",
    total: "۰ تومان",
    items: 3,
  },
  {
    id: "ORD123464",
    date: "1403/02/10",
    status: "pending",
    total: "۱,۰۰۰,۰۰۰ تومان",
    items: 3,
  },
  {
    id: "ORD123465",
    date: "1403/02/11",
    status: "delivered",
    total: "۱,۳۰۰,۰۰۰ تومان",
    items: 2,
  },
  {
    id: "ORD123466",
    date: "1403/02/12",
    status: "delivered",
    total: "۱,۸۰۰,۰۰۰ تومان",
    items: 6,
  },
  {
    id: "ORD123467",
    date: "1403/02/13",
    status: "pending",
    total: "۵۰۰,۰۰۰ تومان",
    items: 1,
  },
  {
    id: "ORD123468",
    date: "1403/02/14",
    status: "delivered",
    total: "۲,۵۰۰,۰۰۰ تومان",
    items: 7,
  },
  {
    id: "ORD123469",
    date: "1403/02/15",
    status: "cancelled",
    total: "۰ تومان",
    items: 1,
  },
  {
    id: "ORD123470",
    date: "1403/02/16",
    status: "delivered",
    total: "۱,۰۰۰,۰۰۰ تومان",
    items: 2,
  },
  {
    id: "ORD123471",
    date: "1403/02/17",
    status: "pending",
    total: "۹۰۰,۰۰۰ تومان",
    items: 3,
  },
  {
    id: "ORD123472",
    date: "1403/02/18",
    status: "delivered",
    total: "۱,۷۰۰,۰۰۰ تومان",
    items: 4,
  },
  {
    id: "ORD123473",
    date: "1403/02/19",
    status: "pending",
    total: "۶۰۰,۰۰۰ تومان",
    items: 2,
  },
  {
    id: "ORD123474",
    date: "1403/02/20",
    status: "delivered",
    total: "۲,۲۰۰,۰۰۰ تومان",
    items: 5,
  },
  {
    id: "ORD123475",
    date: "1403/02/21",
    status: "cancelled",
    total: "۰ تومان",
    items: 1,
  },
  {
    id: "ORD123476",
    date: "1403/02/22",
    status: "delivered",
    total: "۱,۴۰۰,۰۰۰ تومان",
    items: 3,
  },
  {
    id: "ORD123477",
    date: "1403/02/23",
    status: "pending",
    total: "۷۰۰,۰۰۰ تومان",
    items: 2,
  },
  {
    id: "ORD123478",
    date: "1403/02/24",
    status: "delivered",
    total: "۱,۶۰۰,۰۰۰ تومان",
    items: 4,
  },
  {
    id: "ORD123479",
    date: "1403/02/25",
    status: "pending",
    total: "۸۵۰,۰۰۰ تومان",
    items: 1,
  },
  {
    id: "ORD123480",
    date: "1403/02/26",
    status: "delivered",
    total: "۲,۰۰۰,۰۰۰ تومان",
    items: 5,
  },
  {
    id: "ORD123481",
    date: "1403/02/27",
    status: "delivered",
    total: "۱,۱۰۰,۰۰۰ تومان",
    items: 2,
  },
  {
    id: "ORD123482",
    date: "1403/02/28",
    status: "cancelled",
    total: "۰ تومان",
    items: 1,
  },
  {
    id: "ORD123483",
    date: "1403/03/01",
    status: "pending",
    total: "۹۵۰,۰۰۰ تومان",
    items: 3,
  },
  {
    id: "ORD123484",
    date: "1403/03/02",
    status: "delivered",
    total: "۱,۳۵۰,۰۰۰ تومان",
    items: 4,
  },
  {
    id: "ORD123485",
    date: "1403/03/03",
    status: "pending",
    total: "۷۵۰,۰۰۰ تومان",
    items: 2,
  },
];

export interface AddressType {
  id: string;
  name: string;
  receiver: string;
  phone: string;
  city: string;
  address: string;
  postalCode: string;
  isDefault: boolean;
}

export const initialAddresses: AddressType[] = [
  {
    id: "1",
    name: "منزل",
    receiver: "علی رضایی",
    phone: "09123456789",
    city: "تهران",
    address: "خیابان آزادی، پلاک ۲۵، طبقه دوم",
    postalCode: "1234567890",
    isDefault: true,
  },
  {
    id: "2",
    name: "محل کار",
    receiver: "علی رضایی",
    phone: "09123456789",
    city: "تهران",
    address: "خیابان ولیعصر، برج A، طبقه ۵",
    postalCode: "0987654321",
    isDefault: false,
  },
];
export interface ReviewType {
  id: number;
  product: string;
  rating: number;
  text: string;
  date: string;
}
export const data: ReviewType[] = [
  {
    id: 1,
    product: "هدفون بی‌سیم",
    rating: 4,
    text: "صدای عالی و شارژ خوب.",
    date: "2025-05-20",
  },
  {
    id: 2,
    product: "ساعت هوشمند",
    rating: 5,
    text: "ویژگی‌ها و طراحی فوق‌العاده.",
    date: "2025-05-18",
  },
  {
    id: 3,
    product: "اسپیکر بلوتوثی",
    rating: 3,
    text: "خوب ولی کمی حجیمه.",
    date: "2025-05-15",
  },
  {
    id: 4,
    product: "پایه لپ‌تاپ",
    rating: 5,
    text: "ارگونومیک و محکم.",
    date: "2025-04-30",
  },
  {
    id: 5,
    product: "ماوس بی‌سیم",
    rating: 4,
    text: "روان و خوش‌دست.",
    date: "2025-04-25",
  },
];

export type RefundTypes = {
  id: string;
  orderId: string;
  orderDate: string;
  refundAmount: number;
  refundReason: string;
  status: string;
  requestedAt: string;
};
export interface ProductType {
  id: string;
  name: string;
  price: number;
}

export interface UserNotification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
  sender: string; // ✅ New field
}

export const initialNotifications: UserNotification[] = [
  {
    id: 1,
    title: "خوش آمدید!",
    message: "از ثبت‌نام شما سپاسگزاریم.",
    date: "۷ خرداد ۱۴۰۴، ساعت ۱۰:۰۰ صبح",
    read: false,
    sender: "سیستم",
  },
  {
    id: 2,
    title: "ویژگی جدید",
    message: "داشبورد جدید را بررسی کنید.",
    date: "۶ خرداد ۱۴۰۴، ساعت ۲:۳۰ بعدازظهر",
    read: true,
    sender: "تیم محصول",
  },
  {
    id: 3,
    title: "یادآوری",
    message: "لطفاً ایمیل خود را تأیید کنید.",
    date: "۵ خرداد ۱۴۰۴، ساعت ۹:۱۵ صبح",
    read: false,
    sender: "پشتیبانی",
  },
  {
    id: 4,
    title: "تخفیف ویژه",
    message: "۲۰٪ تخفیف برای خرید بعدی شما!",
    date: "۴ خرداد ۱۴۰۴، ساعت ۵:۰۰ بعدازظهر",
    read: true,
    sender: "تیم فروش",
  },
  {
    id: 5,
    title: "به‌روزرسانی سیستم",
    message: "نگهداری در تاریخ ۹ خرداد انجام می‌شود.",
    date: "۳ خرداد ۱۴۰۴، ساعت ۱۲:۰۰ ظهر",
    read: false,
    sender: "مدیریت سیستم",
  },
  {
    id: 6,
    title: "نظرسنجی",
    message: "نظر خود را درباره تجربه‌تان با ما در میان بگذارید.",
    date: "۲ خرداد ۱۴۰۴، ساعت ۸:۰۰ صبح",
    read: true,
    sender: "روابط عمومی",
  },
];

export interface RefundType {
  id: string;
  orderId: string;
  orderDate: string;
  refundAmount: number;
  refundReason: string;
  status: "approved" | "rejected" | "pending";
  requestedAt: string;
  product: ProductType;
}

export const refunds: RefundType[] = [
  {
    id: "1",
    orderId: "ORD-1001",
    orderDate: "2024-12-01",
    refundAmount: 150000,
    refundReason: "محصول آسیب دیده بود",
    status: "pending",
    requestedAt: "2024-12-05",
    product: { id: "p1", name: "کفش ورزشی", price: 200000 },
  },
  {
    id: "2",
    orderId: "ORD-1002",
    orderDate: "2024-12-10",
    refundAmount: 89000,
    refundReason: "عدم تطابق با توضیحات",
    status: "approved",
    requestedAt: "2024-12-13",
    product: { id: "p2", name: "پیراهن آبی", price: 120000 },
  },
  {
    id: "3",
    orderId: "ORD-1003",
    orderDate: "2024-12-15",
    refundAmount: 120000,
    refundReason: "سایز اشتباه ارسال شده",
    status: "rejected",
    requestedAt: "2024-12-18",
    product: { id: "p3", name: "کلاه ورزشی", price: 130000 },
  },
  {
    id: "4",
    orderId: "ORD-1004",
    orderDate: "2025-01-02",
    refundAmount: 43000,
    refundReason: "لغو توسط مشتری",
    status: "pending",
    requestedAt: "2025-01-03",
    product: { id: "p4", name: "کیف دستی", price: 70000 },
  },
  {
    id: "5",
    orderId: "ORD-1005",
    orderDate: "2025-01-10",
    refundAmount: 74000,
    refundReason: "تحویل دیرهنگام",
    status: "approved",
    requestedAt: "2025-01-12",
    product: { id: "p5", name: "کفش رسمی", price: 90000 },
  },
  {
    id: "6",
    orderId: "ORD-1006",
    orderDate: "2025-01-15",
    refundAmount: 112000,
    refundReason: "کیفیت پایین محصول",
    status: "rejected",
    requestedAt: "2025-01-18",
    product: { id: "p6", name: "شلوار جین", price: 150000 },
  },
  {
    id: "7",
    orderId: "ORD-1007",
    orderDate: "2025-01-18",
    refundAmount: 38000,
    refundReason: "رنگ نادرست ارسال شده",
    status: "pending",
    requestedAt: "2025-01-20",
    product: { id: "p7", name: "تی‌شرت سفید", price: 50000 },
  },
  {
    id: "8",
    orderId: "ORD-1008",
    orderDate: "2025-01-22",
    refundAmount: 98000,
    refundReason: "بسته‌بندی نامناسب",
    status: "approved",
    requestedAt: "2025-01-25",
    product: { id: "p8", name: "کت چرمی", price: 120000 },
  },
  {
    id: "9",
    orderId: "ORD-1009",
    orderDate: "2025-01-28",
    refundAmount: 68000,
    refundReason: "محصول اشتباه ارسال شد",
    status: "rejected",
    requestedAt: "2025-01-30",
    product: { id: "p9", name: "ساعت مچی", price: 100000 },
  },
  {
    id: "10",
    orderId: "ORD-1010",
    orderDate: "2025-02-01",
    refundAmount: 53000,
    refundReason: "لغو پیش از ارسال",
    status: "approved",
    requestedAt: "2025-02-03",
    product: { id: "p10", name: "عینک آفتابی", price: 80000 },
  },
  {
    id: "11",
    orderId: "ORD-1011",
    orderDate: "2025-02-04",
    refundAmount: 60000,
    refundReason: "اندازه کوچک بود",
    status: "pending",
    requestedAt: "2025-02-06",
    product: { id: "p11", name: "پیراهن چهارخانه", price: 85000 },
  },
  {
    id: "12",
    orderId: "ORD-1012",
    orderDate: "2025-02-06",
    refundAmount: 42000,
    refundReason: "نقص فنی در کالا",
    status: "approved",
    requestedAt: "2025-02-08",
    product: { id: "p12", name: "هندزفری بی‌سیم", price: 60000 },
  },
  {
    id: "13",
    orderId: "ORD-1013",
    orderDate: "2025-02-08",
    refundAmount: 30000,
    refundReason: "تاخیر زیاد در ارسال",
    status: "rejected",
    requestedAt: "2025-02-10",
    product: { id: "p13", name: "دفتر یادداشت", price: 40000 },
  },
  {
    id: "14",
    orderId: "ORD-1014",
    orderDate: "2025-02-10",
    refundAmount: 85000,
    refundReason: "کالا استفاده شده به نظر می‌رسید",
    status: "pending",
    requestedAt: "2025-02-12",
    product: { id: "p14", name: "هدفون حرفه‌ای", price: 110000 },
  },
  {
    id: "15",
    orderId: "ORD-1015",
    orderDate: "2025-02-12",
    refundAmount: 39000,
    refundReason: "مطابقت نداشت با تصویر",
    status: "approved",
    requestedAt: "2025-02-14",
    product: { id: "p15", name: "کیبورد گیمینگ", price: 60000 },
  },
  {
    id: "16",
    orderId: "ORD-1016",
    orderDate: "2025-02-14",
    refundAmount: 70000,
    refundReason: "خط و خش روی کالا",
    status: "rejected",
    requestedAt: "2025-02-16",
    product: { id: "p16", name: "پاوربانک", price: 90000 },
  },
  {
    id: "17",
    orderId: "ORD-1017",
    orderDate: "2025-02-16",
    refundAmount: 110000,
    refundReason: "ارسال اشتباه مدل",
    status: "approved",
    requestedAt: "2025-02-18",
    product: { id: "p17", name: "مانیتور ۲۴ اینچ", price: 150000 },
  },
  {
    id: "18",
    orderId: "ORD-1018",
    orderDate: "2025-02-18",
    refundAmount: 49000,
    refundReason: "نقص در کارتن محصول",
    status: "pending",
    requestedAt: "2025-02-20",
    product: { id: "p18", name: "کتاب روانشناسی", price: 65000 },
  },
  {
    id: "19",
    orderId: "ORD-1019",
    orderDate: "2025-02-20",
    refundAmount: 93000,
    refundReason: "کالا کار نمی‌کرد",
    status: "approved",
    requestedAt: "2025-02-22",
    product: { id: "p19", name: "اسپیکر بلوتوثی", price: 120000 },
  },
  {
    id: "20",
    orderId: "ORD-1020",
    orderDate: "2025-02-22",
    refundAmount: 26000,
    refundReason: "جزئیات فنی اشتباه بود",
    status: "rejected",
    requestedAt: "2025-02-24",
    product: { id: "p20", name: "ماوس نوری", price: 35000 },
  },
];
