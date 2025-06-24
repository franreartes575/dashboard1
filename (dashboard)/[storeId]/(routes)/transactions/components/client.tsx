// app/(dashboard)/[storeId]/(routes)/transactions/components/client.tsx

"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { TransactionColumn, columns } from "./columns";

interface TransactionClientProps {
  data: TransactionColumn[];
}

export const TransactionClient: React.FC<TransactionClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Transacciones (${data.length})`}
        description="Gestiona las transacciones de tu tienda"
      />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};