import cartModel from "../../../db/models/cart/cart.js";
import productModel from "../../../db/models/product/product.js";
import couponModel from "./../../../db/models/coupon/coupon.js";

export const addCoupon = async (req, res) => {
  const createdBy = req.user._id;
  const newCoupon = await couponModel.create({
    ...req.body,
    createdBy,
  });
  res.json({ message: "add coupon", newCoupon });
};

export const updateCoupon = async (req, res) => {
  const updatedBy = req.user._id;
  const updatedCoupon = await couponModel.findByIdAndUpdate(
    req.params.id,
    {
      couponCode: req.body.couponCode,
      value: req.body.value,
      updatedBy,
    },
    { new: true }
  );
  res.json({ message: "coupon updated successfully", updatedCoupon });
};

export const deleteCoupon = async (req, res) => {
  // const deletedCoupon = await couponModel.findByIdAndDelete(req.params.id, {
  //   new: true,
  // });
  const deletedBy = req.user._id;
  const deletedCoupon = await couponModel
    .softDelete(req.params.id, deletedBy)
    .then((result) => {
      console.log("Soft deleted document:", result);
    })
    .catch((error) => {
      console.error("Error soft deleting document:", error);
    });
  res.json({ message: "coupon deleted successfully", deletedCoupon });
};

export const getAllCoupons = async (req, res) => {
  const foundedCoupon = await couponModel.find();
  if (foundedCoupon) {
    res.json({ message: "founded coupons", foundedCoupon });
  } else {
    res.json({ message: "coupons not found" });
  }
};

export const applyCoupon = async (req, res) => {
  const deletedBy = req.user._id;
  const filterdProductId = { _id: req.body.productId };
  const filterdCouponId = { _id: req.body.couponId };
  const product = await productModel.findById(filterdProductId._id);
  if (!product) return res.json({ message: "product not found" });
  const coupon = await couponModel.findById(filterdCouponId._id);
  if (!coupon) return res.json({ message: "coupon not found" });

  let oldPrice = product.priceAfterDiscound;
  let discound = coupon.value;
  let newPrice = oldPrice - (discound / 100) * oldPrice;
  console.log({
    oldPrice,
    discound,
    newPrice,
  });
  let updateCoupon = await productModel.findByIdAndUpdate(
    filterdProductId,
    {
      priceAfterDiscound: newPrice,
      deletedBy,
    },
    { new: true }
  );
  await couponModel.softDelete(filterdCouponId._id, deletedBy);

  res.json({ message: "coupon updated successflly ", updateCoupon });
};

export const applyCouponToCart = async (req, res) => {
  const deletedBy = req.user._id;

  const filterdCartId = { _id: req.body.cartId };
  const filterdCouponId = { _id: req.body.couponId };
  const cart = await cartModel.findById(filterdCartId._id);
  if (!cart) return res.json({ message: "cart not found" });
  const coupon = await couponModel.findById(filterdCouponId._id);
  if (!coupon) return res.json({ message: "coupon not found" });

  let oldPrice = cart.priceAfterDiscount;
  let discound = coupon.value;
  let newPrice = oldPrice - (discound / 100) * oldPrice;
  console.log({
    oldPrice,
    discound,
    newPrice,
  });
  let updateCoupon = await cartModel.findByIdAndUpdate(
    filterdCartId,
    {
      priceAfterDiscount: newPrice,
      deletedBy,
    },
    { new: true }
  );

  await couponModel.softDelete(filterdCouponId._id, deletedBy);

  res.json({ message: "coupon applyed successfully", updateCoupon });
};
