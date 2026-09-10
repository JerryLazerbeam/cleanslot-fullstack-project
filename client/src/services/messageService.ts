export async function getMessages() {
  const response = await fetch("http://localhost:3000/api/messages", {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Kunde inte hämta meddelanden");
  }

  return response.json();
}
export async function markMessageAsRead(messageId: number) {
  const response = await fetch(
    `http://localhost:3000/api/messages/${messageId}/read`,
    {
      method: "PUT",
      credentials: "include",
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Kunde inte markera meddelandet som läst");
  }

  return response.json();
}
