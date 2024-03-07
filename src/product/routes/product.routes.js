import express from "express";
import { auth } from "../../middleware/auth.js";
import isAdmin from "../../middleware/isAdmin.js";
import { validation, validationFile } from "./../../middleware/validation.js";
import {
  addProduct,
  updateProduct,
  getAllProducts,
  getAllProduct,
  getProduct,
  deleteProduct,
  getAllProductsInCat,
} from "../controller/product.controller.js";
import upload from "./../../middleware/upload.js";
import {
  addProductValidation,
  updatedProductValidation,
} from "../validation/product.validation.js";

const productRoutes = express.Router();
//admins only can add/update/delete products
productRoutes.post(
  "/products",
  auth,
  isAdmin,
  validationFile(addProductValidation),
  upload.single("image"),
  addProduct
);
productRoutes.put(
  "/product/:id",
  auth,
  isAdmin,
  validationFile(updatedProductValidation),
  upload.single("image"),
  updateProduct
);
productRoutes.delete("/product/:id", auth, isAdmin, deleteProduct);
//get all product with pagination
//to go to the next page plz add ?p=1
productRoutes.get("/products", auth, getAllProducts);
//get all products without pagenation
productRoutes.get("/product", auth, getAllProduct);
//get specific product
productRoutes.get("/product/:id", auth, getProduct);
//get all products that in the same category
productRoutes.get("/products/:id", auth, getAllProductsInCat);
export default productRoutes;
