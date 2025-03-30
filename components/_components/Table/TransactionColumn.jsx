'use client'
import { createColumnHelper } from "@tanstack/react-table";
import { MailIcon, User, } from "lucide-react";
import { TbTransactionDollar } from "react-icons/tb";
import { FcMoneyTransfer } from "react-icons/fc";
import { FaCalendarAlt } from "react-icons/fa";

const columnsHelper = createColumnHelper();

const TransactionColumns = () => [
   
    columnsHelper.accessor('sender',{
        cell: (info)=> info.getValue(),
        header: ()=>(
            <span className="flex items-center">
                 <User className="mr-2" size={16}/>Sender Number
            </span>
        )
    }),

    columnsHelper.accessor('receiver',{
        cell: (info)=> info.getValue(),
        header: ()=>(
            <span className="flex items-center">
                 <User className="mr-2" size={16}/>Receiver Number
            </span>
        )
    }),

    columnsHelper.accessor('transactionType',{
        cell: (info)=> info.getValue(),
        header: ()=>(
            <span className="flex items-center">
                 <TbTransactionDollar className="mr-2" size={16}/>Transaction Type
            </span>
        )
    }),
    columnsHelper.accessor('transactionId',{
        cell: (info)=> info.getValue(),
        header: ()=>(
            <span className="flex items-center">
                 <TbTransactionDollar className="mr-2" size={16}/>Transaction Id
            </span>
        )
    }),

    columnsHelper.accessor('amount',{
        cell: (info)=> info.getValue(),
        header: ()=>(
            <span className="flex items-center">
                 <FcMoneyTransfer className="mr-2" size={16}/>amount
            </span>
        )
    }),
    columnsHelper.accessor('createdAt',{
        cell: (info)=> info.getValue().split("T")[0],
        header: ()=>(
            <span className="flex items-center">
                 <FaCalendarAlt className="mr-2" size={16}/>date
            </span>
        )
    }),
   
] 


export { TransactionColumns}