// File: src/app/actions/course.ts
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Dùng Zod để tạo Schema xác thực dữ liệu (Kiến thức Ngày 3)
const CreateCourseSchema = z.object({
  title: z.string().min(3, {
    message: "Tiêu đề phải có ít nhất 3 ký tự.",
  }),
});

// Định nghĩa kiểu dữ liệu cho trạng thái form sẽ trả về (Kiến thức Ngày 6)
export type CreateCourseState = {
  errors?: {
    title?: string[];
  };
  message?: string;
};

// Cập nhật hàm để nhận prevState và trả về Promise<CreateCourseState>
// Đây là yêu cầu của hook useFormState
export async function createCourse(
  prevState: CreateCourseState,
  formData: FormData
): Promise<CreateCourseState> {
  // Lớp bảo vệ #1: Xác thực người dùng (Kiến thức Ngày 5)
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Bạn cần đăng nhập để tạo khóa học." };
  }
  const userId = session.user.id;

  // Lớp bảo vệ #2: Xác thực dữ liệu (Kiến thức Ngày 3)
  const validatedFields = CreateCourseSchema.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Tương tác với Database (Kiến thức Ngày 2)
  try {
    await prisma.course.create({
      data: {
        title: validatedFields.data.title,
        instructorId: userId,
      },
    });
  } catch (error) {
    return {
      message: "Lỗi CSDL: Không thể tạo khóa học.",
    };
  }

  // Làm mới dữ liệu và chuyển hướng
  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}
