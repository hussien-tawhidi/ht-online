// Helper to convert Persian number string to number
function parsePersianNumber(str: string) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";
  let cleanStr = str.replace(/[,\s تومان]/g, "");
  cleanStr = cleanStr
    .split("")
    .map((ch) => {
      const index = persianDigits.indexOf(ch);
      return index >= 0 ? englishDigits[index] : ch;
    })
    .join("");
  return Number(cleanStr);
}

export const mockOrders = [
  {
    customer: "مشتری 1",
    date: "1403/02/01",
    status: "delivered",
    total: parsePersianNumber("۱,۲۰۰,۰۰۰ تومان"), // 1200000
    items: [
      { name: "محصول 1", quantity: 1, price: 400000 },
      { name: "محصول 2", quantity: 1, price: 400000 },
      { name: "محصول 3", quantity: 1, price: 400000 },
    ],
  },
  {
    customer: "مشتری 2",
    date: "1403/02/03",
    status: "pending",
    total: parsePersianNumber("۸۰۰,۰۰۰ تومان"), // 800000
    items: [{ name: "محصول 1", quantity: 2, price: 400000 }],
  },
  {
    customer: "مشتری 3",
    date: "1403/02/04",
    status: "cancelled",
    total: 0,
    items: [],
  },
  {
    customer: "مشتری 4",
    date: "1403/02/05",
    status: "delivered",
    total: parsePersianNumber("۱,۵۰۰,۰۰۰ تومان"), // 1500000
    items: [{ name: "محصول 1", quantity: 3, price: 500000 }],
  },
  {
    customer: "مشتری 5",
    date: "1403/02/06",
    status: "pending",
    total: parsePersianNumber("۷۰۰,۰۰۰ تومان"), // 700000
    items: [{ name: "محصول 1", quantity: 2, price: 350000 }],
  },
  {
    customer: "مشتری 6",
    date: "1403/02/07",
    status: "delivered",
    total: parsePersianNumber("۲,۲۰۰,۰۰۰ تومان"), // 2200000
    items: [{ name: "محصول 1", quantity: 4, price: 550000 }],
  },
  {
    customer: "مشتری 7",
    date: "1403/02/08",
    status: "delivered",
    total: parsePersianNumber("۹۰۰,۰۰۰ تومان"), // 900000
    items: [{ name: "محصول 1", quantity: 1, price: 900000 }],
  },
  {
    customer: "مشتری 8",
    date: "1403/02/09",
    status: "cancelled",
    total: 0,
    items: [],
  },
  {
    customer: "مشتری 9",
    date: "1403/02/10",
    status: "pending",
    total: parsePersianNumber("۱,۰۰۰,۰۰۰ تومان"), // 1000000
    items: [{ name: "محصول 1", quantity: 3, price: 333333 }],
  },
  {
    customer: "مشتری 10",
    date: "1403/02/11",
    status: "delivered",
    total: parsePersianNumber("۱,۳۰۰,۰۰۰ تومان"), // 1300000
    items: [{ name: "محصول 1", quantity: 2, price: 650000 }],
  },
  {
    customer: "مشتری 11",
    date: "1403/02/12",
    status: "delivered",
    total: parsePersianNumber("۱,۸۰۰,۰۰۰ تومان"), // 1800000
    items: [{ name: "محصول 1", quantity: 6, price: 300000 }],
  },
  {
    customer: "مشتری 12",
    date: "1403/02/13",
    status: "pending",
    total: parsePersianNumber("۵۰۰,۰۰۰ تومان"), // 500000
    items: [{ name: "محصول 1", quantity: 1, price: 500000 }],
  },
  {
    customer: "مشتری 13",
    date: "1403/02/14",
    status: "delivered",
    total: parsePersianNumber("۲,۵۰۰,۰۰۰ تومان"), // 2500000
    items: [{ name: "محصول 1", quantity: 7, price: 357142 }],
  },
  {
    customer: "مشتری 14",
    date: "1403/02/15",
    status: "cancelled",
    total: 0,
    items: [],
  },
  {
    customer: "مشتری 15",
    date: "1403/02/16",
    status: "delivered",
    total: parsePersianNumber("۱,۰۰۰,۰۰۰ تومان"), // 1000000
    items: [{ name: "محصول 1", quantity: 2, price: 500000 }],
  },
  {
    customer: "مشتری 16",
    date: "1403/02/17",
    status: "pending",
    total: parsePersianNumber("۹۰۰,۰۰۰ تومان"), // 900000
    items: [{ name: "محصول 1", quantity: 3, price: 300000 }],
  },
  {
    customer: "مشتری 17",
    date: "1403/02/18",
    status: "delivered",
    total: parsePersianNumber("۱,۷۰۰,۰۰۰ تومان"), // 1700000
    items: [{ name: "محصول 1", quantity: 4, price: 425000 }],
  },
  {
    customer: "مشتری 18",
    date: "1403/02/19",
    status: "pending",
    total: parsePersianNumber("۶۰۰,۰۰۰ تومان"), // 600000
    items: [{ name: "محصول 1", quantity: 2, price: 300000 }],
  },
  {
    customer: "مشتری 19",
    date: "1403/02/20",
    status: "delivered",
    total: parsePersianNumber("۲,۲۰۰,۰۰۰ تومان"), // 2200000
    items: [{ name: "محصول 1", quantity: 5, price: 440000 }],
  },
  {
    customer: "مشتری 20",
    date: "1403/02/21",
    status: "cancelled",
    total: 0,
    items: [],
  },
  {
    customer: "مشتری 21",
    date: "1403/02/22",
    status: "delivered",
    total: parsePersianNumber("۱,۴۰۰,۰۰۰ تومان"), // 1400000
    items: [{ name: "محصول 1", quantity: 3, price: 466666 }],
  },
  {
    customer: "مشتری 22",
    date: "1403/02/23",
    status: "pending",
    total: parsePersianNumber("۷۰۰,۰۰۰ تومان"), // 700000
    items: [{ name: "محصول 1", quantity: 2, price: 350000 }],
  },
  {
    customer: "مشتری 23",
    date: "1403/02/24",
    status: "delivered",
    total: parsePersianNumber("۱,۶۰۰,۰۰۰ تومان"), // 1600000
    items: [{ name: "محصول 1", quantity: 4, price: 400000 }],
  },
  {
    customer: "مشتری 24",
    date: "1403/02/25",
    status: "pending",
    total: parsePersianNumber("۸۵۰,۰۰۰ تومان"), // 850000
    items: [{ name: "محصول 1", quantity: 1, price: 850000 }],
  },
  {
    customer: "مشتری 25",
    date: "1403/02/26",
    status: "delivered",
    total: parsePersianNumber("۲,۰۰۰,۰۰۰ تومان"), // 2000000
    items: [{ name: "محصول 1", quantity: 5, price: 400000 }],
  },
  {
    customer: "مشتری 26",
    date: "1403/02/27",
    status: "delivered",
    total: parsePersianNumber("۱,۱۰۰,۰۰۰ تومان"), // 1100000
    items: [{ name: "محصول 1", quantity: 2, price: 550000 }],
  },
  {
    customer: "مشتری 27",
    date: "1403/02/28",
    status: "cancelled",
    total: 0,
    items: [],
  },
  {
    customer: "مشتری 28",
    date: "1403/03/01",
    status: "pending",
    total: parsePersianNumber("۹۵۰,۰۰۰ تومان"), // 950000
    items: [{ name: "محصول 1", quantity: 3, price: 316666 }],
  },
  {
    customer: "مشتری 29",
    date: "1403/03/02",
    status: "delivered",
    total: parsePersianNumber("۱,۳۵۰,۰۰۰ تومان"), // 1350000
    items: [{ name: "محصول 1", quantity: 3, price: 450000 }],
  },
  {
    customer: "مشتری 30",
    date: "1403/03/03",
    status: "pending",
    total: parsePersianNumber("۷۵۰,۰۰۰ تومان"), // 750000
    items: [{ name: "محصول 1", quantity: 1, price: 750000 }],
  },
];
