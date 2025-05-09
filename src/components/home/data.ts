import { CiDeliveryTruck } from "react-icons/ci";
import { GrShieldSecurity } from "react-icons/gr";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { MdOutlineAttachMoney } from "react-icons/md";

export const cate = [
  { image: "/menu/categories/bag.png", title: "کیف", link: "/bags" },
  {
    image: "/menu/categories/accessories.png",
    title: "اکسسوریس",
    link: "/accessories",
  },
  { image: "/menu/categories/glasses.png", title: "عینک", link: "/glasses" },
  { image: "/menu/categories/shoes.png", title: "کفش", link: "/shoes" },
  { image: "/menu/categories/watch.png", title: "ساعت", link: "/watch" },
  { image: "/menu/categories/clothes.png", title: "لباس", link: "/clothes" },
];

export const products = [
  {
    _id: "1",
    title: "کفش ورزشی مردانه",
    category: "کفش",
    image: "/menu/categories/shoes.png",
    price: 520000,
    oldPrice: 620000,
    expiresAt: "2025-05-07T20:00:00",
  },
  {
    _id: "2",
    title: "ساعت هوشمند شیائومی",
    category: "لوازم دیجیتال",
    image: "/menu/categories/watch.png",
    price: 150000,
    oldPrice: 620000,
    expiresAt: "2025-05-07T20:00:00",
  },
  {
    _id: "3",
    title: "کیف دوشی زنانه",
    category: "مد و پوشاک",
    image: "/menu/categories/bag.png",
    price: 240000,
    oldPrice: 620000,
    expiresAt: "2025-05-07T20:00:00",
  },
  {
    _id: "4",
    title: "اکسسوریس",
    category: "صوتی و تصویری",
    oldPrice: 620000,
    image: "/menu/categories/accessories.png",
    price: 990000,
    expiresAt: "2025-05-07T20:00:00",
  },
  {
    _id: "5",
    title: "عینک",
    oldPrice: 620000,
    category: "صوتی و تصویری",
    image: "/menu/categories/glasses.png",
    price: 99000,
    expiresAt: "2025-05-07T20:00:00",
  },
  {
    _id: "6",
    title: "عینک",
    oldPrice: 620000,
    category: "صوتی و تصویری",
    image: "/menu/categories/glasses.png",
    price: 99000,
    expiresAt: "2025-05-07T20:00:00",
  },
];

export const topCategories = [
  {
    id: 1,
    title: "ساعت مچی ",
    images: ["/home-categories/w1.jpg", "/home-categories/w2.jpg"],
    link: "/categories/digital",
  },
  {
    id: 2,
    title: "کیف دوشی",
    images: ["/home-categories/b1.jpg", "/home-categories/b2.jpg"],
    link: "/categories/clothing",
  },
  {
    id: 3,
    title: "عینک افتابی",
    images: ["/home-categories/g1.jpg", "/home-categories/g2.jpg"],
    link: "/categories/home",
  },
  {
    id: 4,
    title: "کفش اسپورت",
    images: ["/home-categories/s1.jpg", "/home-categories/s2.jpg"],
    link: "/categories/books",
  },
];

// features.ts
export const features = [
  {
    id: 1,
    title: "ارسال رایگان",
    description: "ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان",
    icon: CiDeliveryTruck,
  },
  {
    id: 2,
    title: "پشتیبانی ۲۴ ساعته",
    description: "همیشه پاسخگو هستیم، حتی در روزهای تعطیل",
    icon: IoCallOutline,
  },
  {
    id: 3,
    title: "ضمانت بازگشت وجه",
    description: "۷ روز ضمانت بازگشت بدون سوال",
    icon: MdOutlineAttachMoney,
  },

  {
    id: 5,
    title: "امنیت پرداخت",
    description: "پرداخت امن با درگاه‌های معتبر",
    icon: GrShieldSecurity,
  },
  {
    id: 6,
    title: "تحویل سریع",
    description: "تحویل سفارش در کمتر از ۳ روز کاری",
    icon: LuClock,
  },
  {
    id: 7,
    title: "تضمین اصالت کالا",
    description: "کالاها اورجینال و دارای گارانتی هستند",
    icon: IoMdCheckmarkCircleOutline,
  },
];
export const blogs = [
  {
    id: 1,
    title: "۵ نکته برای انتخاب کیف روزمره مناسب",
    description: "راهنمای خرید کیف زنانه‌ای که هم کاربردی باشد و هم زیبا.",
    image: "/menu/categories/bag.png",
  },
  {
    id: 2,
    title: "راهنمای ست کردن کفش با استایل روزانه",
    description: "بهترین مدل‌های کفش برای استفاده‌ی روزمره با استایل متفاوت.",
    image: "/menu/categories/shoes.png",
  },
  {
    id: 3,
    title: "جدیدترین اکسسوری‌های زنانه ۲۰۲۵",
    description: "با ترندهای اکسسوری سال جدید آشنا شوید و بدرخشید!",
    image: "/menu/categories/glasses.png",
  },
  {
    id: 4,
    title: "چطور یک کیف پول شیک انتخاب کنیم؟",
    description: "نکاتی برای انتخاب کیف پولی که هم خاص باشد و هم بادوام.",
    image: "/menu/categories/glasses.png",
  },
  {
    id: 5,
    title: "۵ مدل کوله‌پشتی محبوب برای استایل خیابانی",
    description: "ترکیب راحتی و استایل در انتخاب کوله مناسب برای خانم‌ها.",
    image: "/menu/categories/bag.png",
  },
  {
    id: 6,
    title: "آشنایی با عینک‌های آفتابی ترند امسال",
    description: "محافظت از چشمانتان با استایلی جذاب و متفاوت.",
    image: "/menu/categories/sunglasses-trend.jpg",
  },
  {
    id: 7,
    title: "کتونی سفید؛ انتخابی برای هر موقعیت",
    description: "چرا هر خانمی باید حداقل یک کتونی سفید داشته باشد؟",
    image: "/menu/categories/bag.png",
  },
];
