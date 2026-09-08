import Rules from "../components/rules/rulesComponent";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

function RulesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb] dark:bg-[#111C22]" >
      <Navbar />

      <main className="flex-1 lg:ml-64">
        <Rules />
      </main>

      <Footer />
    </div>
  );
}

export default RulesPage;
