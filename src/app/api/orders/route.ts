// this is an API for returning dummy orders data

import { orders } from "@/models/order";
import { getServerSession } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession();

  if (!session?.user) {
    return new Response(null, { status: 401 });
  }

  return Response.json(orders);
}
