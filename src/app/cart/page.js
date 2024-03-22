"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Xmark from "@/components/icons/Xmark";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.postCode) {
      const {
        phone = "",
        street = "",
        postCode = "",
        address = "",
      } = profileData;
      const addressFormProfile = { phone, street, postCode, address };
      setAddress(addressFormProfile);
    }
  }, [profileData]);

  async function proceedToCheckout(ev) {
    ev.preventDefault();
    // address and shoping cart products
    const promise = new Promise(async (resolve, reject) => {
      await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment",
      error: "Something went wron. Please try again",
    });
    // redirect to stripe
  }

  function handleAddresChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  function cartTotalPrice(cartProduct) {
    let price = Number(cartProduct.product.basePrice);
    if (cartProduct.size) {
      price += Number(cartProduct.size.price);
    }
    if (cartProduct.extras?.length > 0) {
      for (const extra of cartProduct.extras) {
        price += Number(extra.price);
      }
    }
    return price;
  }

  let subTotal = 0;
  for (const p of cartProducts) {
    subTotal += cartTotalPrice(p);
  }
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                className="flex gap-4 mb-2 border-b py-2 items-center "
                key={index}
              >
                <div className="w-24">
                  <Image
                    className="rounded-md"
                    width={240}
                    height={240}
                    src={product.product.image}
                    alt="..."
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.product.name}</h3>
                  {product.size && (
                    <div className="text-sm text-gray-500">
                      <div>
                        Size: {product.size.name} {product.size.price}zł
                      </div>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {product.extras.map((extra, index) => (
                        <div key={index}>
                          {extra.name}+{extra.price}zł
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  {cartProductPrice(product.product)}zł
                </div>
                <div
                  type="button"
                  onClick={() => removeCartProduct(index)}
                  className="border px-3 py-2 font-semibold border-gray-400 rounded-full"
                >
                  <Xmark />
                </div>
              </div>
            ))}
          <div className="py-2 flex justify-end items-center pr-14">
            <div className="text-gray-500">
              Subtotal: <br />
              Delivery: <br />
              Total:
            </div>
            <div className=" font-semibold">
              {subTotal}zł
              <br />
              5zł
              <br />
              {subTotal + 5}zł
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gray-200 p-4 rounded-lg">
            <h2>Checkout</h2>
            <form onSubmit={proceedToCheckout}>
              <AddressInputs
                addressProps={address}
                setAddressProp={handleAddresChange}
              />
              <button type="submit">Pay ${subTotal}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
