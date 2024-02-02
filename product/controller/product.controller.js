import productModel from "../../db/models/product/product.js";

export const addProduct = async (req, res) => {
  const { userId } = req.body;
  const foundedUser = await productModel.find({ userId });
  if (foundedUser) {
    const addedProduct = await productModel.insertMany({
      ...req.body,
      userId,
    });
    res.json({ message: "added product", addedProduct });
  } else {
    res.json({ message: "user not found" });
  }
};

export const updateProduct = async (req, res) => {
  const { userId } = req;
  const foundedUser = await productModel.find({ userId });
  if (foundedUser) {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        productName: req.body.productName,
        slug: req.body.slug,
        priceAfterDiscound: req.body.priceAfterDiscound,
        finalPrice: req.body.finalPrice,
        stock: req.body.stock,
      },
      { new: true }
    );
    res.json({ message: "update product", updatedProduct });
  } else {
    res.json({ message: "user not found" });
  }
};

export const deleteProduct = async (req, res) => {
  const { userId } = req;
  const foundedUser = await productModel.find({ userId });
  if (foundedUser) {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
    res.json({ message: "product deleted successfully", deletedProduct });
  } else {
    res.json({ message: "user not found" });
  }
};

export const getAllProducts = async (req, res) => {
  const page = req.query.p || 0;
  const productsPerPage = 3;
  const getingProducts = await productModel
    .find()
    .skip(page * productsPerPage)
    .limit(productsPerPage);
  res.json({ message: "geting all of the products", getingProducts });
};

export const getProduct = async (req, res) => {
  try {
    const foundedProduct = await productModel.findById(req.params.id);

    if (foundedProduct) {
      return res.json({ message: "Get the product", foundedProduct });
    } else {
      return res.json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error getting product:", error);

    if (error.name === "CastError" && error.kind === "ObjectId") {
      // Handle invalid ObjectId error separately
      return res.json({ message: "Invalid product ID" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
