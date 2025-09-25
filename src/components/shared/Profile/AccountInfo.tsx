"use client";
import { RootState } from "@/redux";
import { Avatar, Badge } from "@heroui/react";
import { PencilIcon } from "@phosphor-icons/react";
import { useSelector } from "react-redux";

export function AccountInfo() {

  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.data?.user;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Thông tin tài khoản</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8 p-4">
        <div className="md:col-span-1">
          <div className="text-center">
            <Avatar
              className="w-40 h-40 text-large mx-auto mb-4"
              src={user?.avatarUrl || "/default-avatar.png"}
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{user?.fullName || "Chưa có"}</h3>
            <p className="text-gray-500 text-sm">Tham gia: 24/09/2025</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex align-items-center justify-between">
              <label className="block text-sm text-gray-600">
                Ngày sinh
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-900">--/--/----</span>
                <PencilIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="flex align-items-center justify-between">
              <label className="block text-sm text-gray-600">
                Giới tính
              </label>
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Nam</span>
                <PencilIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex align-items-center justify-between">
            <label className="block text-sm text-gray-600">
              Số điện thoại
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">Thêm số điện thoại</span>
              <PencilIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex align-items-center justify-between">
            <label className="block text-sm text-gray-600">Email</label>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">{user?.email}</span>
              <PencilIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex align-items-center justify-between">
            <label className="block text-sm text-gray-600">Google</label>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">Vũ Tuấn</span>
              <PencilIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
