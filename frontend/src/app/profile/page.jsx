"use client";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

import useUserContext from "@/hooks/useUserContext";

const profile = () => {
  const router = useRouter();
  const {
    state: { isAuthenticated },
  } = useUserContext();

  useLayoutEffect(() => {
    !isAuthenticated && router.push("/");
  });

  return <div>My profile</div>;
};
export default profile;
