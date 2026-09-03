import { Sparkles } from "lucide-react";

function Logo() {
  return (
    <a href="/">
      <div className="flex items-center justify-center flex-col mt-8 text-5xl font-bold ">
        <Sparkles className=" size-12 text-yellow-400" />
        <h1>CleanSlot</h1>
      </div>
    </a>
  );
}

export default Logo;
