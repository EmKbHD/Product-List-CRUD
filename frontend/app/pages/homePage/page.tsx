"use client";
import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/app/graphql/queries/user.query";
import AuthGuard from "@/app/components/AuthGuard";
import Products from "../products/page";
import Link from "next/link";

const HomePage = () => {
  const { data } = useQuery(GET_USER);
  const user = data?.me;

  console.log("User data:", user);

  return (
    <AuthGuard>
      <Flex
        justifyContent="space-between"
        w="dvw"
        mx="auto"
        px={["1rem", "2rem", "4rem", "5rem", "6rem"]}
        py="1.25rem"
        bg={"teal.200"}
        color={"black"}
      >
        <Link
          href="/pages/homePage"
          style={{
            fontWeight: "bold",
            textDecoration: "none",
            color: "black",
          }}
        >
          <Text fontSize="3xl">Product App</Text>
        </Link>
        <Box display={"flex"} alignItems="center" gap="1rem">
          <Text>{user?.firstName || "User"}</Text>
          <Link href="/">
            <Button>log out</Button>
          </Link>
        </Box>
      </Flex>
      <Box
        minH={"100vh"}
        mt={"2rem"}
        px={["1rem", "2rem", "4rem", "5rem", "6rem"]}
      >
        <Text color={"black"} fontSize="2xl" fontWeight="bold" mb={4}>
          In Stock Products
        </Text>
        <Products />
      </Box>
    </AuthGuard>
  );
};

export default HomePage;
