"use client";

import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from "../../../utils/axios";
import Swal from 'sweetalert2';

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  // const [user , setUser] = useState<UserProps | {}>()
  const [imageUrl , setImageUrl] = useState<any | "">("");
  const [userName, setUserName] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [email, setEmail] = useState<string | "">();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const login = useGoogleLogin({
    onSuccess: (response: any) => {
      router.push('/');
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  const createUser = async () =>{
    const fd = new FormData();
    if (imageUrl) {
      fd.append("imageUrl", imageUrl);
    }
    
    fd.append("username", userName || '');
    fd.append("email", email || '');
    fd.append("password", password || '');
    
    try{
      if(userName !== "" && email !== "" && imageUrl !== ""){
        const {data} = await axios.post(`create-user`, fd)
      
        if (data && data.token) {
          localStorage.setItem('token', data.token);
        }
        router.push('/');
      }else{
        Swal.fire({
          title: "Warning",
          text: "Remplir the inputs",
          icon: "warning"
        });
      }
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-dark-1 w-full max-w-lg p-8 rounded-2xl shadow-md text-center">
        <div className="flex items-center justify-center mb-8">
          <Image src="/icons/logo.svg" alt="video conference logo" width={48} height={55} />
          <p className="pl-4 text-white text-lg">Meeting</p>
        </div>
        <div>
          <p className="text-white text-xl font-bold mb-2">Create your account</p>
          <p className="text-gray-400 mb-4">Welcome! Please fill in the details to get started.</p>
        </div>
        <div className="mb-4">
          <button onClick={() => login()} className="text-white text-4xl">
            <Image src="/icons/google.svg" alt="Google Icon" width={24} height={24} />
          </button>
        </div>
        <div className="flex items-center text-gray-400 mb-4">
          <hr className="w-[47%]" />
          <p className="px-2">or</p>
          <hr className="w-[47%]" />
        </div>
        <div className="mb-2">
          <p className="text-white text-left">Image</p>
          <input
            type="file"
            className="w-full p-2 text-black rounded bg-white"
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
              e.target.files && setImageUrl(e.target.files[0])
            }}
          />
        </div>
        <div className="mb-2">
          <p className="text-white text-left">Username</p>
          <input
            type="text"
            className="w-full p-2 text-black border border-black rounded"
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="mb-2">
          <p className="text-white text-left">Email Address</p>
          <input
            type="email"
            className="w-full p-2 text-black border border-black rounded"
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
              setEmail(e.target.value);
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
                setPassword(e.target.value);
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
          <button className="w-full flex items-center justify-center bg-blue-500 text-white p-2 rounded" onClick={createUser}>
            <p className="text-white text-sm">Continue</p>
            <Image src='/icons/arrow-right.png' alt='Arrow Right' width={24} height={24} className="bg-blue-500" />
          </button>
        </div>
        <div className="flex items-center justify-center mb-4">
          <p className="text-gray-400 text-sm pr-3">Already have an account?</p>
          <Link href="/sign-in" className="text-blue-500">Sign in</Link>
        </div>
        <p className="text-center mt-4 text-white">Secured</p>
      </div>
    </div>
  );
};

export default SignUp;
