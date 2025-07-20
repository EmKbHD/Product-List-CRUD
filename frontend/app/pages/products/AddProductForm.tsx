import { Field, Flex, Input, Button, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddProductForm = () => {
  return (
    <form noValidate>
      <Field.Root>
        <Field.Label color="black"> Title</Field.Label>
        <Input type="text" placeholder="Type the Product Title here..." />
      </Field.Root>

      <Field.Root py=".5rem">
        <Field.Label color="black"> Price</Field.Label>
        <Input type="number" placeholder="Type the Product Price here..." />
      </Field.Root>

      <Field.Root py=".5rem">
        <Field.Label color="black"> Quantity</Field.Label>
        <Input type="number" placeholder="Type the Product Quantity here..." />
      </Field.Root>

      <Field.Root required>
        <Field.Label color="black">Description</Field.Label>
        <Textarea placeholder="Start typing..." variant="subtle" size="sm" />
        <Field.HelperText>Max 250 characters</Field.HelperText>
      </Field.Root>

      <Flex gap="1rem" mt="1rem">
        <Button>Upload Product Image</Button>
        <Button>Save</Button>
      </Flex>
    </form>
  );
};

export default AddProductForm;
