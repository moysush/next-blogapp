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
      <form action={actionForm} className="form">
        <h2 className="text-2xl mb-2">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="name"
          defaultValue={state.values.name}
          className="inp"
        />
        <br />
        <input
          type="text"
          name="username"
          placeholder="username"
          minLength={4}
          defaultValue={state.values.username}
          className="inp"
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          minLength={4}
          defaultValue={state.values.password}
          className="inp"
        />
        <br />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          minLength={4}
          defaultValue={state.values.passwordConfirm}
          className="inp"
        />
        <br />
        {state && <p className="text-red-600">{state.error}</p>}
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </>
  );
}
