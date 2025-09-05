"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
export function SignInButton() {
  return <Button onClick={() => signIn("google")}>Sign In with Goggle</Button>;
}

export function AuthComponent() {
  const { data: session } = useSession();

  if (session) {
    <div className="flex items-center gap-[10px]">
      <p>Welcome , {session.user?.name}</p>
      <Button onClick={() => signOut()}>Sign Out</Button>;
    </div>;
  }

  return <SignInButton />;
}
