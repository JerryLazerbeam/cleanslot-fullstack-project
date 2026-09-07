export async function getProfile() {
  const response = await fetch("http://localhost:3000/api/users/profile", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Kunde inte hämta profil");
  }
  return response.json();
}
