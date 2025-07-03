"use client";
import React from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/app/graphql/queries/user.query";
import AuthGuard from "@/app/components/AuthGuard";

const HomePage = () => {
  const { data } = useQuery(GET_USER);
  const user = data?.me;

  console.log("User data:", user);

  return (
    <AuthGuard>
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Welcome {user?.firstName || "User"}!
        </Text>
        <Text>
          This is a simple home page component built with Chakra UI and React.
        </Text>
        <Flex mt={4} justifyContent="center">
          <Button colorScheme="teal" size="md">
            Get Started
          </Button>
        </Flex>
      </Box>
    </AuthGuard>
  );
};

export default HomePage;
