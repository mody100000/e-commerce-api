import couponModel from "./../../../db/models/coupon/coupon.js";

export const addCoupon = async (req, res) => {
  const { createdBy } = req;
  const foundedUser = await couponModel.find({ createdBy });
  if (foundedUser) {
    const foundedCoupon = await couponModel.insertMany({
      ...req.body,
      createdBy,
    });
    res.json({ message: "add coupon", foundedCoupon });
  } else {
    res.json({ message: "invalid user" });
  }
};
