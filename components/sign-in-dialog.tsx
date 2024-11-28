import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogDescription, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google");

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conect-se usando sua conta do Google.
        </DialogDescription>
      </DialogHeader>

      <Button
        variant="outline"
        className="gap-1 font-bold"
        onClick={handleLoginWithGoogleClick}
      >
        <Image
          alt="Fazer login com o Google"
          src="/google.svg"
          width={18}
          height={18}
        />
      </Button>
    </>
  );
};

export default SignInDialog;
