import React from "react";
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

const AnimatedCard = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`relative rounded-3xl p-[2px] overflow-hidden ${className}`}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      style={{
        backgroundImage: "linear-gradient(270deg, #3b82f6, #9333ea, #3b82f6)",
        backgroundSize: "200% 200%",
      }}
    >
      <div className="bg-gray-800 rounded-3xl p-8 h-full">{children}</div>
    </motion.div>
  );
};

const Overview = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="bg-gray-900 text-gray-200 min-h-screen font-sans antialiased p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >

      <motion.header className="p-6 text-center relative" variants={itemVariants}>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-2 drop-shadow-lg">
          DevMatch
        </h1>
        <p className="text-lg text-gray-400">
          Where developers connect, collaborate, and grow.
        </p>


        <div className="mt-4 sm:absolute sm:top-6 sm:right-8">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </Link>
        </div>
      </motion.header>


      <main className="container mx-auto max-w-6xl">

        <AnimatedCard className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
            Platform Overview
          </h2>
          <p className="text-gray-300 leading-relaxed text-center">
            DevMatch is the ultimate platform for developers to build their
            professional network. It's designed to streamline the process of
            finding like-minded individuals, collaborating on projects, and
            staying updated with the tech community.
          </p>
        </AnimatedCard>


        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-cols-5 gap-6"
          variants={containerVariants}
        >

          <AnimatedCard>
            <div className="text-blue-400 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Connect & Request
            </h3>
            <p className="text-gray-400 text-sm">
              Send connection requests and build your professional network.
              Receive real-time notifications for incoming requests and accept
              them to connect with fellow developers.
            </p>
          </AnimatedCard>


          <AnimatedCard>
            <div className="text-blue-400 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Edit Profile
            </h3>
            <p className="text-gray-400 text-sm">
              Showcase your skills and experience. Update your profile with your
              latest projects, technologies, and achievements to attract new
              opportunities and collaborators.
            </p>
          </AnimatedCard>


          <AnimatedCard>
            <div className="text-blue-400 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H7a2 2 0 00-2 2v2m14 0h-2M11 5v2m6 0v2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Create & View Posts
            </h3>
            <p className="text-gray-400 text-sm">
              Share your thoughts and projects with the community. Browse
              through a personalized feed of posts from your connections to
              discover new content and trends.
            </p>
          </AnimatedCard>


          <AnimatedCard>
            <div className="text-blue-400 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Search Developers
            </h3>
            <p className="text-gray-400 text-sm">
              Find developers by name to expand your network. The intelligent
              search function helps you quickly locate the right people to
              connect with.
            </p>
          </AnimatedCard>


          <AnimatedCard>
            <div className="text-blue-400 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 8h10M7 12h6m-6 4h8m5-10v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h11l4 4z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              AI Chatbot
            </h3>
            <p className="text-gray-400 text-sm">
              Get instant help and guidance with our built-in AI Chatbot.
              Whether you need technical support, coding tips, or quick answers,
              the AI assistant is always ready to assist you.
            </p>
          </AnimatedCard>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Overview;