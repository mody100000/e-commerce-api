import cartModel from "./../../../db/models/cart/cart.js";
import orderModel from "../../../db/models/order/order.js";

export const cashPayment = async (req, res) => {
  try {
    const user = req.user;
    const userCart = await cartModel.findOne({ userId: user._id });
    console.log(userCart);
    if (!userCart || userCart.products.length === 0) {
      return res.status(400).send({ error: "No items in the cart" });
    }

    const order = await orderModel.create({
      userId: user._id,
      cartId: userCart._id,
      paymentMethod: "cash",
      totalPrice: userCart.totalPrice,
      products: userCart.products,
    });

    res.send({ message: "Cash payment processed successfully", order: order });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
