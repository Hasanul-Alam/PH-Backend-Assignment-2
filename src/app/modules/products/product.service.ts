import type { IProduct } from "./product.Interface.js";
import ProductModel from "./product.model.js";

const createProductIntoDB = async (product: IProduct) => {
  const createdProduct = await ProductModel.create(product);
  return createdProduct;
};

const getAllProductsFromDB = async () => {
  const allProducts = await ProductModel.find();
  return allProducts;
};

const getSingleProductFromDB = async (id: string) => {
  const product = await ProductModel.findById(id);
  return product;
};

const updateProductIntoDB = async (
  id: string,
  updatedData: Partial<IProduct>,
) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, {
    options: { returnDocument: "after" },
  });
  return updatedProduct;
};

const deleteProductFromDB = async (id: string) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new Error("Product not found");
  }

  return deletedProduct;
};

// Search products by name or category
const escapeRegex = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const searchProductsInDB = async (query: string) => {
  const safeQuery = escapeRegex(query);
  const regex = new RegExp(safeQuery, "i");

  return ProductModel.find({
    $or: [{ name: regex }, { category: regex }],
  });
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  searchProductsInDB,
};
