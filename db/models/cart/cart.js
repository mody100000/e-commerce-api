import mongoose from "mongoose";

const schema = mongoose.Schema;

const productSchema = new schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
});

const cartSchema = new schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  totalPrice: Number,
  priceAfterDiscount: Number,
  products: [productSchema],
});

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
