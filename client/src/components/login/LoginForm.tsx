import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    //till backend
  // const response = await fetch("http://localhost:3000/api/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(loginData),
  // });

  //------------------------------------------------------
    //tabort console.log när du skickar till backend

    console.log("username:", loginData.username);
    console.log("password:", "*".repeat(loginData.password.length));


    navigate("/rules");
  }


  return (
    <div className=" mt-10">
      <form
        className="flex items-center justify-center flex-col gap-4 "
        onSubmit={handleSubmit}
      >
        <div className="items-center justify-center flex-col">
          <label className="block" htmlFor="username">
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
            onChange={(e) => setUsername(e.target.value)}
            className=" text-center border border-gray-300 rounded-md p-2 px-10  focus:placeholder-transparent"
          />
        </div>

        <div>
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
            onChange={(e) => setPassword(e.target.value)}
            className=" text-center border border-gray-300 rounded-md p-2 px-10  focus:placeholder-transparent"
          />
        </div>

        <button
          type="submit"
          className=" text-white text-lg font-semibold border px-5 py-1 bg-black hover:bg-gray-700 rounded-md shadow-xl "
        >
          Logga in
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
