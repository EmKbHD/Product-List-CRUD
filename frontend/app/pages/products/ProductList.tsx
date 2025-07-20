import { Dialog, Button } from "@chakra-ui/react";
import ProductDialog from "./ProductDialog";

const ProductList = () => {
  return (
    <>
      <Dialog.Root placement="center">
        <Dialog.Trigger asChild>
          <Button colorScheme="teal" size="md">
            Add Product
          </Button>
        </Dialog.Trigger>
        <ProductDialog />
      </Dialog.Root>
    </>
  );
};

export default ProductList;
