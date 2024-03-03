import getCurrentUser from "@/action/getCurrentUser";
import getFavoriteListings from "@/action/getFavoritelistings";
import getReservations from "@/action/getReservations";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import React from "react";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const currentUser = await getCurrentUser();
  const listing = await getFavoriteListings();

  if (listing.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
