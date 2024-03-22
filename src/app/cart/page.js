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
    if (profileData?.postCode) {
      const { phone, street, postCode, address } = profileData;
      const addressFormProfile = { phone, street, postCode, address };
      setAddress(addressFormProfile);
    }
  }, [profileData]);

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

  let total = 0;
  for (const p of cartProducts) {
    total += cartTotalPrice(p);
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
          <div className="py-2 text-right pr-14">
            <span className="text-gray-500">Subtotal: </span>
            <span className="text-lg font-semibold">{total}zł</span>
          </div>
        </div>
        <div>
          <div className="bg-gray-200 p-4 rounded-lg">
            <h2>Checkout</h2>
            <form>
              <AddressInputs
                addressProps={address}
                setAddressProp={handleAddresChange}
              />
              <button type="submit">Pay ${total}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
