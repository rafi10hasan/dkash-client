'use client'
import TableData from "./TableData";
import {TransactionColumns} from "./TransactionColumn";

 
export default function TransactionTable ({transactions}) {
    if(!transactions.length){
        return <h1>there are no transactions.</h1>
    }
    const column = TransactionColumns()
  return (
   <div>
       <h1 className="text-center text-lg md:text-xl lg:text-2xl font-semibold mt-6">All Transaction</h1>
       <TableData data={transactions} columns={column} />
   </div>

  )
  
}
