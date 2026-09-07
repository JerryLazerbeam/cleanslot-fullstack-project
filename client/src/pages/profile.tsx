import PasswordUpdater from "../components/Profile/passwordUppdater";
import Navbar from "../components/navbar/navbar";
import ServiceReportHistory from "../components/servicecomponents/serviceReportHistory";


function Profile() {
  return (
    <div className="Profile">
      <Navbar />
      <PasswordUpdater />
      <ServiceReportHistory reports={[
    {
      id: "1",
      machines: ["Tvättmaskin 1"],
      description: "Tvättmaskinen startar inte",
      createdAt: "2026-09-07T10:00:00Z",
    },
    {
      id: "2",
      machines: ["Tvättmaskin 2", "Tvättmaskin 3"],
      description: "Maskinerna läcker vatten",
      createdAt: "2026-09-08T12:00:00Z",
    },
    
  ]} />
    </div>
  );
}

export default Profile;
