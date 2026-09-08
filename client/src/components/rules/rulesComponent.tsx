function Rules() {
  return (
    <div className="min-h-screen flex flex-col items-center dark:bg-[#111C22] dark:text-[#C7CED1] lg:ml-64">
      <h1 className="pt-10 text-black text-3xl font-bold p-4 dark:text-[#C7CED1]">
        Tvättstugans regler
      </h1>
      <p className="m-8 max-w-2xl text-lg font-semibold border rounded-lg p-4 dark:bg-[#16242C] dark:text-[#C7CED1] dark:border-[#1F5C73]">
        <p>• Respektera din bokade tvättid.</p>
        <p>• Lämna tvättstugan ren och städad.</p>
        <p>• Ta bort tvätt och tillhörigheter när din tid är slut.</p>
        <p>• Felanmäl maskiner som inte fungerar.</p>
      </p>
    </div>
  );
}

export default Rules;
