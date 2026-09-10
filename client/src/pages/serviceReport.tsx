import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import ServiceReportPage from "../components/servicecomponents/serviceReportPage";


function ServiceReport() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb] dark:bg-[#111C22]">
      <Navbar />

      <main className="flex-1 lg:ml-64"></main>
      <ServiceReportPage />
      <Footer />
    </div>
  );
}

export default ServiceReport;
