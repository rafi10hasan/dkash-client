import SignUpForm from "./_components/SignUpForm";

export default function RegisterPage(){
    return (
        <section className="h-screen grid place-items-center">
        <div className="max-w-[400px] w-full mx-auto space-y-2 border border-gray-700/20 rounded-md bg-white shadow-md">
          <h4 className="font-bold text-xl text-deep-cyan text-center mt-2 mb-4">Sign up</h4>
          <SignUpForm />
        </div>
      </section>
     
    );
}