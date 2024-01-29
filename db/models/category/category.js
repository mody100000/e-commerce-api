import mongoose from "mongoose";

const schema = mongoose.Schema;

const categorySchema = new schema({
  categoryName: String,
  image: String,
  //FIXME:change the string dataType of image 2 buffer,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
