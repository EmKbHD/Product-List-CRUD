import { Box, Flex, Text } from "@chakra-ui/react";
import SigninForm from "./SigninForm";

const SigninPage = () => {
  return (
    <Flex
      minH={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      bg="#F7FAFC"
    >
      <Box>
        <Text
          color="teal"
          textAlign="center"
          fontSize="2rem"
          fontWeight="bold"
          pb="2rem"
        >
          {/* Sign in into your account to continue */}
          Sign in
        </Text>
        <SigninForm />
      </Box>
    </Flex>
  );
};

export default SigninPage;
