import getCurrentUser from "@/action/getCurrentUser";
import prisma from "@/libs/prisma.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const body = await request.json();
    const { listingId, startDate, endDate, totalPrice } = body;
    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.error();
    }
    const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });
    return NextResponse.json(listingAndReservation, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server issue" },
      { status: 500 }
    );
  }
}
