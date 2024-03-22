"use client";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import MenuItemForm from "@/components/layout/MenuItemForm";
import Link from "next/link";
import Left from "@/components/icons/Left";
import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";

export default function EditMenuItemPage() {
  const { loading, data } = useProfile();
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);

  const [redirectToItems, serRedirectToItems] = useState(false);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
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

  async function handleDelete() {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      response.ok ? resolve() : reject();
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
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
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      <div className="max-w-lg mx-auto mt-2">
        <DeleteButton label={"Delete item"} onDelete={handleDelete} />
      </div>
    </section>
  );
}
