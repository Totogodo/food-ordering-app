"use client";
import { useState } from "react";
import EditableImage from "@/components/layout/EditableImage";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [street, setStreet] = useState(user?.street || "");
  const [postCode, setPostCode] = useState(user?.postCode || "");
  const [address, setAddress] = useState(user?.address || "");

  return (
    <div className="flex gap-2">
      <div>
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            phone,
            street,
            postCode,
            address,
            image,
          })
        }
      >
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
          value={user.email}
          disabled={true}
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
  );
}
