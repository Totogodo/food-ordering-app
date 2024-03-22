"use client";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import Left from "@/components/icons/Left";
import toast from "react-hot-toast";
import MenuItemForm from "@/components/layout/MenuItemForm";
import { redirect } from "next/navigation";

export default function NewMenuItemPage() {
  const { loading, data } = useProfile();
  const [redirectToItems, serRedirectToItems] = useState(false);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      response.ok ? resolve() : reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving menu item...",
      success: "Menu item saved!",
      error: "Can`t save item.",
    });
    serRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={data.admin} />
      <div className="py-6">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}
