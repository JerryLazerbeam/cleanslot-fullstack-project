import Navbar from "../components/navbar/navbar";
import ServiceReportPage from "../components/serviceReport/ReportForm";

function ServiceReport() {
  return (
    <div className="flex-1 flex flex-col bg-[#f8f9fb] dark:bg-[#111C22]">
      <Navbar />
      <ServiceReportPage />
    </div>
  );
}

export default ServiceReport;
