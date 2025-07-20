import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import AddProductForm from "./AddProductForm";

const ProductDialog = () => {
  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title color={"black"}>Add Product Form</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            {/* body of the Add Product Form Dialog start here */}
            <AddProductForm />
          </Dialog.Body>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
};

export default ProductDialog;
