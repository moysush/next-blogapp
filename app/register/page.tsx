"use client";
import { useActionState } from "react";
import { registerUser } from "../actions/users";

export default function RegisterPage() {
  const [state, actionForm] = useActionState(registerUser, {
    error: "",
    values: { name: "", username: "", password: "", passwordConfirm: "" },
  });
  return (
    <>
      <h2>Register</h2>
      <form action={actionForm}>
        <input
          type="text"
          name="name"
          placeholder="name"
          defaultValue={state.values.name}
        />
        <br />
        <input
          type="text"
          name="username"
          placeholder="username"
          minLength={4}
          defaultValue={state.values.username}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          minLength={4}
          defaultValue={state.values.password}
        />
        <br />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          minLength={4}
          defaultValue={state.values.passwordConfirm}
        />
        <br />
        {state && <p className="text-red-600">{state.error}</p>}
        <button type="submit">Register</button>
      </form>
    </>
  );
}
