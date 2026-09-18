import Navbar from "../components/navbar/navbar";
import ServiceReportPage from "../components/serviceReport/ReportForm";

function ServiceReport() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb] dark:bg-[#111C22]">
      <Navbar />
      <main className="flex-1 lg:ml-64"></main>
      <ServiceReportPage />
    </div>
  );
}

export default ServiceReport;
