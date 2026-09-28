import type { Report, ReportStatus } from "./adminTypes";
import { updateReportStatus } from "../../services/reportService";

type Props = {
  report: Report;
  onClose: () => void;
  onStatusChange: (reportId: number, status: ReportStatus) => void;
};

const STATUS_OPTIONS: ReportStatus[] = ["Ny", "Pågående", "Åtgärdad"];

function ReportDetailView({ report, onClose, onStatusChange }: Props) {
  async function handleStatusChange(status: ReportStatus) {
    try {
      await updateReportStatus(report.report_id, status);
      onStatusChange(report.report_id, status);
    } catch (error) {
      console.error(error);
      alert("Kunde inte uppdatera status");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-[#16242C] rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Felanmälan</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            ✕
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <p><span className="font-semibold">Boende:</span> {report.username}</p>
          <p><span className="font-semibold">Telefon:</span> {report.phone}</p>
          <p><span className="font-semibold">E-post:</span> {report.email}</p>
          <p><span className="font-semibold">Utrustning:</span> {report.equipment}</p>
          <p><span className="font-semibold">Beskrivning:</span> {report.description}</p>
          <p>
            <span className="font-semibold">Datum:</span>{" "}
            {new Date(report.created_at).toLocaleDateString("sv-SE")}
          </p>
        </div>

        <div>
          <label className="block font-semibold mb-2">Status</label>
          <select
            value={report.status}
            onChange={(e) => handleStatusChange(e.target.value as ReportStatus)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default ReportDetailView;