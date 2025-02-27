"use client";

import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <button
      onClick={() =>
        signIn("id-server", { redirectTo: "/" }, { prompt: "login" })
      }
    >
      Login
    </button>
  );
};

export default LoginButton;
