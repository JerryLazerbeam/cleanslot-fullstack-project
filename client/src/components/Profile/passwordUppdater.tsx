import Logo from "../login/logo";
import { SquarePen } from "lucide-react";
import { useRef, useState } from "react";

function PasswordUpdater() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState("/images/user.svg");

  function handleImageClick() {
    fileInputRef.current?.click();
  }
  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  }

  return (
    <main>
      <section>
        <div className=" flex justify-start px-8">
          <Logo small />
        </div>

        <hr className=" border-gray-400/20 my-8" />

        <h1 className="mt-8 text-center text-4xl font-bold">Din profil</h1>
        <section className="flex flex-col items-center gap-6">
          <div className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 shadow-2xl hover:bg-black/70 transition-colors duration-300 cursor-pointer overflow-hidden mt-10 p-40">
            <img
              src={preview}
              alt="Profile Bild"
              className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-300"
            />

            <div
              onClick={handleImageClick}
              className="absolute inset-0 flex items-center justify-center bg-black-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <SquarePen className="text-white" />
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
        </section>
      </section>
      <section className="flex flex-col items-center font-semibold text-lg mt-15">
        <h1>Byt lösenord</h1>

        <input
          type="text"
          placeholder="Nytt lösenord"
          className="border rounded-lg p-2 pl-3 mt-4"
        ></input>
        <button className="mt-8 text-white text-lg font-semibold bg-[#1F5C73] border rounded-lg focus:border-dark p-3 px-7">
          Spara
        </button>
      </section>
    </main>
  );
}

export default PasswordUpdater;
