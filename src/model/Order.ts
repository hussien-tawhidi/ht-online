import { Schema, model, models, Document } from "mongoose";



// Define the order document interface
export interface OrderDocument extends Document {
  customer: string;
  date: string;
  status: "pending" | "delivered" | "cancelled";
  items: { name: string; quantity: number; price: number }[];
  total: number;
}

// Create the schema
const OrderSchema = new Schema<OrderDocument>({
  customer: { type: String, required: true },
  date: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "delivered", "cancelled"],
    required: true,
  },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
});

// Create or reuse model
const Order = models.Order || model<OrderDocument>("Order", OrderSchema);
export default Order;
