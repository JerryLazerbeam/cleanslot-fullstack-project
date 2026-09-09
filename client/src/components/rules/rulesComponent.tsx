function Rules() {
  return (
    <div className=" flex flex-col text-center dark:bg-[#111C22] dark:text-[#C7CED1] ">
      <h1 className=" mt-20 text-black text-3xl font-bold  dark:text-[#C7CED1]">
        Tvättstugans regler
      </h1>
      <p className="lg:ml-64 text-left m-8 max-w-2xl p-5 rounded-xl border border-gray-200 bg-white text-[#16242C] shadow-lg dark:border-none dark:bg-[#16242C] dark:text-[#C7CED1] dark:shadow-none">
        <p className="mb-2">• Respektera din bokade tvättid.</p>
        <p className="mb-2">• Lämna tvättstugan ren och städad.</p>
        <p className="mb-2">
          • Ta bort tvätt och tillhörigheter när din tid är slut.
        </p>
        <p className="mb-2">
          • Om du inte längre kan nyttja din bokade tid, vänligen avboka den i
          god tid så att andra kan använda den.
        </p>
        <p>• Felanmäl maskiner som inte fungerar.</p>
      </p>
    </div>
  );
}

export default Rules;
