import React from "react";
import SignupForm from "./SignupForm";
import { Box, Flex, Text } from "@chakra-ui/react";

const SignupPage = () => {
  return (
    <Flex
      minH={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      bg="#F7FAFC"
    >
      <Box color={"gray.500"}>
        <Text fontSize="2rem" color="teal" textAlign="center" fontWeight="bold">
          Sign up to continue
        </Text>
        <SignupForm />
      </Box>
    </Flex>
  );
};

export default SignupPage;
