import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma.config";
import getCurrentUser from "@/action/getCurrentUser";

interface IParams {
  listingId?: string;
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
    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid Id");
    }

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });
    return NextResponse.json(listing, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server issue" },
      { status: 500 }
    );
  }
}
