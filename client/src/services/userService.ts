export async function getProfile() {
  const response = await fetch("http://localhost:3000/api/users/profile", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Kunde inte hämta profil");
  }
  return response.json();
}
export async function changePassword(newPassword: string) {
  const response = await fetch("http://localhost:3000/api/users/password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      newPassword,
    }),
  });

  if (!response.ok) {
    throw new Error("Kunde inte ändra lösenord");
  }

  return response.json();
}
export async function changeProfileImage(file: File) {
  const formData = new FormData();
  formData.append("profileImage", file);
  const response = await fetch(
    "http://localhost:3000/api/users/profile-image",
    {
      method: "PUT",
      credentials: "include",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Kunde inte uppdatera profilbild");
  }

  return response.json();
}
