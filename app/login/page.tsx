"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const result = await signIn("credentials", {
      email: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result.error) {
      setError("invalid username or password");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      {error && <p className="text-red-600">{error}</p>}
      <form action={handleSubmit} className="form">
        <h2 className="text-2xl mb-2">Login</h2>
        <input
          type="username"
          name="username"
          placeholder="username"
          className="inp"
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="inp"
        />
        <br />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </>
  );
}
