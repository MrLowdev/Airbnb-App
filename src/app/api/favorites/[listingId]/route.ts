import getCurrentUser from "@/action/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma.config";

interface IParams {
  listingId?: string;
}

export async function POST(
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
    let favoriteIds = [...(currentUser.favotiteIds || [])];
    favoriteIds.push(listingId);
    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favotiteIds: favoriteIds,
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
    let favoriteIds = [...(currentUser.favotiteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favotiteIds: favoriteIds,
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
