import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (!showHelp) return;
    const timer = setTimeout(() => setShowHelp(false), 3000);
    return () => clearTimeout(timer);
  }, [showHelp]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();

        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/booking");
        }
      } else {
        setError("Fel användarnamn eller lösenord");
      }
    } catch {
      setError("Kunde inte nå servern");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" mt-10">
      <form
        className="flex items-center justify-center flex-col gap-4 "
        onSubmit={handleSubmit}
      >
        <div className="items-center justify-center flex-col mb-3">
          <label className="block " htmlFor="username">
            Användarnamn
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Ange användarnamn"
            value={username}
            autoComplete="username"
            required
            aria-invalid={error === "Fel användarnamn eller lösenord"}
            aria-describedby={error ? "login-error" : undefined}
            onChange={(e) => setUsername(e.target.value)}
            className=" text-center rounded-sm border border-gray-300 bg-white outline-none focus:border-[#1F5C73] dark:border-[#1F5C73] dark:bg-[#111C22] p-3 px-10  focus:placeholder-transparent"
          />
        </div>

        <div className="mb-3">
          <label className="block" htmlFor="password">
            Lösenord
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            value={password}
            autoComplete="current-password"
            required
            aria-invalid={error === "Fel användarnamn eller lösenord"}
            aria-describedby={error ? "login-error" : undefined}
            onChange={(e) => setPassword(e.target.value)}
            className="text-center rounded-sm border border-gray-300 bg-white outline-none focus:border-[#1F5C73] dark:border-[#1F5C73] dark:bg-[#111C22] p-3 px-10  focus:placeholder-transparent"
          />
        </div>
        {error && (
          <p
            id="login-error"
            role="alert"
            className="text-red-700 dark:text-red-400"
          >
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className=" rounded-sm bg-[#1F5C73] px-8 py-3 text-white transition-colors hover:bg-[#17485A] disabled:cursor-not-allowed disabled:opacity-60 "
        >
          {loading ? (
            <>
              <LoaderCircle
                className="size-5 animate-spin"
                aria-hidden="true"
              />
              <span className="sr-only">Loggar in…</span>
            </>
          ) : (
            "Logga in"
          )}
        </button>
        <button
          type="button"
          onClick={() => setShowHelp(true)}
          aria-expanded={showHelp}
          aria-controls="login-help"
          className="w-full rounded-xl px-5 py-3 text-sm font-semibold hover:text-[#1F5C73]"
        >
          Glömt lösenord?
        </button>
        <p
          id="login-help"
          className={`text-sm transition-all duration-500 ${
            showHelp ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          Kontakta din föreningsadministratör så återställer hen ditt lösenord.
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
