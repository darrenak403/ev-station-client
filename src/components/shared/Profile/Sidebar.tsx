"use client";
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

export function Sidebar() {
    const pathname = usePathname();
    const base = "/user";

  const menuItems = [
    { id: "account-info", href: `${base}/account`, icon: UserIcon, label: "Tài khoản" },
    { id: "history", href: `${base}/history`, icon: CarIcon, label: "Lịch sử thuê xe" },
    { id: "favourite", href: `${base}/favourite`, icon: HeartIcon, label: "Xe yêu thích" },
    { id: "password", href: `${base}/password`, icon: LockIcon, label: "Đổi mật khẩu" },
    { id: "delete", href: `${base}/delete`, icon: TrashIcon, label: "Xoá tài khoản" },
  ];
  return (
    <div className="w-80">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 dark:text-white">Xin chào bạn!</h1>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                isActive ? "bg-green-50 text-green-700 border-l-4 border-green-500" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 hover:dark:bg-gray-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium dark:text-gray-300">{item.label}</span>
            </Link>
          )
        })}
        <button
          className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600
         hover:bg-red-50 rounded-lg transition-colors mt-8 dark:hover:bg-red-900 dark:text-red-400"
        >
          <SignOutIcon className="w-5 h-5" />
          <span className="font-medium dark:text-gray-300">Đăng xuất</span>
        </button>
      </nav>
    </div>
  );
}
