import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    userEmail: String,
    phone: String,
    street: String,
    address: String,
    postCode: String,
    cartProducts: Object,
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Order = models?.Order || model("Order", OrderSchema);
