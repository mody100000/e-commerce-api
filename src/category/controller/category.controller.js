import categoryModel from "./../../../db/models/category/category.js";
export const addCategory = async (req, res) => {
  const createdBy = req.user._id;
  await categoryModel.findById(createdBy);
  const addedCategory = await categoryModel.insertMany({
    ...req.body,
    createdBy,
  });
  res.json({ message: "added category", addedCategory });
};

export const updateCategory = async (req, res) => {
  const createdBy = req.user._id;
  await categoryModel.findById(createdBy);
  const updatedCategory = await categoryModel.findByIdAndUpdate(
    req.params.id,
    {
      categoryName: req.body.categoryName,
      createdBy,
    },
    { new: true }
  );

  res.json({ message: "Category updated successfully", updatedCategory });
};

export const deleteCategory = async (req, res) => {
  const createdBy = req.user._id;
  await categoryModel.findById(createdBy);
  const deletedCategory = await categoryModel.findByIdAndDelete(req.params.id, {
    new: true,
  });
  res.json({ message: "Category deleted successfully", deletedCategory });
};

export const getAllcategories = async (req, res) => {
  const foundedCategory = await categoryModel.find();
  if (foundedCategory) {
    res.json({ message: "get all categories", foundedCategory });
  } else {
    res.json({ message: "invalid categories" });
  }
};

export const getCategory = async (req, res) => {
  const foundedCategory = await categoryModel.findById(req.params.id);
  if (foundedCategory) {
    res.json({ message: "get category", foundedCategory });
  } else {
    res.json({ message: "invalid category" });
  }
};
