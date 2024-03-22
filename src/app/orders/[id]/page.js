"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from "@/components/menu/CartProduct";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("?clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
        });
      });
    }
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const products of order?.cartProducts) {
      subtotal += cartProductPrice(products.product);
    }
  }

  return (
    <section className="max-w-2xl">
      <div className="text-center">
        <SectionHeaders mainHeader="Your order" />
        <div>
          <p>Thanks for your order</p>
          <p>We will call yoou when your order will be on the way</p>
        </div>
      </div>
      {order && (
        <div className="grid sm:grid-cols-2 sm:gap-16">
          <div>
            {order.cartProducts.map((product) => (
              <CartProduct product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              <div>
                Subtotal:{" "}
                <span className="text-black font-bold inline-block w-8">
                  ${subtotal}
                </span>
              </div>
              <div>
                Delivery:{" "}
                <span className="text-black font-bold inline-block w-8">
                  $5
                </span>
              </div>
              <div>
                Total:{" "}
                <span className="text-black font-bold inline-block w-8">
                  ${subtotal + 5}
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs disabled={true} addressProps={{ ...order }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
