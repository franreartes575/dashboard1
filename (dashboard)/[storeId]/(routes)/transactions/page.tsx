// app/(dashboard)/[storeId]/(routes)/transactions/page.tsx

import { getTransactions } from "@/actions/get-transactions";
import { TransactionClient } from "./components/client";
import { TransactionColumn } from "./components/columns";

const TransactionsPage = async ({ params }: { params: { storeId: string } }) => {
  const transactions = await getTransactions(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TransactionClient data={transactions} />
      </div>
    </div>
  );
};

export default TransactionsPage;