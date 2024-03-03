import getCurrentUser from "@/action/getCurrentUser";
import getReservations from "@/action/getReservations";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import React from "react";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservation = await getReservations({ userId: currentUser.id });

  if (reservation.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you haven't reserved any trios"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <TripsClient reservations={reservation} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripsPage;
