import SignInForm from "./_components/SignInForm";

export default function LoginPage(){
    return (
        <section className="h-screen grid place-items-center">
        <div className="max-w-[400px] w-full mx-auto p-4 border border-gray-700/20 rounded-md bg-white shadow-md">
          <h4 className="font-bold text-xl text-center text-deep-cyan mt-2 mb-2">Sign In</h4>
          <SignInForm />
        </div>
      </section>
    );
}