import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

function AdminRoute({ children }: Props) {
  const [status, setStatus] = useState<"loading" | "allowed" | "denied">("loading");

  useEffect(() => {
    fetch("http://localhost:3000/api/users/profile", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Inte inloggad");
        }
        return response.json();
      })
      .then((data) => {
        setStatus(data.role === "admin" ? "allowed" : "denied");
      })
      .catch(() => {
        setStatus("denied");
      });
  }, []);

  if (status === "loading") {
    return null;
  }

  if (status === "denied") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default AdminRoute;