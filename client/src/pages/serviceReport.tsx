import Navbar from "../components/navbar/navbar";
import { useState } from "react";

function ServiceReport() {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    machines: [] as string[],
    description: "",
  });

  function handleMachineChange(machine: string) {
    if (formData.machines.includes(machine)) {
      setFormData({
        ...formData,
        machines: formData.machines.filter((item) => item !== machine),
      });
    } else {
      setFormData({
        ...formData,
        machines: [...formData.machines, machine],
      });
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Du kan tabort denna sen :D
    console.log(formData);
  }
  // till back end
  //await fetch("/api/service-reports", {
  // method: "POST",
  // headers: {
  //"Content-Type": "application/json",
  // },
  // body: JSON.stringify(formData),
  //});

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <Navbar hideDesktopSidebar />

        <section className="px-10 sm:max-w-2xl sm:mx-auto">
          <h1 className="flex justify-center my-4 text-3xl font-bold">
            Felanmälan
          </h1>

          <section className="mb-9">
            <div className=" mb-6">
              <h3 className="mb-2 font-semibold">Telefon*</h3>

              <input
                type="tel"
                placeholder="Nummer"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className=" w-73 sm:w-125 rounded-md border border-gray-300 p-2 focus:placeholder-transparent"
              />
            </div>

            <div>
              <h3 className=" mb-2 font-semibold">E-post*</h3>

              <input
                type="email"
                placeholder="E-post"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className=" w-73 sm:w-125 rounded-md border border-gray-300 p-2 focus:placeholder-transparent"
              />
            </div>
          </section>

          <hr className="border border-gray-300 sm:hidden"></hr>

          <section className="flex flex-col my-9 gap-10">
            <h3 className=" sm:flex justify-center font-semibold">
              Vilken maskin gäller felanmälan?
            </h3>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.machines.includes("Tvättmaskin 1")}
                onChange={() => handleMachineChange("Tvättmaskin 1")}
                className="h-4 w-4"
              />
              Tvättmaskin 1
            </label>

            <label className="flex items-center gap-2">
              <input
                checked={formData.machines.includes("Tvättmaskin 2")}
                onChange={() => handleMachineChange("Tvättmaskin 2")}
                type="checkbox"
                className="h-4 w-4"
              />
              Tvättmaskin 2
            </label>

            <label className="flex items-center gap-2">
              <input
                checked={formData.machines.includes("Tvättmaskin 3")}
                onChange={() => handleMachineChange("Tvättmaskin 3")}
                type="checkbox"
                className="h-4 w-4"
              />
              Tvättmaskin 3
            </label>

            <label className="flex items-center gap-2">
              <input
                checked={formData.machines.includes("Tvättmaskin 4")}
                onChange={() => handleMachineChange("Tvättmaskin 4")}
                type="checkbox"
                className="h-4 w-4"
              />
              Tvättmaskin 4
            </label>
          </section>

          <section className="mb-9">
            <h3 className=" mb-2 font-semibold">Beskriv ditt fel:</h3>

            <textarea
              id="description"
              placeholder="Beskrivning"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className=" w-73 sm:w-115 pb-20  rounded-md border border-gray-300 p-3 focus:placeholder-transparent"
            />
          </section>
          <div className="flex justify-center">
            <button
              type="submit"
              className=" text-white text-lg font-semibold border px-5 py-1 bg-[#1F5C73] hover:bg-gray-700 rounded-md shadow-xl "
            >
              Skicka felanmälan
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}

export default ServiceReport;
