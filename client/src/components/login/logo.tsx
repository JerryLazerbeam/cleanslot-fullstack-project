function Logo() {
  return (
    <a href="/">
      <div className="flex items-center justify-center flex-col text-5xl font-bold mt-15">
        <img
          src="../images/logoclean.png"
          alt="CleanSlot Logo"
          className="h-15 w-auto block dark:hidden"
        />
        <img
          src="../images/CleanSlot-Logo-Darkmode.png"
          alt="CleanSlot Logo"
          className="h-15 w-auto hidden dark:block"
        />
      </div>
    </a>
  );
}

export default Logo;
