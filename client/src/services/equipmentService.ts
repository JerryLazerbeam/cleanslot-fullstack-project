export async function getAdminEquipment() {
  const response = await fetch("http://localhost:3000/api/equipment/admin", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Kunde inte hämta maskiner");
  }

  return response.json();
}

export async function setEquipmentAvailability(
  equipmentId: number,
  isAvailable: boolean,
) {
  const response = await fetch(
    `http://localhost:3000/api/equipment/${equipmentId}/availability`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ isAvailable }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Kunde inte uppdatera maskinen");
  }

  return response.json();
}
