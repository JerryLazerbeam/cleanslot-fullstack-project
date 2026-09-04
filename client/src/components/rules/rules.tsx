function Rules() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="pt-10 text-black text-3xl font-bold p-4">
        Tvättstugans regler
      </h1>
      <p className="m-8 max-w-2xl text-sm font-semibold">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="rules" />

        <label htmlFor="rules" className="text-sm font-medium text-gray-700">
          Visa inte igen
        </label>
      </div>
      <button className="mt-8 text-white text-lg font-semibold bg-[#1F5C73] border rounded-lg focus:border-dark p-3 px-7">
        Boka tvättid
      </button>
    </div>
  );
}

export default Rules;
