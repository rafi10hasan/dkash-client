import { auth } from "@/auth.config";
import Tabular from "@/components/_components/Table/TransactionTable";

export default async function page({ params }) {
  const { id } = await params;
  const session = await auth();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/accounts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("fetch failed");
  }
  const data = await response.json();
  console.log(data);
  const { name, email, mobile_number, nid_number, transactions, balance } = data;
  return (
    <>
      <div>
        <h1 className="font-bold text-teal-500">
          User Name: <span className="font-normal text-yellow-500">{name}</span>
        </h1>
        <h1 className="font-bold text-teal-500">
          Email: <span className="font-normal text-yellow-500">{email}</span>
        </h1>
        <h1 className="font-bold text-teal-500">
          NID number: <span className="font-normal text-yellow-500">{nid_number}</span>
        </h1>
        <h1 className="font-bold text-teal-500">
          Phone Number: <span className="font-normal text-yellow-500">{mobile_number}</span>
        </h1>
        <h1 className="font-bold text-teal-500">
          Balance: <span className="font-normal text-yellow-500">{balance}&#2547;</span>
        </h1>
      </div>
      <Tabular transactions={transactions} />
    </>
  );
}
