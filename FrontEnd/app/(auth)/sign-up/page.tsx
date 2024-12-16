"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowBigRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/schema/SignUpSchema";
import { signUpFormData } from "@/types/type";
import { signUp } from "./signup";
import { useCookies } from "react-cookie";
import api from "@/utils/axios";

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
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);
  const [showPassword, setShowPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState<any | "">("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const signUpGoogle = () => {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_FRONT_URL}sign-up`; // Google's callback
    const scope =
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
    const responseType = "code";
    const accessType = "offline";

    // Store the target redirect page in sessionStorage or localStorage
    sessionStorage.setItem("redirectAfterLogin", window.location.pathname);

    // Add a state parameter to track where to redirect after login
    const state = encodeURIComponent("/home");

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}&state=${state}`;

    window.location.href = authUrl;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (code) {
      // Perform Google OAuth API request to get access tokens
      const fetchGoogleData = async () => {
        try {
          const response = await api.get(
            `api/auth/google?code=${code}&flow=${"sign-up"}`
          );

          const { access_token, refresh_token } = response.data;

          setCookie("accessToken", access_token);
          setCookie("refreshToken", refresh_token);

          // Get the state parameter for redirection
          const targetUrl =
            state || sessionStorage.getItem("redirectAfterLogin") || "/home"; // Default to "/home" if no target URL exists

          // Clear sessionStorage
          sessionStorage.removeItem("redirectAfterLogin");

          // Redirect the user to the stored target page
          router.push(targetUrl);
        } catch (err) {
          console.error("Error during Google authentication:", err);
        }
      };

      fetchGoogleData();
    }
  }, [router]);

  const createUser = async (data: signUpFormData) => {
    const fd = new FormData();
    fd.append("username", data.username);
    fd.append("email", data.email);
    fd.append("password", data.password);
    if (imageUrl) {
      fd.append("imageUrl", imageUrl);
    }

    await signUp(fd);
    setTimeout(() => {
      router.push("/home");
    }, 100);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[url('/images/flou.jpg')] bg-cover bg-opacity-[0.2]">
      <div className="bg-dark-1 w-full max-w-lg px-8 pt-0 pb-3 rounded-2xl shadow-md text-center absolute max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between">
          <div className="relative top-0 left-2 flex justify-end border-1 border-black">
            <Image
              src="/images/meeting2.png"
              alt="Meeting"
              width={90}
              height={90}
            />
          </div>
          <div className="relative top-0 right-2 flex justify-end border-1 border-black">
            <Image
              src="/images/meeting.png"
              alt="Meeting"
              width={60}
              height={60}
            />
          </div>
        </div>
        <div className="flex items-center justify-center  mb-1 sm:mb-2">
          <img src="/icons/logo.svg" alt="Meeting" className="m-0 w-10 h-10" />
          <p className="pl-1 text-white text-lg">Meeting</p>
        </div>
        <div>
          <p className="text-white text-xl font-bold ">Create your account</p>
          <p className="text-gray-400 mb-0 sm:mb-1">
            Welcome! Please fill in the details to get started.
          </p>
        </div>
        <div className="mb-0 sm:mb-1">
          <button
            onClick={() => signUpGoogle()}
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
        <div className="flex items-center text-gray-400 mb-0 sm:mb-1">
          <hr className="w-[47%]" />
          <p className="px-2">or</p>
          <hr className="w-[47%]" />
        </div>
        <form onSubmit={handleSubmit(createUser)}>
          <div className="mb-0 sm:mb-1">
            <p className="text-white text-left">Image (Optional)</p>
            <input
              type="file"
              className="w-full p-2 text-black rounded bg-white"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.files && setImageUrl(e.target.files[0]);
              }}
            />
          </div>
          <div className="mb-0 sm:mb-1">
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
          <div className="mb-0 sm:mb-1">
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
          <div className="mb-2 sm:mb-3">
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
          <div className="mb-0 sm:mb-[6px] w-full text-center">
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
            className="text-blue-400  hover:text-blue-500 hover:underline"
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
