export async function createReport(data: {
  phone: string;
  email: string;
  equipment: number[];
  description: string;
}) {
  const response = await fetch("http://localhost:3000/api/reports", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Kunde inte skicka felanmälan");
  }

  return response.json();
}
