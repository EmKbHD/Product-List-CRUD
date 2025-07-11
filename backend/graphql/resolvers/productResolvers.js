import ProductList from "../../models/productListModel.js";
import { GraphQLError } from "graphql";

export default {
  Query: {
    // Get all products
    products: async (_, __, context) => {
      // Checking if user is authenticated
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
    addProduct: async (_, { input }, context) => {
      const { title, price, quantity, image, description } = input;
      // Checking if user is authenticated
      if (!context.user) {
        throw new GraphQLError("User Not Authenticated..");
      }
      try {
        const product = new ProductList({
          user: context.user.id,
          title,
          price,
          quantity,
          image,
          description,
        });
        return await product.save();
      } catch {
        throw new GraphQLError("Failed to add product");
      }
    },
    editProduct: async (_, { id, input }) => {
      // Checking if user is authenticated
      if (!context.user) {
        throw new GraphQLError("User Not Authenticated..");
      }
      // destruct the INPUT to let the user update only the fields they want
      try {
        return await ProductList.findOneAndUpdate(
          { _id: id, user: context.user.id },
          { ...input },
          { new: true, runValidators: true }
        );
      } catch {
        throw new GraphQLError("Failed to update product");
      }
    },
    deleteProduct: async (_, { id }) => {
      // Checking if user is authenticated
      if (!context.user) {
        throw new GraphQLError("User Not Authenticated..");
      }
      try {
        return await ProductList.findOneAndDelete({
          _id: id,
          user: context.user.id,
        });
      } catch {
        throw new GraphQLError("Failed to delete product");
      }
    },
  },
};

// export default productResolver;
// This code defines GraphQL resolvers for managing products in a database.
// It includes queries to fetch all products or a specific product by ID,
