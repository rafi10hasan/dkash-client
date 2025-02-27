"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function WithdrawRequest() {
  const [accounts, setAccounts] = useState([]);
  const session = useAuth();
  
  const fetchWithdrawRequestAccounts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/withdraw-requests`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (response.ok) {
      const data = await response.json();
      setAccounts(data);
    }
  };
  useEffect(() => {
    if (session?.accessToken) {
      fetchWithdrawRequestAccounts();
    }
  }, [session]); 
  

  
  const handleStatusChanged = async (userId,statusMsg,amount)=>{
       let statusData = {
        status:statusMsg,
        amount:amount
       }

       try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/withdraw-request-success/${userId}`, {
          method: "PUT",
          headers: {
             Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(statusData),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update user status");
        }
  
        const data = await response.json();
        toast(data.message)
        fetchWithdrawRequestAccounts()
      } catch (error) {
        throw new Error(error)
      }
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 mt-6 p-3 sm:p-5">
        <h1 className="text-center font-semibold mb-4 text-base md:text-xl lg:text-2xl">
          All cash In Request accounts
        </h1>

        <div className="mx-auto max-w-screen-xl px-4">
          {/* <!-- Start coding here --> */}
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            {accounts.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-white uppercase bg-teal-600">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Mobile Number
                      </th>
                      <th scope="col" className="px-4 py-3">
                        NID
                      </th>
                      <th scope="col" className="px-4 py-3">
                        role
                      </th>
                      <th scope="col" className="px-4 py-3">
                        status
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Balance
                      </th>
                      <th scope="col" className="px-4 py-3">
                        withdraw amount
                      </th>
                      <th scope="col" className="px-4 py-3">
                        action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts?.map((account) => (
                      <tr key={account._id} className="border-b dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                         {account.agentId.name}
                        </th>
                        <td className="px-4 py-3">{account.agentId.mobile_number}</td>
                        <td className="px-4 py-3">{account.agentId.nid_number}</td>
                        <td className="px-4 py-3"><Badge>{account.agentId.role}</Badge></td>
                        <td className="px-4 py-3"><Badge>{account.status}</Badge></td>
                        <td className="px-4 py-3">{account.agentId.balance}&#2547;</td>
                        <td className="px-4 py-3">{account.amount}&#2547;</td>
                        <td className="px-4 py-3">
                            
                                <Button disabled={account.status==="approved"} onClick={()=>handleStatusChanged(account._id,"approved",account.amount)} className={`${account.status==="approved" ? "bg-gray-600 cursor-not-allowed" :"bg-green-600 cursor-pointer"}`}>
                                    {account.status === "pending" ? "approve" :"approved"}
                                </Button>
                             
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>there are no accounts found</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
