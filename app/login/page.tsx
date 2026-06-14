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
      <h2>Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form action={handleSubmit}>
        <input type="username" name="username" placeholder="username" />
        <br />
        <input type="password" name="password" placeholder="password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
