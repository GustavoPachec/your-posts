"use client";

import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google");

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        variant="outline"
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 bg-white"
        onClick={handleLoginWithGoogleClick}
      >
        <Image
          alt="Fazer login com o Google"
          src="/google.svg"
          width={18}
          height={18}
          className="inline-block"
        />
        <span className="text-sm font-medium text-gray-700">
          Entrar com Google
        </span>
      </Button>
    </div>
  );
};

export default SignInDialog;
