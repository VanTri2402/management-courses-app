// File: src/middleware.ts
import { auth } from "@/auth"; // <-- Bây giờ import này đã an toàn

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isOnAdmin = nextUrl.pathname.startsWith("/admin");

  if (isOnAdmin) {
    if (isLoggedIn) return; // Nếu đã đăng nhập, cho phép truy cập
    // Chuyển hướng người dùng chưa đăng nhập về trang đăng nhập của NextAuth
    return Response.redirect(new URL("/api/auth/signin", nextUrl));
  }
});

// Cấu hình matcher để middleware chỉ chạy khi cần thiết
export const config = {
  matcher: ["/admin/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};