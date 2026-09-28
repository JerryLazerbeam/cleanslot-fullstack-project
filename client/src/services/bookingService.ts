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
export async function deleteBooking(bookingId: number) {
  const response = await fetch(
    `http://localhost:3000/api/bookings/${bookingId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Kunde inte avboka tvättiden");
  }

  return response.json();
}
export async function createSlot(data: {
  date: string;
  startTime: string;
  endTime: string;
}) {
  const response = await fetch("http://localhost:3000/api/bookings/slots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Kunde inte skapa tvättid");
  }

  return response.json();
}
export async function getAdminSlots() {
  const response = await fetch(
    "http://localhost:3000/api/bookings/admin/slots",
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta tvättider");
  }

  return response.json();
}
export async function getUpcomingBookings() {
  const response = await fetch("http://localhost:3000/api/bookings/upcoming", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Kunde inte hämta kommande bokningar");
  }

  return response.json();
}
export async function getReminders(bookingId: number): Promise<number[]> {
  const response = await fetch(
    `http://localhost:3000/api/bookings/${bookingId}/reminders`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta påminnelser");
  }

  return response.json();
}
export async function saveReminders(bookingId: number, minutes: number[]) {
  const response = await fetch(
    `http://localhost:3000/api/bookings/${bookingId}/reminders`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ minutes }),
    },
  );

  if (!response.ok) {
    throw new Error("Kunde inte spara påminnelser");
  }

  return response.json();
}
export async function deleteSlot(slotId: number) {
  const response = await fetch(
    `http://localhost:3000/api/bookings/slots/${slotId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Kunde inte ta bort tvättiden");
  }

  return response.json();
}
