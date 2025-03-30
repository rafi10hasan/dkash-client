import { auth } from "@/auth.config";
import { fetchedData } from "@/lib/fetchedData";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import AgentHeader from "./_components/AgentHeader";
import TransactionTable from "@/components/_components/Table/TransactionTable";

export default async function AgentPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const data = await fetchedData(session.user.id, session.accessToken);

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
        <TransactionTable transactions={data.transactions} />
      </SessionProvider>
    </>
  );
}
