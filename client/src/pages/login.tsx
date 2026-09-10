import LoginForm from "../components/login/LoginForm";
import Logo from "../components/login/logo";
import Footer from "../components/footer/footer";

function Login() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fb] dark:bg-[#111C22] dark:text-[#C7CED1]">
      <main className="flex-1 flex flex-col items-center">
        <Logo />
        <LoginForm />
      </main>

      <Footer />
    </div>
  );
}

export default Login;
