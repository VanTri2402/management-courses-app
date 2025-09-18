// File: src/types/next-auth.d.ts

import { UserRole } from "@prisma/client";
import type { DefaultSession } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";

// Mở rộng module "next-auth"
declare module "next-auth" {
  /**
   * Mở rộng interface Session để thêm các thuộc tính tùy chỉnh
   */
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"]; // Giữ lại các thuộc tính mặc định
  }
}

// Mở rộng module adapters của next-auth
declare module "next-auth/adapters" {
  /**
   * Mở rộng interface AdapterUser để thêm thuộc tính role
   */
  interface AdapterUser {
    role?: UserRole; // Thêm trường role vào đây
  }
}
