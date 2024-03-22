"use client";
import { CartContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect } from "react";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("?clear-cart=1")) {
        clearCart();
      }
    }
  }, []);
  return (
    <section className="max-w-2xl text-center">
      <SectionHeaders mainHeader="Your order" />
      <div>
        <p>Thanks for your order</p>
        <p>We will call yoou when your order will be on the way</p>
      </div>
    </section>
  );
}
