import userResolvers from "./userResolvers.js";
import productResolvers from "./productResolvers.js";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...productResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...productResolvers.Mutation,
  },
};
