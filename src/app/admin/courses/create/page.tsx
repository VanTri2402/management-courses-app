// File: src/app/admin/courses/create/page.tsx
"use client"; // <-- Biến thành Client Component

import { createCourse, CreateCourseState } from "@/app/actions/course";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";

// Định nghĩa trạng thái ban đầu
const initialState: CreateCourseState = {};

export default function CreateCoursePage() {
  // Sử dụng useFormState
  const [state, formAction] = useFormState(createCourse, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tạo khóa học mới</CardTitle>
        <CardDescription>
          Bắt đầu bằng cách đặt tên cho khóa học của bạn.
        </CardDescription>
      </CardHeader>
      {/* Thẻ form bây giờ sẽ gọi `formAction` đã được bọc lại */}
      <form action={formAction}>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="title">Tiêu đề khóa học</Label>
            <Input
              id="title"
              name="title"
              placeholder="Ví dụ: Lập trình Next.js nâng cao"
              required
            />
            {/* Hiển thị lỗi validation nếu có */}
            {state.errors?.title && (
              <p className="text-sm text-red-500">{state.errors.title[0]}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Tạo và tiếp tục</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
