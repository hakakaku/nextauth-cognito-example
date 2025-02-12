export type Order = {
  id: number;
  title: string;
  description: string;
};

// dummy data
export const orders: Order[] = [
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
