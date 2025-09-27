"use client";
import { MyButton } from "@/components/styled";
import { Alert, Chip, useDisclosure } from "@heroui/react";
import { PencilLineIcon, UploadSimpleIcon } from "@phosphor-icons/react";
import React from "react";
import { IndentifyCardModal } from "./Modal/IndentifyCardModal";

export const IdentifyCard = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <div className="w-full max-w-3xl xl:max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Căn cước công dân
          </h2>
          <Chip color="danger">Chưa xác thực</Chip>
        </div>
        <MyButton
          kind="green"
          shape="pill"
          onPress={onOpen}
          className="flex items-center gap-2 bg-transparent text-black dark:text-white"
        >
          <PencilLineIcon className="w-4 h-4" />
          Chỉnh sửa
        </MyButton>
      </div>

      <Alert color="danger" className="mb-6">
        Vui lòng cập nhật thông tin căn cước công dân để xác thực tài khoản.
      </Alert>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
            Hình ảnh
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-center h-64 dark:bg-gray-900 dark:border-gray-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UploadSimpleIcon className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-600 text-sm dark:text-gray-300">
                Vào Chỉnh sửa để tải ảnh CCCD
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
            Thông tin chung
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                Số CCCD
              </label>
              <input
                type="text"
                placeholder="Nhập số CCCD"
                className="w-full px-3 py-2 border border-gray-300 dark:border-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                Họ và tên
              </label>
              <input
                type="text"
                placeholder="Nhập đầy đủ họ tên"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                  Giới tính
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-900 dark:text-gray-100">
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Khác</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <IndentifyCardModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
    </div>
  );
};
