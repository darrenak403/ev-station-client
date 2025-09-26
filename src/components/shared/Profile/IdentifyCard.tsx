"use client";
import { MyButton } from "@/components/styled";
import {
  Alert,
  Chip,
  DatePicker,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import {
  PencilLineIcon,
  XCircleIcon,
  UploadSimpleIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const IdentifyCard = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  const revokePreview = (url: string | null) => {
    if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
  };

  useEffect(
    () => () => {
      revokePreview(frontPreview);
      revokePreview(backPreview);
    },
    [frontPreview, backPreview]
  );

  const onPickFront = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) return; 
    revokePreview(frontPreview);
    setFrontFile(f);
    setFrontPreview(URL.createObjectURL(f));
  };

  const onPickBack = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) return;
    revokePreview(backPreview);
    setBackFile(f);
    setBackPreview(URL.createObjectURL(f));
  };

  const clearFront = () => {
    revokePreview(frontPreview);
    setFrontFile(null);
    setFrontPreview(null);
  };
  const clearBack = () => {
    revokePreview(backPreview);
    setBackFile(null);
    setBackPreview(null);
  };

  const handleSave = () => {
    
    onClose();
  };

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
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
                >
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Khác</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
      >
        <ModalContent>
          <ModalHeader>Chỉnh sửa căn cước công dân</ModalHeader>
          <ModalBody>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                    Ảnh mặt trước
                  </label>
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900">
                    {frontPreview ? (
                      <>
                        <Image
                          src={frontPreview}
                          alt="Mặt trước CCCD"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                          unoptimized
                        />
                        <button
                          type="button"
                          onClick={clearFront}
                          className="absolute top-2 right-2 bg-white/90 dark:bg-black/60 rounded-full p-1 shadow"
                          aria-label="Xóa ảnh mặt trước"
                        >
                          <XCircleIcon className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                        <UploadSimpleIcon className="w-6 h-6 text-gray-500 mb-2" />
                        <span className="text-xs text-gray-500">
                          Tải ảnh (PNG, JPG)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={onPickFront}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                    Ảnh mặt sau
                  </label>
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900">
                    {backPreview ? (
                      <>
                        <Image
                          src={backPreview}
                          alt="Mặt sau CCCD"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                          unoptimized
                        />
                        <button
                          type="button"
                          onClick={clearBack}
                          className="absolute top-2 right-2 bg-white/90 dark:bg-black/60 rounded-full p-1 shadow"
                          aria-label="Xóa ảnh mặt sau"
                        >
                          <XCircleIcon className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                        <UploadSimpleIcon className="w-6 h-6 text-gray-500 mb-2" />
                        <span className="text-xs text-gray-500">
                          Tải ảnh (PNG, JPG)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={onPickBack}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
                <MyButton kind="green" shape="pill" className="w-full">
                  Quét thông tin
                </MyButton>
              </div>

              <Form className="space-y-1">
                <Input
                  label="Số CCCD"
                  placeholder="Nhập số CCCD"
                  variant="bordered"
                  size="md"
                />
                <Input
                  label="Họ và tên"
                  placeholder="Nhập đầy đủ họ tên"
                  variant="bordered"
                  size="md"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Select label="Giới tính">
                    <SelectItem key="Male">Nam</SelectItem>
                    <SelectItem key="Female">Nữ</SelectItem>
                  </Select>
                  <Input label="Quốc tịch" placeholder="Việt Nam" />
                </div>

                <DatePicker label="Ngày sinh" />
                <Input label="Quê quán" placeholder="Việt Nam" />
                <Input
                  label="Địa chỉ thường trú"
                  placeholder="Nhập địa chỉ thường trú"
                />
                <Input label="Nơi cấp" placeholder="Nhập nơi cấp" />
                <DatePicker label="Ngày cấp" />
              </Form>
            </div>
          </ModalBody>
          <ModalFooter>
            <MyButton
              kind="green"
              shape="pill"
              onPress={onClose}
              className="mr-2"
            >
              Hủy
            </MyButton>
            <MyButton kind="green" shape="pill" onPress={handleSave}>
              Lưu
            </MyButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
