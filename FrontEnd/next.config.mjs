/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "lh3.googleusercontent.com",
      "meetings-backend.vercel.app",
    ],
  },
};

export default nextConfig;
