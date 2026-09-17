import NavbarAdmin from "../../components/navbar/navbarAdmin";
import DashboardContent from "../../components/admin/DashboardContent";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb] dark:bg-[#111C22]">
      <NavbarAdmin />
      <main className="flex-1 lg:ml-64">
        <DashboardContent />
      </main>
    </div>
  );
}
