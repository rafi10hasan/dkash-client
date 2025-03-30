import SignUpForm from "./_components/SignUpForm";

export default function RegisterPage(){
    return (
        <section className="h-screen grid place-items-center mt-4 mb-4">
        <div className="w-[90vw] md:w-[600px] mx-auto space-y-2 border border-gray-700/20 rounded-md bg-pink-600 shadow-md">
          <h4 className="font-bold text-xl text-white text-center mt-2 mb-4">Sign up</h4>
          <SignUpForm />
        </div>
      </section>
     
    );
}