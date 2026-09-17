import Rules from "../components/rules/rulesComponent";
import Navbar from "../components/navbar/navbar";

function RulesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb] dark:bg-[#111C22]">
      <Navbar />

      <main className="flex-1 lg:ml-64">
        <Rules />
      </main>

     
    </div>
  );
}

export default RulesPage;
