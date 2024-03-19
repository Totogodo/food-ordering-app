import Link from "next/link";

export default function UserTabs({ isAdmin }) {
  return (
    <div className="tabs flex gap-4 mx-auto justify-center text-xl text-primary mb-4">
      <Link className="active" href={"/profile"}>
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link href={"/categories"}>Categories</Link>
          <Link href={"/menu-items"}>Menu Items</Link>
          <Link href={"/users"}>Users</Link>
        </>
      )}
    </div>
  );
}
