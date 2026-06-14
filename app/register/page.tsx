import { registerUser } from "../actions/users";

export default function RegisterPage() {
  return (
    <>
      <h2>Register</h2>
      <form action={registerUser}>
        <input type="text" name="name" placeholder="name" />
        <br />
        <input type="text" name="username" placeholder="username" />
        <br />
        <input type="password" name="password" placeholder="password" />
        <br />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
