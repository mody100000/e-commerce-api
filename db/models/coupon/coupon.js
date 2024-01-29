import mongoose from "mongoose";

const schema = mongoose.Schema;

const couponSchema = new schema(
  {
    couponCode: String,
    value: Number,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    deletedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    expireIn: Date,
  },
  { timestamps: true }
);

const couponModel = mongoose.model("Coupon", couponSchema);

export default couponModel;
