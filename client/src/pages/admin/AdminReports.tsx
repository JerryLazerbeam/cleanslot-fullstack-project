import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarAdmin from "../../components/navbar/navbarAdmin";
import type { Report, ReportStatus } from "../../components/admin/adminTypes";
import { getReports, deleteReport } from "../../services/reportService";
import { Trash, EllipsisVertical } from "lucide-react";
import ReportDetailView from "../../components/admin/ReportDetailView";

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    getReports()
      .then((data) => setReports(data))
      .catch((error) => console.error(error));
  }, []);

  async function handleDelete(reportId: number) {
    try {
      await deleteReport(reportId);
      setReports((prev) => prev.filter((r) => r.report_id !== reportId));
    } catch (error) {
      console.error(error);
      alert("Kunde inte ta bort felanmälan");
    }
  }
  function handleReportStatusChange(reportId: number, status: ReportStatus) {
    setReports((prev) =>
      prev.map((r) => (r.report_id === reportId ? { ...r, status } : r)),
    );
    setSelectedReport((prev) =>
      prev && prev.report_id === reportId ? { ...prev, status } : prev,
    );
  }

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
                    <th>Boende</th>
                    <th>Utrustning</th>
                    <th>Beskrivning</th>
                    <th>Datum</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => (
                    <tr
                      className="cursor-pointer hover:bg-gray-300 dark:hover:bg-white/10"
                      onClick={() => setSelectedReport(r)}
                      key={r.report_id}
                    >
                      <td>{r.username}</td>
                      <td>{r.equipment}</td>
                      <td>{r.description}</td>
                      <td>
                        {new Date(r.created_at).toLocaleDateString("sv-SE")}
                      </td>
                      <td>{r.status}</td>
                      <td>
                        <EllipsisVertical className="text-gray-400 transition delay-150 duration-300 ease-out hover:-translate-y-0.5 hover:bg-shadow-sm"></EllipsisVertical>{" "}
                      </td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(r.report_id);
                          }}
                          className="text-gray-400 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                        >
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      {selectedReport && (
        <ReportDetailView
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onStatusChange={handleReportStatusChange}
        />
      )}
    </div>
  );
}
