"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <>
      <nav className="mb-4">
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/blogs">Blogs</Link>
        {" | "}
        <Link href="/users">Users</Link>
        {" | "}
        {session ? (
          <>
            <Link href="/blogs/new">Create Blog</Link>
            {" | "}
            <em className="font-bold">{session.user?.name} logged in</em>{" "}
            <button
              className="btn"
              onClick={() => redirect("/api/auth/signout")}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            {" | "}
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </>
  );
}
