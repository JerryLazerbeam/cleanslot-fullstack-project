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
export async function getReports() {
  const response = await fetch("http://localhost:3000/api/reports", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Kunde inte hämta felanmälningar");
  }

  return response.json();
}
export async function deleteReport(reportId: number) {
  const response = await fetch(`http://localhost:3000/api/reports/${reportId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Kunde inte ta bort felanmälan");
  }

  return response.json();
}
export async function updateReportStatus(reportId: number, status: string) {
  const response = await fetch(`http://localhost:3000/api/reports/${reportId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Kunde inte uppdatera status");
  }

  return response.json();
}
