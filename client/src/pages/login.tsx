import LoginForm from "../components/login/LoginForm";
import Logo from "../components/login/logo";

function Login() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fb] dark:bg-[#111C22] dark:text-[#C7CED1]">
      <main className="flex-1 flex flex-col items-center">
        <Logo />
        <LoginForm />
      </main>

      
    </div>
  );
}

export default Login;
