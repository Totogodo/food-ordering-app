"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;
  //
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [postCode, setPostCode] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [profileFetched, setProfileFetched] = useState(false);

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      setUserEmail(session.data.user.email);

      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setStreet(data.street);
          setPostCode(data.postCode);
          setAddress(data.address);
          setIsAdmin(data.admin);
          setAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileUpdate(ev) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          image,
          phone,
          postCode,
          street,
          address,
          admin,
        }),
      });

      response.ok ? resolve() : reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Data saved!",
      error: "Error",
    });
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;

    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        response.ok ? resolve() : reject();
        const link = await response.json();
        setImage(link);
      });

      await toast.promise(uploadingPromise, {
        loading: "Uploading...",
        success: "Image uploaded!",
        error: "Error",
      });
    }
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  //
  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-sm mx-auto">
        <div className="flex gap-2">
          <div>
            <div>
              {image && (
                <Image
                  className="rounded-full mx-auto max-w-96 max-h-96 aspect-square object-cover"
                  src={image}
                  width={100}
                  height={100}
                  alt={"avatar"}
                />
              )}

              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="border-gray-300 text-center text-gray-700 border rounded-lg py-1 px-2 mt-2 block text-xs cursor-pointer">
                  Edit
                </span>
              </label>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileUpdate}>
            <input
              className="font-medium text-gray-600"
              type="text"
              placeholder="Imię i Nazwisko"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <input
              className="font-semibold text-gray-600"
              type="email"
              disabled={true}
              value={userEmail}
            />
            {isAdmin && (
              <div>
                <label
                  className="flex gap-1 items-center px-2 mb-1"
                  htmlFor="adminCb"
                >
                  <input
                    id="adminCb"
                    type="checkbox"
                    className=""
                    value={1}
                    checked={admin}
                    onChange={(ev) => setAdmin(ev.target.checked)}
                  />
                  <span>Admin</span>
                </label>
              </div>
            )}
            <input
              type="tel"
              placeholder="Phone number"
              className="font-semibold text-gray-600"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
            {/* Address below */}
            <div className="flex gap-2 mb-2">
              <input
                style={{ margin: "0" }}
                type="text"
                placeholder="City"
                value={"Warszawa"}
                className="font-semibold text-gray-600"
                disabled={true}
              />
              <input
                style={{ margin: "0" }}
                type="text"
                placeholder="Postal code"
                className="font-semibold text-gray-600"
                value={postCode}
                onChange={(ev) => {
                  setPostCode(ev.target.value);
                }}
              />
            </div>
            <input
              type="text"
              placeholder="Street"
              className="font-semibold text-gray-600"
              value={street}
              onChange={(ev) => setStreet(ev.target.value)}
            />
            <input
              className="font-semibold text-gray-600"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
