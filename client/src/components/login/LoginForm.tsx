function LoginForm() {
  return (
    <div className=" mt-10">
      <form className="flex items-center justify-center flex-col gap-4 ">
        <div className="items-center justify-center flex-col">
          <label className="block" htmlFor="username">
            Användarnamn
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Skriv ditt användernamn"
            alt="Användarnamn"
            className=" text-center border border-gray-300 rounded-md p-2 px-10"
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
            alt="Lösenord"
            className=" text-center border border-gray-300 rounded-md p-2 px-10"
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
