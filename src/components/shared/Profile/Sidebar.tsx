"use client";
import { RootState } from "@/redux";
import {
  CarIcon,
  HeartIcon,
  LockIcon,
  SignOutIcon,
  TrashIcon,
  UserIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearAuth } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Sidebar() {
  const pathname = usePathname();
  const base = "/profile";
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.data?.user;
  const userRole = user?.roleName;
  const dispatch = useDispatch();
  const router = useRouter();

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogout = () => {
    setConfirmOpen(true);
  };

  const confirmLogout = () => {
    setConfirmOpen(false);
    dispatch(clearAuth());
    router.push("/auth/sign-in");
  };

  const cancelLogout = () => {
    setConfirmOpen(false);
  };

  const allMenuItems = [
    {
      id: "account-info",
      href: `${base}`,
      icon: UserIcon,
      label: "Tài khoản",
    },
    {
      id: "history",
      href: `${base}/history`,
      icon: CarIcon,
      label: "Chuyến xe của tôi",
    },
    {
      id: "favourite",
      href: `${base}/favourite`,
      icon: HeartIcon,
      label: "Xe yêu thích",
    },
    {
      id: "password",
      href: `${base}/password`,
      icon: LockIcon,
      label: "Đổi mật khẩu",
    },
    {
      id: "delete",
      href: `${base}/delete`,
      icon: TrashIcon,
      label: "Xoá tài khoản",
    },
  ] as const;

  const menuItems =
    userRole === "Renter"
      ? allMenuItems
      : allMenuItems.filter((i) => i.id !== "history" && i.id !== "favourite");

  return (
    <div className="w-60">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 dark:text-white">
        Xin chào bạn!
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors rounded-md ${
                  isActive
                    ? "bg-green-50 text-green-700 border-l-4 border-green-500 dark:bg-slate-700 dark:text-green-300"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700 "
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium dark:text-gray-300">
                  {item.label}
                </span>
              </Link>
            </motion.div>
          );
        })}

        <motion.button
          className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-8 dark:hover:bg-red-900 dark:text-red-400"
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <SignOutIcon className="w-5 h-5" />
          <span className="font-medium dark:text-gray-300">Đăng xuất</span>
        </motion.button>
      </nav>

      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            key="logout-modal"
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* overlay */}
            <motion.div
              className="absolute inset-0 bg-black/40"
              onClick={cancelLogout}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* modal panel */}
            <motion.div
              className="relative bg-white dark:bg-slate-800 rounded-lg shadow-lg w-[90%] max-w-md p-6"
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Xác nhận đăng xuất
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Bạn có chắc muốn đăng xuất không?
              </p>
              <div className="flex justify-end gap-3">
                <motion.button
                  type="button"
                  onClick={cancelLogout}
                  className="cursor-pointer px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Huỷ
                </motion.button>
                <motion.button
                  type="button"
                  onClick={confirmLogout}
                  className="cursor-pointer px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Đăng xuất
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
