const productType = `
  type Product {
    id: ID!
    title: String!
    price: Float!
    quantity: Int!
    description:String
  }

  type Query{
    products:[Product]!
    product(id : ID):Product
  }

  type Mutation{
    addProduct(input:AddProduct):Product
    editProduct(id: ID!, input: EditProduct): Product
    deleteProduct(id:ID):Product
  }

  input AddProduct{
    title: String!
    price: Float!
    quantity: Int!
    description:String
  }

  input EditProduct{
    title: String!
    price: Float!
    quantity: Int!
    description:String
  }

`;

export default productType;
