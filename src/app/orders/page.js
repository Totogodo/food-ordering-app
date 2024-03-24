"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile";
import { dbTimeForHuman } from "@/libs/datetime";
import Link from "next/link";
import toast from "react-hot-toast";

export default function OrdersPage() {
  const { loading, data: profile } = useProfile();
  const [orders, setOrders] = useState();
  console.log("🚀 ~ OrdersPage ~ orders:", orders);

  useEffect(() => {
    const promise = new Promise(async (resolve, reject) => {
      fetch("/api/orders").then((res) => {
        res.json().then((orders) => {
          console.log("🚀 ~ res.json ~ orders:", orders);
          setOrders(orders.reverse());
          res.ok ? resolve() : reject();
        });
      });
    });
    toast.promise(promise, {
      loading: "Loading orders...",
      success: "Orders loaded",
      error: "Error",
    });
  }, []);

  async function fetchOrders() {}

  if (loading) {
    return "Loading...";
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile?.admin} />
      <div className="mt-8">
        {orders?.length > 0 &&
          orders.map((order) => (
            <Link href={"/orders/" + order._id} key={order._id}>
              <div className="bg-gray-100 mb-2 p-4 rounded-lg md:grid grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 items-center">
                <div className="text-gray-500">{order.userEmail}</div>
                <div className="text-xs ">
                  {order.cartProducts.map((p) => p.product.name).join(", ")}
                </div>
                <div className="flex gap-2 items-center sm:justify-end">
                  <span
                    className={
                      (!order.paid
                        ? "bg-red-400 text-light "
                        : "bg-green-400 px-4 text-gray-700") +
                      " p-1 rounded-lg font-semibold text-sm whitespace-nowrap"
                    }
                  >
                    {order.paid ? "Paid" : "Not paid"}
                  </span>
                  <div className="text-right text-gray-700 text-sm">
                    {dbTimeForHuman(order.createdAt)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
