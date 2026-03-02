import type { IProduct } from "./product.Interface.js";
import ProductModel from "./product.model.js";

const createProductIntoDB = async (product: IProduct) => {
  try {
    const createdProduct = await ProductModel.create(product);
    return createdProduct;
  } catch (error) {
    console.log(error);
  }
};

export { createProductIntoDB };
