export async function getSlots() {
  const response = await fetch("http://localhost:3000/api/bookings/slots", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Kunde inte hämta tvättider");
  }

  return response.json();
}
export async function getBookings() {
  const response = await fetch("http://localhost:3000/api/bookings/bookings", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Kunde inte hämta bokningar");
  }

  return response.json();
}
export async function bookSlot(slotId: number) {
  const response = await fetch("http://localhost:3000/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      slotId,
    }),
  });

  if (!response.ok) {
    throw new Error("Kunde inte boka tvättiden");
  }

  return response.json();
}
