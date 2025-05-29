import { connectDB } from "@/libs/db";
import Order from "@/model/Order";
import { NextResponse } from "next/server";
import { mockOrders } from "./data";

export async function POST() {
  await connectDB();

  try {
    // Insert all mock orders into DB
    await Order.insertMany(mockOrders);

    return NextResponse.json({ message: "Mock orders seeded successfully" });
  } catch (error) {
    console.error("Error seeding orders:", error);
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
