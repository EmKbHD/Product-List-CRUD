"use client";
import { Button, Field, Flex, Grid, Input, Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
// import { GraphQLError } from "graphql";
import { SIGNUP_USER } from "@/app/graphql/mutation/user.mutation";
import { toaster } from "@/components/ui/toaster";

const SignupForm = () => {
  const [signUp] = useMutation(SIGNUP_USER);

  // Initial form values for input fields
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  // Form validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "First name can only contain letters") // Validate that the first name contains only letters
      .required("First name is required"),

    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Last name can only contain letters") // Validate that the last name contains only letters
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        // Call the signUp mutation with the form values
        const { data } = await signUp({ variables: { input: values } });
        console.log("User is Signed up successfully...:", data);
      } catch (error: unknown) {
        let message = "Something went wrong";

        if (error && typeof error === "object" && "graphQLErrors" in error) {
          const gqlError = error as { graphQLErrors: { message: string }[] };
          message = gqlError.graphQLErrors?.[0]?.message || message;
        }

        if (message.includes("User already exists")) {
          toaster.create({
            title: "User already exists",
            description: "Please use a different email.",
            type: "error",
            duration: 5000,
          });
        }
        if (message.includes("Incorrect password")) {
          setFieldError("password", "Incorrect password");
        }
      }
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Flex gap={4} py={4}>
          <Field.Root>
            <Field.Label>FirstName</Field.Label>
            <Input
              value={formik.values.firstName}
              onChange={formik.handleChange}
              type="text"
              variant="outline"
              name="firstName"
              border={formik.errors.firstName ? "1px solid red" : ""}
              placeholder="Enter your first name"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <Text color="red.500" fontSize="sm">
                {formik.errors.firstName}
              </Text>
            )}
          </Field.Root>
          <Field.Root>
            <Field.Label>LastName</Field.Label>
            <Input
              value={formik.values.lastName}
              onChange={formik.handleChange}
              type="text"
              variant="outline"
              name="lastName"
              border={formik.errors.lastName ? "1px solid red" : ""}
              placeholder="Enter your last name"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <Text color="red.500" fontSize="sm">
                {formik.errors.lastName}
              </Text>
            )}
          </Field.Root>
        </Flex>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            variant="outline"
            name="email"
            border={formik.errors.email ? "1px solid red" : ""}
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email && (
            <Text color="red.500" fontSize="sm">
              {formik.errors.email}
            </Text>
          )}
        </Field.Root>
        <Field.Root py="1rem">
          <Field.Label>Password</Field.Label>
          <Input
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            variant="outline"
            name="password"
            border={formik.errors.password ? "1px solid red" : ""}
            placeholder="***********"
          />
          {formik.touched.password && formik.errors.password && (
            <Text color="red.500" fontSize="sm">
              {formik.errors.password}
            </Text>
          )}
        </Field.Root>
        <Grid>
          <Button
            type="submit"
            colorPalette="teal"
            variant="solid"
            color="white"
            fontWeight="bold"
          >
            Sign up
          </Button>
        </Grid>
      </form>
      <Flex gap={2} pt={2}>
        <Text>Do you have an account already?</Text>
        <Link href="/pages/signin">
          <Text
            color="teal"
            _hover={{ textDecor: "underline" }}
            cursor="pointer"
          >
            Sign in
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default SignupForm;
