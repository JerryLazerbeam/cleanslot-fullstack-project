import { useLocation } from "react-router-dom";

function Footer() {
  const { pathname } = useLocation();


  const hasSidebar = pathname !== "/";

  return (
    <footer
      className={`border-t border-gray-200 dark:border-gray-700 px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400 ${
        hasSidebar ? "lg:pl-64" : ""
      }`}
    >
      <p>&copy; {new Date().getFullYear()} CleanSlot. All rights reserved</p>
    </footer>
  );
}

export default Footer;
