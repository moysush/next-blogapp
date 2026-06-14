// "use client";
// import { signIn } from "next-auth/react";

// export default function LoginPage() {
//   const handleSubmit = async (formData: FormData) => {
//     await signIn("credentials", {
//       email: formData.get("username"),
//       password: formData.get("password"),
//       redirect: true,
//       redirectTo: "/",
//     });
//   };

//   return (
//     <form action={handleSubmit}>
//       <label>
//         Username
//         <input type="username" name="username" />
//       </label>
//       <label>
//         Password
//         <input type="password" name="password" />
//       </label>
//       <input type="submit" value="Login" />
//     </form>
//   );
// }
