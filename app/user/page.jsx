import { auth } from "@/auth.config";
import { fetchedData } from "@/lib/fetchedData";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import UserHeader from "./_components/UserHeader";
import TransactionTable from "@/components/_components/Table/TransactionTable";

export default async function UserPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const data = await fetchedData(session.user.id, session.accessToken);
  console.log(data);
  if (!data.isVerified) {
    return <h1 className="bg-pink-100 text-center py-2 rounded-md">the admin has blocked you.</h1>;
  }
  console.log(data.transactions);
  return (
    <>
      <SessionProvider>
        <UserHeader data={data} />
        <TransactionTable transactions={data.transactions} />
      </SessionProvider>
    </>
  );
}
