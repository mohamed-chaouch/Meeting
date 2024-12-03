"use client";

import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "../../../utils/axios";
import Swal from "sweetalert2";
import { ArrowBigRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/schema/SignUpSchema";
import { signUpFormData } from "@/types/type";
import { signUp } from "./signup";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<signUpFormData>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState<any | "">("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const login = useGoogleLogin({
    onSuccess: (response: any) => {
      router.push("/home");
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const createUser = async (data: signUpFormData) => {
    const fd = new FormData();
    fd.append("username", data.username);
    fd.append("email", data.email);
    fd.append("password", data.password);
    if (imageUrl) {
      fd.append("imageUrl", imageUrl);
    }

    const result = await signUp(fd);
    if (result.success) {
      setTimeout(() => {
        router.push("/home");
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-dark-3">
      <div className="bg-dark-1 w-full max-w-lg px-8 py-5 rounded-2xl shadow-md text-center">
        <div className="flex items-center justify-center mb-2">
          <Image
            src="/icons/logo.svg"
            alt="video conference logo"
            width={48}
            height={55}
          />
          <p className="pl-1 text-white text-lg">Meeting</p>
        </div>
        <div>
          <p className="text-white text-xl font-bold ">Create your account</p>
          <p className="text-gray-400 mb-1">
            Welcome! Please fill in the details to get started.
          </p>
        </div>
        <div className="mb-1">
          <button onClick={() => login()} className="text-white text-4xl">
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
        <form onSubmit={handleSubmit(createUser)}>
          <div className="mb-1">
            <p className="text-white text-left">Image</p>
            <input
              type="file"
              className="w-full p-2 text-black rounded bg-white"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.files && setImageUrl(e.target.files[0]);
              }}
            />
            {(isSubmitted && imageUrl === "") && (
              <p className="text-red-500 text-sm text-left">
                Image is required
              </p>
            )}
          </div>
          <div className="mb-1">
            <p className="text-white text-left">Username</p>
            <input
              {...register("username")}
              type="text"
              className="w-full p-2 text-black border border-black rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-sm text-left">
                {errors.username.message}
              </p>
            )}
          </div>
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
          <div className="mb-[6px] w-full text-center">
            <button
              className="w-full flex items-center justify-center bg-purple-700 hover:bg-purple-800 text-white p-2 rounded"
              type="submit"
            >
              <p className="text-white text-sm">Continue</p>
              <ArrowBigRight className="ml-2 p-[2px] mt-1 text-white" />
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mb-1">
          <p className="text-gray-400 text-sm pr-3">Already have an account?</p>
          <Link
            href="/sign-in"
            className="text-orange-300  hover:text-orange-500"
          >
            Sign in
          </Link>
        </div>
        <p className="text-center text-white">Secured</p>
      </div>
    </div>
  );
};

export default SignUp;
