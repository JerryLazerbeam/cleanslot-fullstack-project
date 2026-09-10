import type { CreateServiceReport } from "./serviceReportTypes";
import { useState } from "react";

function ServiceReportPage() {
  const [formData, setFormData] = useState<CreateServiceReport>({
    phone: "",
    email: "",
    machines: [],
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

    console.log(formData);
  }

  return (
    <main className="min-h-screen bg-[#f8f9fb] dark:bg-[#111C22] dark:text-[#C7CED1] lg:ml-64 px-4 py-6 sm:px-6 md:py-10">
      <form onSubmit={handleSubmit}>
        <section className="mx-auto w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-none dark:bg-[#16242C] dark:shadow-none sm:p-8">
          {/* Titel */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Felanmälan</h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Fyll i formuläret så återkommer vi så snart som möjligt.
            </p>
          </div>

          {/* Kontaktuppgifter */}
          <section className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold">Telefon*</label>

              <input
                type="tel"
                required
                placeholder="Nummer"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 p-3 focus:border-[#1F5C73] focus:outline-none dark:border-[#1F5C73] dark:bg-[#111C22]"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">E-post*</label>

              <input
                type="email"
                required
                placeholder="E-post"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 p-3 focus:border-[#1F5C73] focus:outline-none dark:border-[#1F5C73] dark:bg-[#111C22]"
              />
            </div>
          </section>

          {/* Maskiner */}
          <section className="my-8 border-y border-gray-200 py-8 dark:border-gray-700">
            <h2 className="mb-5 text-center text-lg font-semibold">
              Vilken maskin gäller felanmälan?
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["washer-1", "Tvättmaskin 1"],
                ["washer-2", "Tvättmaskin 2"],
                ["washer-3", "Tvättmaskin 3"],
                ["washer-4", "Tvättmaskin 4"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 transition hover:border-[#1F5C73] dark:border-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={formData.machines.includes(value)}
                    onChange={() => handleMachineChange(value)}
                    className="h-4 w-4 accent-[#1F5C73]"
                  />

                  <span>{label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Beskrivning */}
          <section>
            <label htmlFor="description" className="mb-2 block font-semibold">
              Beskriv ditt fel*
            </label>

            <textarea
              id="description"
              required
              placeholder="Beskrivning"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="min-h-36 w-full resize-y rounded-md border border-gray-300 p-3 focus:border-[#1F5C73] focus:outline-none dark:border-[#1F5C73] dark:bg-[#111C22]"
            />
          </section>

          {/* Knapp */}
          <div className="mt-8 flex justify-center sm:justify-end">
            <button
              type="submit"
              className="w-full rounded-lg bg-[#1F5C73] px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-[#17485A] sm:w-auto"
            >
              Skicka felanmälan
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}

export default ServiceReportPage;
