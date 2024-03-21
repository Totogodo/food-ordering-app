"use client";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect } from "next/dist/server/api-utils";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
  const { loading, data } = useProfile();

  const [image, setImage] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const data = { name, description, basePrice, image };
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
  }

  if (loading) {
    return "Loading...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }
  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={data.admin} />
      <div className="py-6">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-3 gap-4 items-start">
          <div className="col-span-1">
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="col-span-2 grow">
            <label>Item name</label>
            <input
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              type="text"
            />
            <label>Description</label>
            <input
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              type="text"
            />
            <label>Base price</label>
            <input
              value={basePrice}
              onChange={(ev) => setBasePrice(ev.target.value)}
              type="text"
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
}
