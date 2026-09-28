import { useEffect, useState } from "react";
import { getRules } from "../../services/rulesService";

const DEFAULT_RULES = [
  "Respektera din bokade tvättid.",
  "Lämna tvättstugan ren och städad.",
  "Ta bort tvätt och tillhörigheter när din tid är slut.",
  "Om du inte längre kan nyttja din bokade tid, vänligen avboka den i god tid så att andra kan använda den.",
  "Felanmäl maskiner som inte fungerar.",
];

function Rules() {
  const [rules, setRules] = useState<string[]>(DEFAULT_RULES);

  useEffect(() => {
    getRules()
      .then((data) => {
        if (!data?.content) return;

        // En regel per rad, utan tomma rader och inledande "•"
        const lines = data.content
          .split("\n")
          .map((line) => line.replace(/^•\s*/, "").trim())
          .filter(Boolean);

        if (lines.length > 0) setRules(lines);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="px-4">
      <div className="mx-auto mt-10 w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-6 text-[#16242C] shadow-lg dark:border-none dark:bg-[#16242C] dark:text-[#C7CED1] dark:shadow-none sm:p-8">
        <h1 className="text-center text-3xl font-bold">Förhållningsregler</h1>

        <div className="mt-8 space-y-4 text-left">
          {rules.map((rule, i) => (
            <p key={i}>• {rule}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rules;
