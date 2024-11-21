"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero-section bg-gradient-to-r from-purple-500 to-[#ff66ff] text-white">
        <div className="flex items-center justify-between p-6 max-w-screen-xl mx-auto">
          <div className="flex items-center">
            <Image src="/icons/logo.svg" alt="Yoom" width={48} height={48} />
            <p className="pl-3 font-bold text-lg">MEETING</p>
          </div>

          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-xl px-6 py-3 rounded-lg"
            onClick={() => {
              router.push("/sign-up");
            }}
          >
            Get Started
          </Button>
        </div>

        <div className="h-[calc(100vh-97px)] flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Connect Effortlessly
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-lg md:text-xl"
          >
            Host meetings, share ideas, and collaborate from anywhere.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-2"
          >
            <Image
              src="/images/Video_Conference.png"
              alt="Meeting Persons"
              width={600}
              height={250}
              className="object-cover"
            />
          </motion.div>

          {/* Scroll Indicator */}
          {/* <motion.div
            className="scroll-down-indicator mt-8"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div> */}
          <div className="max-w-screen-xl mx-auto flex justify-center space-x-12 mt-28 md:mt-12">
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              href="#"
              className="hover:text-purple-800"
            >
              About Us
            </motion.a>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4, duration: 1 }}
              href="#"
              className="hover:text-purple-800"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 1 }}
              href="#"
              className="hover:text-purple-800"
            >
              Contact
            </motion.a>
          </div>
        </div>
      </header>

      {/* Features Section */}
      {/* <section className="features-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 p-6 max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="feature-item text-center bg-white p-6 rounded-lg shadow-lg"
        >
          <Image src="/icons/security.svg" alt="Security" width={50} height={50} />
          <h3 className="text-xl font-semibold mt-4">Top-notch Security</h3>
          <p className="mt-2">Your meetings are encrypted and secure.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="feature-item text-center bg-white p-6 rounded-lg shadow-lg"
        >
          <Image src="/icons/video-quality.svg" alt="High-Quality Video" width={50} height={50} />
          <h3 className="text-xl font-semibold mt-4">High-Quality Video</h3>
          <p className="mt-2">Enjoy seamless and crystal-clear video calls.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="feature-item text-center bg-white p-6 rounded-lg shadow-lg"
        >
          <Image src="/icons/ease-of-use.svg" alt="Ease of Use" width={50} height={50} />
          <h3 className="text-xl font-semibold mt-4">Ease of Use</h3>
          <p className="mt-2">Start your meeting in one click, no hassle.</p>
        </motion.div>
      </section> */}

      {/* Testimonials Section */}
      {/* <section className="testimonials-section bg-dark-2 py-16 text-white">
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-3xl font-bold"
          >
            What Our Users Say
          </motion.h2>

          <div className="testimonial-slider mt-8">
            <motion.div
              className="testimonial-item p-6 mb-4 bg-white text-dark-1 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <p className="italic">This platform made remote meetings so much easier!</p>
              <span className="block mt-2 font-semibold">John Doe, CEO</span>
            </motion.div>

            <motion.div
              className="testimonial-item p-6 mb-4 bg-white text-dark-1 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <p className="italic">Efficient, fast, and reliable—my team loves it!</p>
              <span className="block mt-2 font-semibold">Jane Smith, Product Manager</span>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Call to Action Section */}
      {/* <section className="cta-section text-center py-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-xl text-dark-1"
        >
          Ready to get started? Join now and start your first meeting!
        </motion.p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-6 py-3 px-8 rounded-lg shadow-xl">
          Get Started
        </Button>
      </section> */}
    </div>
  );
};

export default LandingPage;
