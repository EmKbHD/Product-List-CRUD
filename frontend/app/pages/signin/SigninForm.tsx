"use client";
import { Input, Grid, Button, Field, Box, Text, Flex } from "@chakra-ui/react";
import {
  PasswordInput,
  // PasswordStrengthMeter,
} from "@/components/ui/password-input";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, ApolloError, useApolloClient } from "@apollo/client";
import { LOGIN_USER } from "@/app/graphql/mutation/user.mutation";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

const SigninForm = () => {
  const [logIn] = useMutation(LOGIN_USER);
  const router = useRouter();
  const client = useApolloClient();

  // Initial form values for input fields
  const initialValues = {
    email: "",
    password: "",
  };
  // Form validation schema
  const validationSchema = Yup.object({
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
        const { data } = await logIn({ variables: { input: values } });

        console.log("Login response data:", data);

        const user = data?.logIn;
        if (user) {
          console.log("✅ User has Signed in Successfully:", data);

          // If the login is successful then reset the cache and redirect the user to dashboard page..
          await client.resetStore();

          // small delay
          setTimeout(() => router.replace("/pages/homePage"), 2500); // single, clean redirect
        }
      } catch (error) {
        const errMessage =
          error instanceof ApolloError
            ? error.graphQLErrors[0]?.message || "Something went wrong"
            : "Something went wrong";

        if (error instanceof ApolloError) {
          if (errMessage.includes("password")) {
            setFieldError("password", errMessage);
          }
        } else {
          toaster.create({
            title: errMessage,
            type: "error",
            duration: 5000,
          });
        }
      }
    },
  });

  return (
    <Box minW={300} maxW={500} color={"gray.500"}>
      <form onSubmit={formik.handleSubmit} noValidate>
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
          <PasswordInput
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
            colorPalette="teal"
            variant="solid"
            color="white"
            fontWeight="bold"
            type="submit"
            disabled={formik.isSubmitting}
            loading={formik.isSubmitting}
            loadingText="Signing in..."
          >
            Sign in
          </Button>
        </Grid>
      </form>
      <Flex gap={2} pt={2}>
        <Text>Do not have an account?</Text>
        <Link href="/pages/signup">
          <Text
            color="teal"
            _hover={{ textDecor: "underline" }}
            cursor="pointer"
          >
            Sign up
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default SigninForm;
