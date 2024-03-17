import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <nav className="flex gap-8 text-secondary font-semibold items-center">
        <Link
          className="text-primary font-semibold text-2xl uppercase"
          href="/"
        >
          Saint SUSHI
        </Link>
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Kontakt</Link>
      </nav>
      <nav className="flex gap-2 items-center font-semibold">
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
      </nav>
    </header>
  );
}
