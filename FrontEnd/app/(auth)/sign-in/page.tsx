"use client";

import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import Swal from "sweetalert2";
import { ArrowBigRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormData } from "@/types/type";
import { SignInSchema } from "@/schema/SignInSchema";
import { login } from "./login";

interface userProps {
  email: string;
  password: string;
}
const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<signInFormData>({
    resolver: zodResolver(SignInSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const loginUser = async (data: signInFormData) => {
    await login(data.email, data.password);
    setTimeout(() => {
      router.push("/home");
    }, 100); // Slight delay to ensure cookie is set
  };

  return (
    <div className="min-h-screen flex justify-center items-center w-full bg-dark-3">
      <div className="bg-dark-1 w-full max-w-lg p-8 rounded-2xl shadow-md text-center">
        <div className="flex items-center justify-center mb-8">
          <Image
            src="icons/logo.svg"
            alt="video conference logo"
            width={48}
            height={55}
          />
          <p className="pl-1 text-white text-lg">Meeting</p>
        </div>
        <div>
          <p className="text-white text-xl font-bold mb-2">
            Sign in to meeting
          </p>
          <p className="text-gray-400 mb-1">
            Welcome back! Please sign in to continue
          </p>
        </div>
        <div className="mb-1">
          <button
            // onClick={() => login()}
            className="text-white text-4xl"
          >
            <Image
              src="/icons/google.svg"
              alt="Google Icon"
              width={24}
              height={24}
            />
          </button>
        </div>
        <div className="flex items-center text-gray-400 mb-1">
          <hr className="w-[47%]" />
          <p className="px-2">or</p>
          <hr className="w-[47%]" />
        </div>
        <form onSubmit={handleSubmit(loginUser)}>
          <div className="mb-1">
            <p className="text-white text-left">Email Address</p>
            <input
              {...register("email")}
              type="email"
              className="w-full p-2 text-black border border-black rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm text-left">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-3">
            <p className="text-white text-left">Password</p>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="w-full p-2 text-black border border-black rounded"
              />
              <button
                onClick={handleClickShowPassword}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white"
              >
                <Image
                  src={`/icons/${
                    showPassword ? "visible.png" : "invisible.png"
                  }`}
                  alt="Password icon"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm text-left">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-1 w-full text-center">
            <button
              className="w-full flex items-center justify-center bg-purple-700 hover:bg-purple-800 text-white p-2 rounded"
              type="submit"
            >
              <p className="text-white text-sm">Continue</p>
              <ArrowBigRight className="ml-2 p-[2px] mt-1 text-white" />
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center my-2">
          <p className="text-gray-400 text-sm pr-3">
            Don&apos;t have an account?
          </p>
          <Link
            href="/sign-up"
            className="text-orange-300  hover:text-orange-500"
          >
            Sign up
          </Link>
        </div>
        <p className="text-white">Secured</p>
      </div>
    </div>
  );
};

export default SignIn;
