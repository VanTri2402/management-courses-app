// File: src/app/providers.tsx

"use client"; // Rất quan trọng: Đánh dấu đây là một Client Component

import { SessionProvider } from "next-auth/react";
import React from "react";

// Đây là một component React tiêu chuẩn nhận vào 'children'
export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
