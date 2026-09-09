import { SquarePen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  getProfile,
  changePassword,
  changeProfileImage,
} from "../../services/userService";

function PasswordUpdater() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [preview, setPreview] = useState("/images/user.svg");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    getProfile().then((data) => {
      setUsername(data.username);
    });
    fetch("http://localhost:3000/api/users/profile-image", {
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        setPreview("http://localhost:3000/api/users/profile-image");
      }
    });
  }, []);
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);
  function handleImageClick() {
    fileInputRef.current?.click();
  }
  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const imageUrl = URL.createObjectURL(file);

    previewUrlRef.current = imageUrl;
    setPreview(imageUrl);

    try {
      await changeProfileImage(file);
      alert("Profilbilden har sparats!");
    } catch (error) {
      alert("Kunde inte spara profilbilden");
    }
  }
  async function handlePasswordChange() {
    try {
      await changePassword(newPassword);

      alert("Lösenordet har ändrats!");
      setNewPassword("");
    } catch (error) {
      alert("Kunde inte ändra lösenordet");
    }
  }
  return (
    <main className="bg-[#f8f9fb] px-4 py-6 text-[#16242C] dark:bg-[#111C22] dark:text-[#C7CED1] sm:px-6 md:py-10">
      <section className="mx-auto w-full max-w-2xl">
        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-[#16242C] sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">Din profil</h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Användarnamn: {username}
            </p>
          </div>

          <section className="mt-8 flex flex-col items-center">
            <div
              onClick={handleImageClick}
              className="group relative h-36 w-36 cursor-pointer overflow-hidden rounded-full bg-gray-300 shadow-md sm:h-44 sm:w-44"
            >
              <img
                src={preview}
                alt="Profilbild"
                className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-40"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/50 group-hover:opacity-100">
                <SquarePen className="text-white" size={28} />
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Klicka på bilden för att byta profilbild
            </p>
          </section>

          <section className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-700">
            <h2 className="text-xl font-semibold">Byt lösenord</h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Ange ditt nya lösenord nedan.
            </p>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row">
              <input
                type="password"
                placeholder="Nytt lösenord"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-3 outline-none focus:border-[#1F5C73] dark:border-[#1F5C73] dark:bg-[#111C22]"
              />

              <button
                onClick={handlePasswordChange}
                className="w-full rounded-lg bg-[#1F5C73] px-8 py-3 text-white transition-colors hover:bg-[#17485A] sm:w-auto"
              >
                Spara
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default PasswordUpdater;
