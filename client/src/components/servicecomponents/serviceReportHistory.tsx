import { useState } from "react";
import { Mail, MailOpen } from "lucide-react";

// Beskriver vilka uppgifter varje felanmälan innehåller.
type Report = {
  id: string;
  machines: string[];
  description: string;
  createdAt: string;
};

// Komponenten tar emot en lista med felanmälningar.
type Props = {
  reports?: Report[];
};

function ServiceReportHistory({ reports = [] }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [openReportId, setOpenReportId] = useState<string | null>(
    null
  );

  // Visa ingenting om det inte finns några felanmälningar.
  if (reports.length === 0) {
    return null;
  }

  return (
    <details
      className="border rounded-md border-gray-300 mr-7 ml-7 mt-4"
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary className="flex justify-between items-center p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        Meddelanden:

        {isOpen ? (
          <MailOpen className="text-[#1F5C73]" />
        ) : (
          <Mail className="text-[#1F5C73]" />
        )}
      </summary>

      <div className="px-5 pb-5 space-y-4">
        {reports.map((report) => (
          <div key={report.id}>
            <button
              type="button"
              aria-expanded={openReportId === report.id}
              onClick={() =>
                setOpenReportId((previous) =>
                  previous === report.id ? null : report.id
                )
              }
              className="text-left cursor-pointer hover:text-[#1F5C73] transition-colors"
            >
              Fel: {report.description}
            </button>

            {openReportId === report.id && (
              <div className="border border-gray-300 rounded-md p-3 mt-2">
                <p>Maskin: {report.machines.join(", ")}</p>

                <p className="whitespace-pre-wrap break-words">
                  Beskrivning: {report.description}
                </p>
              </div>
            )}

            <p className="text-gray-500">
              Datum:{" "}
              {new Date(report.createdAt).toLocaleDateString("sv-SE")}
            </p>
          </div>
        ))}
      </div>
    </details>
  );
}

export default ServiceReportHistory;