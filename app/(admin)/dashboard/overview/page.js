'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const Overview = () => {
  const [overview, setOverview] = useState({});
  const session = useAuth();

    const fetchOverview = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/overview`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch overview data");
        }

        const data = await response.json();
        console.log(data)
        setOverview(data);
      } catch (error) {
        console.error("Error fetching overview:", error);
      }
    };

    useEffect(()=>{
        if(session.accessToken){
            fetchOverview();
        }
    },[session])

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Money in System */}
          <Card className="shadow-xl p-4 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">Total Money in System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">{overview.balance}</p>
            </CardContent>
          </Card>
    
          {/* Total Users */}
          <Card className="shadow-xl p-4 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{overview.totalUsers}</p>
            </CardContent>
          </Card>
    
          {/* Admin Income */}
          <Card className="shadow-xl p-4 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">Admin Income</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-600">${overview.adminIncome}</p>
            </CardContent>
          </Card>
        </div>
      );
    
  }



 


export default Overview;
