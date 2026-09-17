import { Link } from "react-router-dom";
import NavbarAdmin from "../../components/navbar/navbarAdmin";
import type { ReportSummaryItem } from "../../components/admin/adminTypes";

const reports: ReportSummaryItem[] = [];

export default function AdminReports() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb] dark:bg-[#111C22]">
      <NavbarAdmin />
      <main className="flex-1 flex items-center justify-center p-4 py-10 sm:p-8 lg:pl-64">
        <div className="p-4 py-10 sm:p-8 sm:py-25 max-w-4xl w-full border rounded-lg border-gray-300 shadow-sm">
          <Link to="/admin">Tillbaka</Link>
          <h1 className="text-2xl text-center font-bold my-4">
            Felanmälningar
          </h1>

          {reports.length === 0 ? (
            <p className="text-gray-400 text-center">Inga felanmälningar än</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-105">
                <thead>
                  <tr>
                    <th>Maskin</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => (
                    <tr key={r.id}>
                      <td>{r.machine}</td>
                      <td>{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
