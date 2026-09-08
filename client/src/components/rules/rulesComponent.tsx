function Rules() {
  return (
    <div className=" flex flex-col text-center dark:bg-[#111C22] dark:text-[#C7CED1] ">
      <h1 className=" mt-20 text-black text-3xl font-bold  dark:text-[#C7CED1]">
        Tvättstugans regler
      </h1>
      <p className=" flex-col m-9 font-semibold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore odio
        laboriosam officia doloribus id expedita at corrupti, mollitia provident
        suscipit rerum obcaecati vitae possimus aut ipsam odit inventore
        assumenda amet. Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Quia ut labore repellendus dicta totam vitae doloremque! Nisi
        distinctio molestias officiis debitis consectetur, sint quidem
        repudiandae minima architecto, omnis quia ea.
      </p>

      <div className="flex justify-center gap-2">
        <input className="" type="checkbox" id="rules" />

        <label
          htmlFor="rules"
          className=" text-sm font-medium text-gray-700 dark:text-[#C7CED1]"
        >
          Visa inte igen
        </label>
      </div>
      <a href="/booking">
        <button className="mt-8 text-white text-lg font-semibold bg-[#1F5C73] border focus:border-dark p-3 px-7  hover:bg-gray-700 rounded-md shadow-xl">
          Boka tvättid
        </button>
      </a>
    </div>
  );
}

export default Rules;
