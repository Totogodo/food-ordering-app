"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [allCategories, setAllCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setAllCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();

    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      response.ok ? resolve() : reject();
    });

    toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating category..."
        : "Creating new category...",
      success: editedCategory ? "Category updated." : "Category created!",
      error: editedCategory
        ? "Can`t update category."
        : "Can`t create category",
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
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Updating category" : "New category came"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => {
                setCategoryName(ev.target.value);
              }}
            />
          </div>
          <div className="pb-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm">Edit Category:</h2>
        {allCategories?.length > 0 &&
          allCategories.map((c, i) => (
            <button
              key={i}
              onClick={() => {
                setEditedCategory(c);
                setCategoryName(c.name);
              }}
              className="mb-2"
            >
              <span>{c.name}</span>
            </button>
          ))}
      </div>
    </section>
  );
}
