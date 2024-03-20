"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";

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

  if (status === "loading" || !profileFetched) {
    return <div className="text-center">"Loading..."</div>;
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
              <EditableImage link={image} setLink={setImage} />
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
            <input
              type="tel"
              placeholder="Phone number"
              className="font-semibold text-gray-600"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
            {/* Address below */}
            <div className="flex gap-2">
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
