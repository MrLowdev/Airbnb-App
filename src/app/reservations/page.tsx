import getCurrentUser from "@/action/getCurrentUser";
import getReservations from "@/action/getReservations";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import React from "react";
import ReservationsClient from "./ReservationsClient";

const ReservationPage = async () => {
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
          title="No reservations found"
          subtitle="Looks like you have no reservations on year properties"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservation}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationPage;
