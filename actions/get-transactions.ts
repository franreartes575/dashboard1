import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

export const getTransactions = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      // Incluimos el usuario relacionado con la orden
      user: true, 
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedTransactions = paidOrders.map((order) => ({
    id: order.id,
    // Añadimos el email del usuario.
    email: order.user?.email || 'N/A', 
    phone: order.phone,
    address: order.address,
    isPaid: order.isPaid,
    products: order.orderItems
      .map((item) => item.product.name)
      .join(", "),
    totalPrice: formatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    createdAt: order.createdAt.toLocaleDateString(),
  }));

  return formattedTransactions;
};