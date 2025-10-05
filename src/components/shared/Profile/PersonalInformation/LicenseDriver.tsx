"use client";
import { MyButton } from "@/components/styled/Button";
import { Alert, Chip } from "@heroui/react";
import { PencilLineIcon, UploadSimpleIcon } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import Image from "next/image";
import {
  useCreateLicenseDriverDisclosureSingleton,
  useFetchViewLicenseDriverSwrSingleton,
  useUpdateLicenseDriverDisclosureSingleton,
} from "@/hook";

export const LicenseDriver = () => {
  const { onOpen: onOpenCreate, setOnSuccess: setOnSuccessCreate } =
    useCreateLicenseDriverDisclosureSingleton();
  const {
    onOpen: onOpenUpdate,
    setOnSuccess: setOnSuccessUpdate,
    openWithData,
  } = useUpdateLicenseDriverDisclosureSingleton();
  const { viewLicenseDriver } = useFetchViewLicenseDriverSwrSingleton();
  const [LicenseDriver, setLicenseDriver] = useState(null);
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.data?.user;

  useEffect(() => {
    fetchLicenseDriver();
  }, []);

  const fetchLicenseDriver= async () => {
    if (user?.id) {
      try {
        const response = await viewLicenseDriver(`${user.id}`);
        setLicenseDriver(response.data);
        console.log("ID Card Data:", response);
      } catch (error) {
        console.error("Failed to fetch ID card:", error);
      }
    }
  };

  const handleOpenModal = () => {
    if (!LicenseDriver) {
      setOnSuccessCreate(() => fetchLicenseDriver);
      onOpenCreate();
    } else {
      setOnSuccessUpdate(() => fetchLicenseDriver);
      openWithData(LicenseDriver);
      onOpenUpdate();
    }
  };

  return (
    <div className="w-full max-w-3xl xl:max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bằng lái xe
          </h2>
          {!LicenseDriver ? (
            <Chip color="danger">Chưa xác thực</Chip>
          ) : (
            <Chip color="success">Đã xác thực</Chip>
          )}
        </div>
        <MyButton
          kind="green"
          shape="pill"
          onPress={handleOpenModal}
          className="flex items-center gap-2 bg-transparent text-black dark:text-white"
        >
          <PencilLineIcon className="w-4 h-4" />
          Chỉnh sửa
        </MyButton>
      </div>

      {!LicenseDriver && (
        <Alert color="warning" className="mb-6">
          Vui lòng cập nhật thông tin bằng lái xe để xác thực tài khoản.
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
            Hình ảnh
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-center h-64 dark:bg-gray-900 dark:border-gray-700">
            {!LicenseDriver ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UploadSimpleIcon className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-600 text-sm dark:text-gray-300">
                  Vào Chỉnh sửa để tải ảnh bằng lái xe
                </p>
              </div>
            ) : (
              <Image
                src={LicenseDriver?.frontImagePath || ""}
                alt="ID Card Front"
                width={500}
                height={400}
              />
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
            Thông tin chung
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                Số bằng lái xe
              </label>
              <input
                type="text"
                value={LicenseDriver?.cardNumber || "Chưa cập nhật"}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 dark:border-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                Họ và tên
              </label>
              <input
                type="text"
                value={LicenseDriver?.fullName || "Chưa cập nhật"}
                readOnly
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
                  value={LicenseDriver?.dateOfBirth || ""}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                  Hạng bằng
                </label>
                <input
                  type="text"
                  value={LicenseDriver?.sex || ""}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
