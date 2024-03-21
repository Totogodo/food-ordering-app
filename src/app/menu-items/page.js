"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import Right from "@/components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemsPage() {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="">
      <div className="mt-8 max-w-xl mx-auto">
        <UserTabs isAdmin={data.admin} />
        <div className="mt-8">
          <Link className="button" href={"/menu-items/new"}>
            <span>Create new item</span>
            <Right />
          </Link>
        </div>
      </div>
      <div className="mt-8 max-w-4xl mx-auto">
        <h2 className="text-center text-3xl pb-2 text-gray-700">
          Edit Menu Items
        </h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
          {menuItems.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={"/menu-items/edit/" + item._id}
                className="text-center mb-1 rounded-lg border-2 shadow-md p-2 flex-col w-full gap-2"
                key={item._id}
              >
                <div className="relative w-24 h-24">
                  <Image src={item.image} alt="..." width={100} height={100} />
                </div>
                <div className="block">{item.name}</div>
                {item.description}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
