import ProductList from "../../models/productListModel.js";
import { GraphQLError } from "graphql";

const productResolver = {
  Query: {
    products: async (_, __, context) => {
      //Checking if user is authenticated
      if (!context.user) {
        throw new GraphQLError("User Not Authenticated..");
      }
      try {
        return await ProductList.find();
      } catch {
        throw new GraphQLError("Failed to fetch products");
      }
    },
    product: async (_, { id }) => {
      try {
        return await ProductList.findById(id);
      } catch {
        throw new GraphQLError("Failed to fetch product");
      }
    },
  },

  Mutation: {
    addProduct: async (_, { input }) => {
      try {
        const product = new ProductList(input);
        return await product.save();
      } catch {
        throw new GraphQLError("Failed to add product");
      }
    },
    editProduct: async (_, { id, input }) => {
      try {
        return await ProductList.findByIdAndUpdate(id, input, { new: true });
      } catch {
        throw new GraphQLError("Failed to update product");
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        return await ProductList.findByIdAndDelete(id);
      } catch {
        throw new GraphQLError("Failed to delete product");
      }
    },
  },
};

export default productResolver;
// This code defines GraphQL resolvers for managing products in a database.
// It includes queries to fetch all products or a specific product by ID,
