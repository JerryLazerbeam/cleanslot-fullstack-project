import LoginForm from "../components/login/LoginForm";
import Logo from "../components/login/logo";
import Footer from "../components/login/footer";

function Login() {
  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-1 flex flex-col items-center justify-center">
        <Logo />
        <LoginForm />
      </main>

      <Footer />
    </div>
  );
}

export default Login;
