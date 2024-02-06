import mongoose from "mongoose";

const orderShema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      finalPrice: {
        type: Number,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const orderModel = mongoose.model("Order", orderShema);
export default orderModel;
