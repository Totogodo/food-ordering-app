"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [newCategoryName, setCategoryName] = useState();

  async function handleNewCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      });

      response.ok ? resolve() : reject();
    });

    toast.promise(creationPromise, {
      loading: "Creating new category...",
      success: "Category created!",
      error: "Can`t create category",
    });
  }

  if (profileLoading) {
    return "Loading data...";
  }

  if (!profileData.admin) {
    return "Not an admin";
  }
  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={profileData.admin} />
      <form className="mt-8" onSubmit={handleNewCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>New Category Name</label>
            <input type="text" />
          </div>
          <div className="pb-2">
            <button type="submit">Create</button>
          </div>
        </div>
      </form>
    </section>
  );
}
