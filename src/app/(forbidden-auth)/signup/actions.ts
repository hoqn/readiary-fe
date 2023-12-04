"use server";

import authApi from "@/services/api/auth.api";
import { revalidatePath } from "next/cache";

interface SignUpDto {
  email: string;
  password: string;
}

export async function signUp(body: SignUpDto) {
  try {
    await authApi.signUp(body);
    return;
  } catch (e) {
    return {
      message: await (e as Response)?.text(),
    }
  }
} 
