"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between bg-amber-700 p-2 rounded mb-4">
      <div className="flex gap-4 items-center">
        <Link href="/" className="hover:text-cyan-300">
          home
        </Link>
        <Link href="/blogs" className="hover:text-cyan-300">
          blogs
        </Link>
        <Link href="/users" className="hover:text-cyan-300">
          users
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        {session ? (
          <>
            <Link href="/blogs/new" className="hover:text-cyan-300">
              Create Blog
            </Link>
            <Link href="/me" className="hover:text-cyan-300">
              me
            </Link>
            <em className="font-bold">{session.user?.name} logged in</em>{" "}
            <button className="btn" onClick={() => signOut()} data-testid="logout-button">
              logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-cyan-300">
              login
            </Link>
            <Link href="/register" className="hover:text-cyan-300">
              register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
