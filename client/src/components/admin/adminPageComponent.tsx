function adminPageComponent() {
  return (
    <div>
      <main className="flex flex-col">
        <div className=" border-b border-gray-300">
          <h1 className="text-2xl m-8">Dashboard ✨</h1>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-around  my-20 ">
            <div className="flex flex-col border rounded-lg border-gray-300 sha px-5">
            <h1 className="py-5 ">12</h1>
            <p className="py-5">Bokningar</p>
          </div>

          <div className="flex flex-col border rounded-lg border-gray-300  px-12">
            <h1 className="py-5 ">8</h1>
            <p className="py-5">Ledigt</p>
          </div>
           <div className="flex flex-col border rounded-lg border-gray-300  px-12">
            <h1 className="py-5 ">8</h1>
            <p className="py-5">Ledigt</p>
          </div>
           <div className="flex flex-col border rounded-lg border-gray-300  px-12">
            <h1 className="py-5 ">8</h1>
            <p className="py-5">Ledigt</p>
          </div>
        </div>
        <div className="border">3</div>

        <div className="border">4</div>

        <div className="border">5</div>
      </main>
    </div>
  );
}

export default adminPageComponent;
