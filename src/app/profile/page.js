"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
    }
  }, [session, status]);

  async function handleProfileUpdate(ev) {
    ev.preventDefault();
    const response = await fetch("api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName }),
    });

    if (response) {
      setShow(true);
    }
  }

  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  //
  console.log(session);
  const userImage = session.data.user.image;
  const userEmail = session.data.user.email;
  return (
    <section className="mt-8">
      <h1 className="text-center text-4xl text-primary mb-4">Profile</h1>

      <div className="max-w-sm mx-auto">
        {show && (
          <h1
            onClick={() => setShow(false)}
            className="hover:cursor-pointer text-center border border-cyan-900 rounded-lg p-1 bg-cyan-600 text-light shadow-md"
          >
            Profile Saved
          </h1>
        )}
        <div className="flex gap-2 items-center">
          <div>
            <div>
              <Image
                className="rounded-full mx-auto"
                src={userImage}
                width={80}
                height={80}
                alt={"avatar"}
              />

              <label>
                <input type="file" className="hidden" />
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
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
