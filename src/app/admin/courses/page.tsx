
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản Lý Khóa Học</h1>
        <Button asChild>
          <Link href="/admin/courses/create">Tạo Khóa Học mới</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>
                {course.price
                  ? `${course.price.toLocaleString("vi-VN")} VNĐ`
                  : "Miễn phí"}
              </TableCell>
              <TableCell>
                {course.isPublished ? "Đã xuất bản" : "Nháp"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
