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
import { classLicenseOptions } from "@/components/modules/Modal/ManageLicenseDriver/CreateLicenseDriver";

export const LicenseDriver = () => {
  const { onOpen: onOpenCreate, setOnSuccess: setOnSuccessCreate } =
    useCreateLicenseDriverDisclosureSingleton();
  const {
    onOpen: onOpenUpdate,
    setOnSuccess: setOnSuccessUpdate,
    openWithData,
  } = useUpdateLicenseDriverDisclosureSingleton();
  const { viewLicenseDriver } = useFetchViewLicenseDriverSwrSingleton();
  const [ArrayLicense, setArrayLicense] = useState([]);
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.data?.user;

  const licenseA = ArrayLicense.find(
    (license) => license?.licenseClass < 2
  );

  const licenseB = ArrayLicense.find(
    (license) => license?.licenseClass >= 2
  );

  useEffect(() => {
    fetchLicenseDriver();
  }, []);

  const fetchLicenseDriver = async () => {
    if (user?.id) {
      try {
        const response = await viewLicenseDriver(`${user.id}`);
        setArrayLicense(response.data || []);
        //console.log("License Driver Data:", response.data);
      } catch (error) {
        console.error("Failed to fetch license driver:", error);
      }
    }
  };

  const handleOpenModal = (licenseType = null) => {
    if (!licenseType) {
      setOnSuccessCreate(() => fetchLicenseDriver);
      onOpenCreate();
    } else {
      setOnSuccessUpdate(() => fetchLicenseDriver);
      openWithData(licenseType);
      onOpenUpdate();
    }
  };

  const renderLicenseCard = (license, title) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          {!license ? (
            <Chip color="danger" size="sm">
              Chưa có
            </Chip>
          ) : (
            <Chip color="success" size="sm">
              Đã có
            </Chip>
          )}
        </div>
        <MyButton
          kind="green"
          shape="pill"
          size="sm"
          onPress={() => handleOpenModal(license)}
          className="flex items-center gap-2 dark:text-white"
        >
          <PencilLineIcon className="w-3 h-3" />
          {license ? "Sửa" : "Thêm"}
        </MyButton>
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        <div className="col-span-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
            Hình ảnh
          </h4>
          <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-center h-32 dark:bg-gray-800">
            {!license ? (
              <div className="text-center">
                <UploadSimpleIcon className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-gray-600 text-xs dark:text-gray-300">
                  Chưa có ảnh
                </p>
              </div>
            ) : (
              <Image
                className="w-full h-full object-contain rounded"  
                unoptimized
                src={license?.frontImagePath || ""}
                alt={`${title} Front`}
                width={200}
                height={120}
              />
            )}
          </div>
        </div>

        <div className="space-y-2 col-span-2 self-end">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1 dark:text-gray-400">
              Số bằng lái
            </label>
            <p className="text-sm text-gray-900 dark:text-gray-100">
              {license?.licenseNumber || "Chưa cập nhật"}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1 dark:text-gray-400">
              Hạng bằng
            </label>
            <p className="text-sm text-gray-900 dark:text-gray-100">
              {license?.licenseClass != null
                ? classLicenseOptions.find(
                    (x) => x.value === String(license.licenseClass)
                  )?.label
                : "Chưa cập nhật"}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1 dark:text-gray-400">
              Ngày cấp
            </label>
            <p className="text-sm text-gray-900 dark:text-gray-100">
              {license?.beginingDate || "Chưa cập nhật"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Giấy phép lái xe
        </h2>
      </div>

      {ArrayLicense.length === 0 && (
        <Alert color="warning" className="mb-4">
          Vui lòng cập nhật thông tin bằng lái xe để xác thực tài khoản.
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-2">
        {renderLicenseCard(licenseA, "Hạng Xe máy")}
        {renderLicenseCard(licenseB, "Hạng Ô tô")}
      </div>

    </div>
  );
};
