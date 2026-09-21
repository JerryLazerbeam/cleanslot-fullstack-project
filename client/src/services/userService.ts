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
export async function getUsers() {
  const response = await fetch("http://localhost:3000/api/users", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Kunde inte hämta användare");
  }

  return response.json();
}

export async function createUser(data: {
  username: string;
  password: string;
  role: string;
  phone: string;
  email: string;
}) {
  const response = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Kunde inte skapa användare");
  }

  return response.json();
}
export async function deleteUser(userId: number) {
  const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Kunde inte ta bort användaren");
  }

  return response.json();
}
