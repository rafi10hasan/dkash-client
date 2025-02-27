import {
   
    HandCoins,
    LayoutDashboard,
    User,
  } from "lucide-react";

export const data = {
    navMain: [
      {
        title: "overview",
        url: "/dashboard/overview",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "users",
        url: "/dashboard/users",
        icon: User,
      },
      {
        title: "cash-request",
        url: "/dashboard/cash-request",
        icon: HandCoins,
        
      },
      {
        title: "withdraw-request",
        url: "/dashboard/withdraw-request",
        icon: HandCoins,
        
      },
    ]
  };