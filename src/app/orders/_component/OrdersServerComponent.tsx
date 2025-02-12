import { orders } from "@/models/order";
import { getServerSession } from "next-auth";

export default async function OrdersServerComponent() {
  const session = await getServerSession();

  return (
    <section className="m-4">
      <p className="text-lg">
        {session
          ? "Here are the orders returned from the protected server component"
          : "no user session found"}
      </p>
      {session
        ? orders.map((order) => (
            <div key={order.id} className="border p-4 my-4">
              <h2 className="text-xl">{order.title}</h2>
              <p className="text-gray-500">{order.description}</p>
            </div>
          ))
        : null}
    </section>
  );
}
