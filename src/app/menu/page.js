"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [categories, setCategories] = useState();
  const [menuItems, setMenuItems] = useState();

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);
  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((c) => (
          <div key={c._id}>
            <div className="py-6">
              <SectionHeaders mainHeader={c.name} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {menuItems
                ?.filter((item) => item.category === c._id)
                .map((item) => (
                  <div key={item._id}>
                    <MenuItem {...item} />
                  </div>
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
