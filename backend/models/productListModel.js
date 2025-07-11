import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productListSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const ProductList = model("productList", productListSchema);
export default ProductList;
