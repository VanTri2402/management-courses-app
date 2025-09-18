// File: src/app/admin/layout.tsx
import React from "react";

// Đây là một Server Component, nó sẽ bao bọc tất cả các trang con trong /admin
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar - Thanh điều hướng bên cạnh */}
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Admin Menu</h2>
        <nav>
          <ul>
            <li>
              <a href="/admin" className="block py-2">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/admin/courses" className="block py-2">
                Courses
              </a>
            </li>
            {/* Chúng ta sẽ thêm các link khác vào đây sau */}
          </ul>
        </nav>
      </aside>

      {/* Main Content - Vùng nội dung chính */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
