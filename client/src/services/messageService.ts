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
// Säger till navbaren att antalet olästa kan ha ändrats
export const MESSAGES_CHANGED = "messages-changed";

export function notifyMessagesChanged() {
  window.dispatchEvent(new Event(MESSAGES_CHANGED));
}

export async function getUnreadCount(): Promise<number> {
  const messages: { is_read: number }[] = await getMessages();
  return messages.filter((message) => message.is_read === 0).length;
}

export async function broadcastMessage(title: string, message: string) {
  const response = await fetch("http://localhost:3000/api/messages/broadcast", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title, message }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Kunde inte skicka meddelandet");
  }

  return response.json();
}
