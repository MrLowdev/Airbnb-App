import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma.config";
import getCurrentUser from "@/action/getCurrentUser";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const { reservationId } = params;
    if (!reservationId || typeof reservationId !== "string") {
      throw new Error("Invalid Id");
    }
    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });

    return NextResponse.json(reservation, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server issue" },
      { status: 500 }
    );
  }
}
