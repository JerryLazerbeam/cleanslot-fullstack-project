function Login() {
  return (
      <div>
        <img src="/images/logo.png"
         alt="CleanSlot" 
        className="mx-auto my-8 w-48 h-48"
        />
    
        
    
      <form className="flex items-center justify-center flex-col gap-4 mt-8">
        <div className="items-center justify-center flex-col" >
          <label htmlFor="email">E-post</label>
          <input 
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            type="email"
            id="email"
            name="email"
            
          />
        </div>

        <div>
          <label htmlFor="password">Lösenord</label>
          <input
           className="border border-gray-300 rounded-md px-4 py-2 w-full"
            type="password"
            id="password"
            name="password"
            
          />
        </div>

        <button className=" text-white text-lg font-semibold bg-black border rounded-lg focus:border-dark p-3 px-7">Logga in</button>  
      </form>
  </div>
  );
}

export default Login
