// this is an API for returning dummy orders data

import { Order } from "@/models/order";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function GET() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  // dummy data
  const data: Order[] = [
    {
      id: 1,
      title: "Order 1",
      description: "This is order 1",
    },
    {
      id: 2,
      title: "Order 2",
      description: "This is order 2",
    },
    {
      id: 3,
      title: "Order 3",
      description: "This is order 3",
    },
  ];

  return Response.json(data);
}
