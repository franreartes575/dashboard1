"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TransactionColumn = {
  id: string;
  email: string;
  phone: string;
  address: string;
  isPaid: boolean;
  products: string;
  totalPrice: string;
  createdAt: string;
};

export const columns: ColumnDef<TransactionColumn>[] = [
  {
    accessorKey: "products",
    header: "Productos",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "address",
    header: "Dirección",
  },
  {
    accessorKey: "totalPrice",
    header: "Precio Total",
  },
  {
    accessorKey: "isPaid",
    header: "Pagado",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },
];