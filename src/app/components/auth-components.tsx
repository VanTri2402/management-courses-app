"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignInButton() {
  // Sửa lỗi chính tả "Goggle" thành "Google"
  return (
    <Button className="primary" onClick={() => signIn("google")}>
      Sign In with Google
    </Button>
  );
}

export function AuthComponent() {
  const { data: session } = useSession();

  if (session) {
    // Thêm từ khóa "return" ở đây
    return (
      <div className="flex items-center gap-[10px]">
        <p>Welcome, {session.user?.name}</p>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    );
  }

  return <SignInButton />;
}
