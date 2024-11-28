"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Home() {
  const handleLoginWithGoogleClick = () => signIn("google");

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="p-5">
        {/* TEXTO */}
        <h2 className="text-xl font-bold">Olá, Gustavo!</h2>
        <Button
          variant="outline"
          className="gap-1 font-bold"
          onClick={handleLoginWithGoogleClick}
        >
          faça seu login
        </Button>
      </div>
    </div>
  );
}
