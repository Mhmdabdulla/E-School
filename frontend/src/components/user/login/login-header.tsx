
import { motion } from "framer-motion";

interface HeaderProps {
  signState: "signIn" | "signUp";
  setSignState: (state: "signIn" | "signUp") => void;
}

const Header = ({ signState, setSignState }: HeaderProps) => {

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="absolute top-5 left-6  "></div>
      <div className="flex justify-center items-center">
        <div className="bg-white dark:bg-black shadow-md rounded-full p-1 inline-flex border border-gray-200 dark:border-gray-800">
          <motion.button
            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              signState === "signIn"
                ? "text-white"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => setSignState("signIn")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {signState === "signIn" && (
              <motion.div
                className="absolute inset-0 bg-black dark:bg-white rounded-full"
                layoutId="activeTab"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10  ${
                signState === "signIn" ? `text-white dark:text-black` : `text-black dark:text-white`
              }`}
            >
              Sign In
            </span>
          </motion.button>

          <motion.button
            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              signState === "signUp"
                ? "text-white"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => setSignState("signUp")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {signState === "signUp" && (
              <motion.div
                className="absolute inset-0 bg-black dark:bg-white rounded-full"
                layoutId="activeTab"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10  ${
                signState === "signUp" ? `text-white dark:text-black` : `text-black dark:text-white`
              }`}
            >
              Sign Up
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Header;