"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotification } from "../ components/NotificationContext";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { showNotification } = useNotification();

  const handleSubmit = async (formData: FormData) => {
    const result = await signIn("credentials", {
      email: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result.error) {
      setError("invalid username or password");
    } else {
      showNotification("Successfully logged in", "success");
      router.push("/");
    }
  };

  return (
    <>
      {error && (
        <p className="text-red-600" data-testid="error-message">
          {error}
        </p>
      )}
      <form action={handleSubmit} className="form">
        <h2 className="text-2xl mb-2">Login</h2>
        <label>
          Username
          <input
            type="text"
            name="username"
            placeholder="username"
            className="inp"
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="password"
            className="inp"
          />
        </label>
        <br />
        <button type="submit" className="btn" data-testid="login-button">
          Login
        </button>
      </form>
    </>
  );
}
