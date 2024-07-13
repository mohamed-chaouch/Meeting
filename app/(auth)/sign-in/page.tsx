'use client';

import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from "../../../utils/axios";
import Swal from 'sweetalert2';

interface userProps {
  email: string;
  password: string;
}
const SignIn = () => {
  const [user, setUser] = useState<userProps | {email : "", password: ""}>({ email : "", password: ""})
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const login = useGoogleLogin({
    onSuccess: (response: any) => {
      router.push('/');
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  const loginUser = () =>{
    if(user.email !== "" && user.password !== ""){
      axios.post(`login-user` , user)
        .then((response: any) =>{
          localStorage.setItem("token", response.data.token)
          router.push("/")
        })
        .catch((error: any) => {
          Swal.fire({
            title: "Warning",
            text: "Add correct informations",
            icon: "warning"
          });
        });
    }else{
      Swal.fire({
        title: "Warning",
        text: "Add User Name and Password",
        icon: "warning"
      });
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-dark-1 w-full max-w-lg p-8 rounded-2xl shadow-md text-center">
        <div className="flex items-center justify-center mb-8">
          <Image src="icons/logo.svg" alt="video conference logo" width={48} height={55} />
          <p className="pl-4 text-white text-lg">Meeting</p>
        </div>
        <div>
          <p className="text-white text-xl font-bold mb-2">Sign in to meeting</p>
          <p className="text-gray-400 mb-4">Welcome back! Please sign in to continue</p>
        </div>
        <div className="mb-2">
          <button onClick={() => login()} className="text-white text-4xl">
            <Image src="/icons/google.svg" alt="Google Icon" width={24} height={24} />
          </button>
        </div>
        <div className="flex items-center text-gray-400 mb-2">
          <hr className="w-[47%]" />
          <p className="px-2">or</p>
          <hr className="w-[47%]" />
        </div>
        <div className="mb-2">
          <p className="text-white text-left">Email Address</p>
          <input
            type="email"
            className="w-full p-2 text-black border border-black rounded"
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
              setUser({...user, email:e.target.value});
            }}
          />
        </div>
        <div className="mb-4">
          <p className="text-white text-left">Password</p>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full p-2 text-black border border-black rounded"
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                setUser({...user, password:e.target.value});
              }}
            />
            <button
              onClick={handleClickShowPassword}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white"
            >
              <Image
                src={`/icons/${showPassword ? 'visible.png' : 'invisible.png'}`}
                alt="Password icon"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
        <div className="mb-4 w-full text-center">
          <button className="w-full flex items-center justify-center bg-blue-500 text-white p-2 rounded" onClick={loginUser}>
            <p className="text-white text-sm">Continue</p>
            <Image src='/icons/arrow-right.png' alt='Arrow Right' width={24} height={24} className="bg-blue-500" />
          </button>
        </div>
        <div className="flex items-center justify-center mb-4">
          <p className="text-gray-400 text-sm pr-3">Don&apos;t have an account?</p>
          <Link href="/sign-up" className="text-blue-500">Sign up</Link>
        </div>
        <p className="text-white mt-4">Secured</p>
      </div>
    </div>
  );
}

export default SignIn;
