import mongoose from "mongoose";

const schema = mongoose.Schema;

const productSchema = new schema({
  productName: String,
  slug: String,
  priceAfterDiscound: Number,
  finalPrice: Number,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  image: String,
  //FIXME:need 2 change the string data type of image 2 buffer
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
  stock: Number,
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
