"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import ShopingCart from "@/components/icons/ShopingCart";
import BarsTwo from "@/components/icons/BarsTwo";

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  //
  return (
    <header className="mb-3">
      <div className="flex justify-between sm:hidden items-center">
        <Link
          className="text-primary font-semibold text-2xl uppercase"
          href="/"
        >
          Saint SUSHI
        </Link>
        <div className="flex gap-6 items-center">
          <Link href={"/cart"} className="relative">
            <ShopingCart />
            {cartProducts.length > 0 && (
              <span className="absolute -top-2.5 -right-3 bg-primary text-white text-xs p-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button className="p-1 rounded-md">
            <BarsTwo />
          </button>
        </div>
      </div>
      <div className="sm:hidden flex gap-8 text-secondary font-semibold items-center p-4 bg-gray-300 rounded-lg justify-center">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Kontakt</Link>
      </div>
      <div className="hidden sm:flex items-center justify-between">
        <nav className="flex gap-2 sm:gap-4 md:gap-8 text-secondary font-semibold items-center">
          <Link
            className="text-primary font-semibold text-2xl uppercase"
            href="/"
          >
            Saint SUSHI
          </Link>
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Kontakt</Link>
        </nav>
        <nav className="flex gap-2 items-center font-semibold">
          {status === "authenticated" && (
            <>
              <Link className="whitespace-nowrap" href={"/profile"}>
                Hey, {userName}
              </Link>
              <button
                onClick={() => {
                  signOut();
                }}
                className="text-secondary  px-6 py-2 rounded-full"
              >
                Logout
              </button>
            </>
          )}
          {status === "unauthenticated" && (
            <>
              <Link
                href="/register"
                className="text-secondary  px-6 py-2 rounded-full"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="bg-primary text-light px-6 py-2 rounded-full"
              >
                Login
              </Link>
            </>
          )}
          <Link href={"/cart"} className="relative">
            <ShopingCart />
            {cartProducts.length > 0 && (
              <span className="absolute -top-2.5 -right-3 bg-primary text-white text-xs p-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
