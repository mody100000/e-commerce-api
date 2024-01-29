import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
  productName: String,
  slug: String,
  priceAfterDiscound: Number,
  finalPrice: Number,
  image: String,
  //FIXME:need 2 change the string data type of image 2 buffer
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
  stock: Number,
});

const productModel = mongoose.model("Product", userSchema);

export default productModel;
