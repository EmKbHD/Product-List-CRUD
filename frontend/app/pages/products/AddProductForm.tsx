import {
  Field,
  Flex,
  FileUpload,
  Input,
  Button,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "@/app/graphql/mutation/product.mutation";
import { toaster } from "@/components/ui/toaster";

const AddProductForm = () => {
  // GraphQL mutation
  const [addProduct] = useMutation(ADD_PRODUCT);

  // Initial form values for input fields
  const initialValues = {
    title: "",
    price: 0,
    quantity: 0,
    description: "",
  };

  // Form validation schema with Yup
  const validationSchema = Yup.object({
    title: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Title can only contain letters and spaces")
      .required("Title is required"),

    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than 0")
      .required("Price is required"),

    quantity: Yup.number()
      .typeError("Quantity must be a number")
      .integer("Quantity must be an integer")
      .min(1, "Quantity must be at least 1")
      .required("Quantity is required"),

    description: Yup.string()
      .min(5, "Description must be at least 5 characters")
      .max(250, "Description must be at most 250 characters")
      .required("Description is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await addProduct({
          variables: {
            input: {
              title: values.title,
              price: values.price,
              quantity: values.quantity,
              description: values.description,
            },
          },
        });

        toaster.create({
          title: "Product added successfully!",
          type: "success",
        });

        resetForm(); // Optional: clear the form after submission
      } catch (error) {
        toaster.create({
          title: "Failed to add product.",
          type: "error",
        });

        console.error("Add product error:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      {/* Title */}
      <Field.Root>
        <Field.Label color="black">Title</Field.Label>
        <Input
          name="title"
          type="text"
          placeholder="Type the Product Title here..."
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title && (
          <Text color="red.500" fontSize="sm">
            {formik.errors.title}
          </Text>
        )}
      </Field.Root>

      {/* Price */}
      <Field.Root py=".5rem">
        <Field.Label color="black">Price</Field.Label>
        <Input
          name="price"
          type="number"
          placeholder="Type the Product Price here..."
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.price && formik.errors.price && (
          <Text color="red.500" fontSize="sm">
            {formik.errors.price}
          </Text>
        )}
      </Field.Root>

      {/* Quantity */}
      <Field.Root py=".5rem">
        <Field.Label color="black">Quantity</Field.Label>
        <Input
          name="quantity"
          type="number"
          placeholder="Type the Product Quantity here..."
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.quantity && formik.errors.quantity && (
          <Text color="red.500" fontSize="sm">
            {formik.errors.quantity}
          </Text>
        )}
      </Field.Root>

      {/* Description */}
      <Field.Root required>
        <Field.Label color="black">Description</Field.Label>
        <Textarea
          name="description"
          placeholder="Start typing..."
          variant="subtle"
          size="sm"
          maxLength={250}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Field.HelperText>Max 250 characters</Field.HelperText>
        {formik.touched.description && formik.errors.description && (
          <Text color="red.500" fontSize="sm">
            {formik.errors.description}
          </Text>
        )}
      </Field.Root>

      {/* Buttons */}
      <Flex gap="1rem" my="1rem">
        <FileUpload.Root>
          <FileUpload.HiddenInput />
          <FileUpload.Trigger asChild>
            <Button variant="outline" size="sm">
              <HiUpload /> Upload file
            </Button>
          </FileUpload.Trigger>
          <FileUpload.List />
        </FileUpload.Root>
      </Flex>
      <Button
        w="full"
        type="submit"
        colorScheme="blue"
        // isLoading={loading}
        loadingText="Saving"
      >
        Save
      </Button>
    </form>
  );
};

export default AddProductForm;
