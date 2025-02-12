"use client";

import { Order } from "@/models/order";
import { useCallback, useEffect, useState } from "react";

export default function OrdersRouteHandler() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string>();

  const getOrders = useCallback(async () => {
    const response = await fetch("/api/orders");

    if (!response.ok) {
      throw new Error("Failed to fetch orders: " + response.status);
    }

    const orders = (await response.json()) as Order[];
    return orders;
  }, []);

  useEffect(() => {
    getOrders()
      .then((orders) => {
        setError(undefined);
        setOrders(orders);
      })
      .catch((error) => {
        setError(error.message);
        setOrders([]);
      });
  }, [getOrders]);

  return (
    <section className="m-4">
      <p className="text-lg">
        {error ??
          `Here are the orders returned from the protected API route handler /api/orders:`}
      </p>
      {orders.map((order) => (
        <div key={order.id} className="border p-4 my-4">
          <h2 className="text-xl">{order.title}</h2>
          <p className="text-gray-500">{order.description}</p>
        </div>
      ))}
    </section>
  );
}
