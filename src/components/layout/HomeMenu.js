"use client";
import { useEffect, useState } from "react";
import Menuitem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);

  return (
    <section className="">
      <SectionHeaders subHeader={"Check Out"} mainHeader={"Our Best Seller"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4 sm:max-w-6xl max-w-xs mx-auto">
        {bestSellers?.length > 0 &&
          bestSellers.map((item, index) => (
            <div key={index}>
              <Menuitem {...item} />
            </div>
          ))}
      </div>
    </section>
  );
}

export default HomeMenu;
