import Tabular from "@/components/_components/Table/Tabular";
import AgentHeader from "./_components/AgentHeader";
import { SessionProvider } from "next-auth/react";
import { fetchedData } from "@/lib/fetchedData";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AgentPage() {
    const session = await auth();
    if(!session){
        redirect('/login')
    }
    const data = await fetchedData(session.user.id,session.accessToken);
    console.log(data)
  if (!data.isVerified) {
    return (
      <h1 className="bg-pink-100 text-center py-2 rounded-md">
        the agent verification status is pending.Admin will Check your information then verify.
      </h1>
    );
  }
  return (
    <>
     <SessionProvider>
        <AgentHeader data={data} />
        <Tabular transactions={data.transactions}/>
      </SessionProvider>
    </>
  );
}
