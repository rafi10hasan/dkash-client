 
export default function Tabular ({transactions}) {
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 mt-6 p-3 sm:p-5">
        <h1 className="text-center font-semibold mb-4 text-base md:text-xl lg:text-2xl">All Transactions</h1>
    <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        {/* <!-- Start coding here --> */}
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

         {
            transactions.length ? (
                <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-teal-600">
                        <tr>
                            <th scope="col" className="px-4 py-3">Sender Number</th>
                            <th scope="col" className="px-4 py-3">Receiver Number</th>
                            <th scope="col" className="px-4 py-3">Transaction Type</th>
                            <th scope="col" className="px-4 py-3">Transaction Id</th>
                            <th scope="col" className="px-4 py-3">Created At</th>
                            <th scope="col" className="px-4 py-3">amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions?.map((transaction)=>(
                                <tr key={transaction._id} className="border-b dark:border-gray-700">
                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{transaction.sender}</th>
                                <td className="px-4 py-3">{transaction.receiver}</td>
                                <td className="px-4 py-3">{transaction.transactionType}</td>
                                <td className="px-4 py-3">{transaction.transactionId}</td>
                                <td className="px-4 py-3">{transaction.createdAt.split("T")[0]}</td>
                                <td className="px-4 py-3">{transaction.amount}&#2547;</td>
                            </tr>
                            ))
                        }
                      
                    </tbody>
                </table>
            </div>
            ) : (
                <p>there are no transation found</p>
            )
         }

        </div>
    </div>
    </section>
 
    </>
  );
}
