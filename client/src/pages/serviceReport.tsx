import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import type { CreateServiceReport } from "../components/servicecomponents/serviceReportTypes";
import { useState } from "react";

function ServiceReport() {
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
    <main className="min-h-screen flex flex-col bg-[#f8f9fb] dark:bg-[#111C22]">
      <Navbar />

      <form
        onSubmit={handleSubmit}
        className="flex-1 lg:ml-64 px-4 py-6 sm:px-6 md:py-10 text-[#16242C] dark:text-[#C7CED1]"
      >
        <section className="mx-auto w-full max-w-3xl">
          <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-[#16242C] sm:p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-[#16242C] dark:text-[#C7CED1]">
                Felanmälan
              </h1>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Fyll i formuläret så återkommer vi så snart som möjligt.
              </p>
            </div>

            <section className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium">Telefon*</label>

                <input
                  type="tel"
                  required
                  placeholder="Nummer"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 bg-white p-3 outline-none focus:border-[#1F5C73] dark:border-[#1F5C73] dark:bg-[#111C22]"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">E-post*</label>

                <input
                  type="email"
                  required
                  placeholder="E-post"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 bg-white p-3 outline-none focus:border-[#1F5C73] dark:border-[#1F5C73] dark:bg-[#111C22]"
                />
              </div>
            </section>

            <section className="my-8 border-y border-gray-200 py-8 dark:border-gray-700">
              <h2 className="mb-5 text-lg font-semibold">
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

            <section>
              <label htmlFor="description" className="mb-2 block font-medium">
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
                className="min-h-36 w-full resize-y rounded-md border border-gray-300 bg-white p-3 outline-none focus:border-[#1F5C73] dark:border-[#1F5C73] dark:bg-[#111C22]"
              />
            </section>

            <div className="mt-8 flex justify-center sm:justify-end">
              <button
                type="submit"
                className="w-full rounded-lg bg-[#1F5C73] px-8 py-3 text-white transition-colors hover:bg-[#17485A] sm:w-auto"
              >
                Skicka felanmälan
              </button>
            </div>
          </div>
        </section>
      </form>

      <footer className="lg:ml-64">
        <Footer />
      </footer>
    </main>
  );
}

export default ServiceReport;
