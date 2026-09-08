import PasswordUpdater from "../components/Profile/passwordUppdater";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import ServiceReportHistory from "../components/servicecomponents/serviceReportHistory";

function Profile() {
  return (
    <div className=" min-h-screen bg-[#f8f9fb] dark:bg-[#111C22] dark:text-[#C7CED1] ">
      <Navbar />

      <main className="flex-1 lg:ml-64">
        <PasswordUpdater />
        <ServiceReportHistory />
      </main>

      <Footer />
    </div>
  );
}

export default Profile;

// Test kod ignorera

//reports={[
// {
// id: "1",
// machines: ["Tvättmaskin 1"],
//  description: "Tvättmaskinen startar inte",
// createdAt: "2026-09-07T10:00:00Z",
//},
// {
// id: "2",
// machines: ["Tvättmaskin 2", "Tvättmaskin 3"],
// description: "Maskinerna läcker vatten",
//  createdAt: "2026-09-08T12:00:00Z",
// },
// ]}
