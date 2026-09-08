import { useState } from "react";
import { Mail, MailOpen } from "lucide-react";
import type { ServiceReport } from "./serviceReportTypes";

type Props = {
  reports?: ServiceReport[];
  onMarkAsRead?: (reportId: string) => void;
};

function ServiceReportHistory({ reports = [], onMarkAsRead }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [openReportId, setOpenReportId] = useState<string | null>(null);
  const unreadCount = reports.filter((report) => !report.isRead).length;

  const hasReports = reports.length > 0;
  const showReports = hasReports && isOpen;

  return (
    <div className="border rounded-md border-gray-300 mr-7 ml-7 mt-10 sm:max-w-sm sm:mx-auto">
      <button
        type="button"
        disabled={!hasReports}
        aria-expanded={showReports}
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex w-full justify-between items-center p-5 text-left enabled:cursor-pointer disabled:cursor-default disabled:text-gray-500"
      >
        {hasReports ? "Meddelanden:" : "Du har inga meddelanden"}

        <span className="relative">
          {hasReports &&
            (showReports ? (
              <MailOpen className="text-[#1F5C73]" />
            ) : (
              <Mail className="text-[#1F5C73]" />
            ))}

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-semibold text-white">
              <span className="sr-only">Antal felanmälningar: </span>
              {unreadCount}
            </span>
          )}
        </span>
      </button>

      {showReports && (
        <div className="px-5 pb-5 space-y-4">
          {reports.map((report) => (
            <div key={report.id}>
              <button
                type="button"
                aria-expanded={openReportId === report.id}
                onClick={() => {
                  setOpenReportId((previous) =>
                    previous === report.id ? null : report.id,
                  );

                  if (openReportId !== report.id) {
                    onMarkAsRead?.(report.id);
                  }
                }}
                className="text-left cursor-pointer hover:text-[#1F5C73] transition-colors"
              >
                Fel: {report.description}
              </button>

              {openReportId === report.id && (
                <div className="border border-gray-300 rounded-md p-3 mt-2">
                  <p>Maskin: {report.machines.join(", ")}</p>

                  <p className="whitespace-pre-wrap">
                    Beskrivning: {report.description}
                  </p>
                </div>
              )}

              <p className="text-gray-500">
                Datum: {new Date(report.createdAt).toLocaleDateString("sv-SE")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ServiceReportHistory;
