import type { ReportSummaryItem } from "./adminTypes";

type Props = {
  reports: ReportSummaryItem[];
  onManage: () => void;
};

function ReportsSummary({ reports, onManage }: Props) {
  return (
    <div className="mx-4 mt-8">
      <h2 className="mb-4 text-lg font-semibold">Felanmälningar</h2>

      <div className="border border-gray-300 rounded-lg p-4">
        <p className="font-semibold mb-4">{reports.length} nya</p>

        {reports.map((report) => (
          <div
            key={report.id}
            className="flex justify-between py-2 border-b border-gray-200"
          >
            <span>{report.machine}</span>
            <span>{report.status}</span>
          </div>
        ))}

        <div className="flex justify-end mt-4">
          <button onClick={onManage} className="hover:underline">
            Hantera →
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportsSummary;