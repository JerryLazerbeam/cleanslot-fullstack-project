export async function getRules(): Promise<{ content: string } | null> {
  const response = await fetch("http://localhost:3000/api/rules", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Kunde inte hämta regler");
  }

  // Servern svarar tomt om föreningen inte har några regler än
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function updateRules(content: string) {
  const response = await fetch("http://localhost:3000/api/rules", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Kunde inte spara regler");
  }

  return response.json();
}
