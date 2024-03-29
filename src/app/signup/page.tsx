"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  //router to go to /login
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  //button to be disabled while incomplete fields
  const [buttonDisable, setButtonDisable] = useState(true);
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);
  //Show Please wait..
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      if (buttonDisable) return;
      setLoading(true);
      //sending "user" to "/api/signup"
      const response = await axios.post("/api/signup", user);
      console.log(response);

      toast.success("Signup success");
      //pushing user to "/login"
      router.push("/login");
    } catch (error: any) {
      toast.error("Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-xl font-bold my-2">
        {!loading ? "SignUp" : "Please wait.."}
      </h1>
      <hr />

      <label htmlFor="username">User Name</label>
      <input
        type="text"
        className="m-2 py-2 px-4 bg-zinc-600"
        placeholder="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <label htmlFor="email">E Mail</label>
      <input
        type="email"
        className="m-2 py-2 px-4 bg-zinc-600"
        placeholder="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        className="m-2 py-2 px-4 bg-zinc-600"
        placeholder="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        className="m-2 py-2 px-4 bg-black text-white rounded-md"
        onClick={onSignup}
      >
        {!buttonDisable ? "Signup" : "Incomplete fields"}
      </button>

      <Link href="/login">Visit Login Page</Link>
    </div>
  );
}
