import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details",
};

export default function OrderPage({ params }: { params: { id: string } }) {
  return <div>Order {params.id}</div>;
}
