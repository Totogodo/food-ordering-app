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
    <section className="mt-8 max-w-lg mx-auto">
      <div className="">
        <UserTabs isAdmin={data.admin} />
        <div className="mt-8">
          <Link className="button" href={"/menu-items/new"}>
            <span>Create new item</span>
            <Right />
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-center text-2xl">Edit Menu Items</h2>
        <div className="">
          {menuItems.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={"/menu-items/edit/" + item._id}
                className="mb-1 rounded-lg border p-2 flex w-full gap-2"
                key={item._id}
              >
                <div className="relative w-24 h-24">
                  <Image src={item.image} alt="..." layout="fill" />
                </div>
                {item.name}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
