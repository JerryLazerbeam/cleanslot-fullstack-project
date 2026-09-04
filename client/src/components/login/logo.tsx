import { Sparkles } from "lucide-react";

type LogoProps = {
  small?: boolean;
};

function Logo({ small = false }: LogoProps) {
  return (
    <a href="/">
      <div
        className={`flex items-center justify-center flex-col mt-8 ${small ? "text-3xl" : "text-5xl"} font-bold `}
      >
        <Sparkles className=" text-yellow-400" />
        <h1>CleanSlot</h1>
      </div>
    </a>
  );
}

export default Logo;
