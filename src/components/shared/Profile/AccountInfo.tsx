"use client";
import { RootState } from "@/redux";
import { PencilIcon } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import Image from "next/image";

export function AccountInfo() {
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.data?.user;
  const avatarUrl = user?.avatarUrl;

  return (
    <div className="w-full max-w-3xl xl:max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold dark:text-white">Thông tin tài khoản</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 p-4">
        <div className="md:col-span-1">
          <div className="text-center">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="avatar"
                width={160}
                height={160}
                className="w-40 h-40 mx-auto mb-4 rounded-full object-cover"
                quality={90}
                unoptimized
              />
            ) : (
              <div className="w-40 h-40 text-large mx-auto mb-4 dark:bg-gray-600 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                {user?.fullName?.split(" ").slice(-1)[0]?.[0] ?? "U"}
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">
              {user?.fullName || "Chưa có"}
            </h3>
            <p className="text-gray-500 text-sm dark:text-gray-400">Tham gia: 24/09/2025</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex align-items-center justify-between">
              <label className="block text-sm text-gray-600 dark:text-gray-400">Ngày sinh</label>
              <div className="flex items-center gap-2 justify-between dark:text-gray-400">
                <span className="text-gray-900 dark:text-gray-300">--/--/----</span>
                <PencilIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="flex align-items-center justify-between">
              <label className="block text-sm text-gray-600 dark:text-gray-400">Giới tính</label>
              <div className="flex items-center justify-between">
                <span className="text-gray-900 dark:text-gray-300">Nam</span>
                <PencilIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex align-items-center justify-between">
            <label className="block text-sm text-gray-600 dark:text-gray-400">Số điện thoại</label>
            <div className="flex items-center gap-2">
              <span className="text-gray-900 dark:text-gray-300">Thêm số điện thoại</span>
              <PencilIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex align-items-center justify-between">
            <label className="block text-sm text-gray-600 dark:text-gray-400">Email</label>
            <div className="flex items-center gap-2">
              <span className="text-gray-900 dark:text-gray-300">{user?.email}</span>
              <PencilIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex align-items-center justify-between">
            <label className="block text-sm text-gray-600 dark:text-gray-400">Google</label>
            <div className="flex items-center gap-2">
              <span className="text-gray-900 dark:text-gray-300">Vũ Tuấn</span>
              <PencilIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
