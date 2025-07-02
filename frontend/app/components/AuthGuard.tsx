"use client";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/app/graphql/queries/user.query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_USER);

  const user = data?.me;

  useEffect(() => {
    if (!loading && (!user || error)) {
      router.replace("/pages/signin");
    }
  }, [loading, error, user, router]);

  if (loading) return null;
  return user ? <>{children}</> : null;
};

export default AuthGuard;
