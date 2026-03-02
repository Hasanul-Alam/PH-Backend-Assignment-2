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

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
};
