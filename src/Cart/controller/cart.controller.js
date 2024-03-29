import cartModel from "../../../db/models/cart/cart.js";

export const getAllCarts = async (req, res) => {
  try {
    const getCart = await cartModel.find().populate("products.product");
    res.json({ message: "get all carts", getCart });
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addCart = async (req, res) => {
  const userId = req.user._id;
  const foundedCart = await cartModel.create({
    ...req.body,
    userId,
  });
  res.json({ message: "cart added successfully", foundedCart });
};
export const updateCart = async (req, res) => {
  const userId = req.user._id;
  const userRole = req.user.role;
  const cart = await cartModel.findById(req.params.id);
  if (!cart) return res.send({ message: "cant find cart" });
  if (userId == cart.userId || userRole == "admin") {
    const foundedCart = await cartModel.findByIdAndUpdate(
      req.params.id,
      {
        totalPrice: req.body.totalPrice,
        priceAfterDiscount: req.body.priceAfterDiscount,
        products: req.body.products,
        userId,
      },
      { new: true }
    );
    res.json({ message: "cart updated successfully", foundedCart });
  }
};
