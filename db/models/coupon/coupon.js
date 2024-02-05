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
    expireIn: {
      type: Date,
      expires: "30d",
      default: Date.now,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
couponSchema.statics.softDelete = function (id, deletedBy) {
  return this.findByIdAndUpdate(
    id,
    {
      $set: {
        deleted: true,
        deletedAt: new Date(),
        deletedBy: deletedBy,
      },
    },
    { new: true }
  );
};

// Query middleware to exclude soft-deleted documents
couponSchema.pre(/.*find.*/, function () {
  this.where({ deleted: { $ne: true } });
});

const couponModel = mongoose.model("Coupon", couponSchema);

export default couponModel;
