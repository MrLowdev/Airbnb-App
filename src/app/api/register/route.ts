import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma.config";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    if (!email || !name || !password) {
      return NextResponse.error();
    }
    const isUserExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (isUserExist) {
      return NextResponse.json(
        { message: "This email already taken" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server issue" },
      { status: 500 }
    );
  }
}
