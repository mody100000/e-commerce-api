import cartModel from "../../../db/models/cart/cart.js";

export const addCart = async (req, res) => {
  const userId = req.user._id;
  await cartModel.findById(userId);
  const foundedCart = await cartModel.insertMany({
    ...req.body,
    userId,
  });
  res.json({ message: "cart added successfully", foundedCart });
};

export const updateCart = async (req, res) => {
  const userId = req.user._id;
  await cartModel.findById(userId);
  const foundedCart = await cartModel.findByIdAndUpdate(req.params.id, {
    totalPrice: req.body.totalPrice,
    priceAfterDiscount: req.body.priceAfterDiscount,
    products: req.body.products,
    userId,
  });
  res.json({ message: "cart updated successfully", foundedCart });
};
