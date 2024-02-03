import couponModel from "./../../../db/models/coupon/coupon.js";

export const addCoupon = async (req, res) => {
  const createdBy = req.user._id;
  await couponModel.findById(createdBy);
  const foundedCoupon = await couponModel.insertMany({
    ...req.body,
    createdBy,
  });
  res.json({ message: "add coupon", foundedCoupon });
};

export const updateCoupon = async (req, res) => {
  const updatedBy = req.user._id;
  await couponModel.findById(updatedBy);
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
  const deletedBy = req.user._id;
  await couponModel.findById(deletedBy);
  const deletedCoupon = await couponModel.findByIdAndDelete(req.params.id, {
    new: true,
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
//TODO:Apply coupon to product
