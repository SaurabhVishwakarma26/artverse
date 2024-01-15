"use client";

import "@styles/Login.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        callbackUrl: "/",
      });
      if (response.ok) {
        router.push("/");
      }

      if (response.error) {
        setError("Invalid email or password! Please try again");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="login">
      <img src="/assets/login.jpg" alt="login image" className="login_decor" />
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.email)}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.password)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <button className="google" onClick={loginWithGoogle}>
          <p>Login with Google</p>
          <FcGoogle />
        </button>
        <a href="/register">Don't have an account ? Sign in Here</a>
      </div>
    </div>
  );
}

export default Login;
