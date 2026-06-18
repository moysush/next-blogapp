"use client";
import { useActionState } from "react";
import { registerUser } from "../actions/users";

export default function RegisterPage() {
  const [state, actionForm] = useActionState(registerUser, {
    error: "",
    errorTitle: "",
    values: { name: "", username: "", password: "", passwordConfirm: "" },
  });
  return (
    <>
      <form action={actionForm} className="form">
        <h2 className="text-2xl mb-2">Register</h2>
        <label>
          Name
          <input
            type="text"
            name="name"
            placeholder="name"
            defaultValue={state.values.name}
            className="inp"
          />
        </label>
        <br />
        <label>
          Username
          <input
            type="text"
            name="username"
            placeholder="username"
            // minLength={4}
            defaultValue={state.values.username}
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
            // minLength={4}
            defaultValue={state.values.password}
            className="inp"
          />
        </label>
        <br />
        <label>
          Confirm Password
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            // minLength={4}
            defaultValue={state.values.passwordConfirm}
            className="inp"
          />
        </label>
        <br />
        {state.error && (
          <p className="text-red-600" data-testid={state.errorTitle}>
            {state.error}
          </p>
        )}
        <button type="submit" className="btn" data-testid="register-button">
          Register
        </button>
      </form>
    </>
  );
}
