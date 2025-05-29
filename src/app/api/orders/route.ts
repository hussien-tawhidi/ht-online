
import { connectDB } from "@/libs/db";
import Order from "@/model/Order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ date: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error)
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
