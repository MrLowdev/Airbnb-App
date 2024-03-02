import prisma from "@/libs/prisma.config";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favotiteIds || [])],
        },
      },
    });

    const safeFavorites = await favorites.map((favorites) => ({
      ...favorites,
      createdAt: favorites.createdAt.toString(),
    }));
    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
