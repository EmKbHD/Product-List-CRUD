"use client";
import {
  Dialog,
  Button,
  Box,
  SimpleGrid,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";
import ProductDialog from "./ProductDialog";
import { useQuery } from "@apollo/client";
import { FETCH_ALL_PRODUCTS } from "@/app/graphql/queries/product.query";

type Product = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  description: string;
};

const ProductList = () => {
  const { data, loading, error } = useQuery(FETCH_ALL_PRODUCTS);

  return (
    <>
      <Dialog.Root placement="center">
        <Dialog.Trigger asChild>
          <Button colorScheme="teal" size="md">
            Add Product
          </Button>
        </Dialog.Trigger>

        {/* Product Dialog component to handle adding new products */}
        <ProductDialog />
      </Dialog.Root>

      {/* Product grid to display list of products */}
      {loading ? (
        <Center py={10}>
          <Spinner size="xl" color="teal.500" />
        </Center>
      ) : error ? (
        <Center py={10}>
          <Text color="red.500">Failed to load products.</Text>
        </Center>
      ) : data?.products?.length === 0 ? (
        <Center py={10}>
          <Text color="gray.500">No products in stock for the moment.</Text>
        </Center>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} gap={4} mt={8}>
          {data.products.map((product: Product) => (
            <Box
              key={product.id}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              shadow="md"
            >
              <Text fontWeight="bold">{product.title}</Text>
              <Text>Price: ${product.price}</Text>
              <Text>Quantity: {product.quantity}</Text>
              <Text truncate fontSize="sm" mt={2}>
                {product.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default ProductList;
