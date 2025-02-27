"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UsersPage() {
  const [accounts, setAccounts] = useState([] || {});
  const session = useAuth();
  console.log(session);
  const fetchAccounts = async () => {
    console.log(session.accessToken);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/accounts`, {
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
    fetchAccounts();
  }, [session]);

  const handleStatusChanged = async (userId,type)=>{
       let statusData = {
        status:type,
       }

       try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/accounts/status/${userId}`, {
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
        fetchAccounts();
      } catch (error) {
        throw new Error(error)
      }
  }



  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 mt-6 p-3 sm:p-5">
        <h1 className="text-center font-semibold mb-4 text-base md:text-xl lg:text-2xl">
          All accounts
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <form onSubmit={handleSearch} className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex gap-3">
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                  required=""
                />
                <Button type="submit">search</Button>
                </div>
             
              </div>
            </form>
          </div>
        </div>

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
                         <Link href={`/dashboard/users/${account._id}`}>{account.name}</Link> 
                        </th>
                        <td className="px-4 py-3">{account.mobile_number}</td>
                        <td className="px-4 py-3">{account.nid_number}</td>
                        <td className="px-4 py-3"><Badge>{account.role}</Badge></td>
                        <td className="px-4 py-3"><Badge>{account.isVerified?"approved":"pending"}</Badge></td>
                        <td className="px-4 py-3">{account.balance}&#2547;</td>
                        <td className="px-4 py-3">
                            {
                              account.isVerified ? (
                                <Button disabled={account.role==="admin"} onClick={()=>handleStatusChanged(account._id,"block")} className="bg-red-500">block</Button>
                              ):(
                                <Button disabled={account.role==="admin"} onClick={()=>handleStatusChanged(account._id,"unblock")} className="bg-green-500">approve</Button>
                              )
                            }
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>there are no transation found</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
