"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MyButton } from "@/components/styled/Button";
import {
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
  Textarea,
} from "@heroui/react";
import { UploadSimpleIcon, XCircleIcon } from "@phosphor-icons/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { parseDate } from "@internationalized/date";
import { showToast } from "@/libs";
import {
  useCreateLicenseDriverDisclosureSingleton,
  useFetchSaveLicenseDriverSwrSingleton,
  useFetchScanLicenseDriverSwrSingleton,
  useFetchUploadImgSingleton,
} from "@/hook";
import { LicenseDriver } from "@/components/shared/Profile/PersonalInformation/LicenseDriver";

export const classLicenseOptions = [
  { value: "0", label: "A1" },
  { value: "1", label: "A2" },
  { value: "2", label: "B1" },
  { value: "3", label: "B2" },
  { value: "4", label: "C" },
  { value: "5", label: "D" },
];

export const CreateLicenseDriverModal = () => {
  const { isOpen, onOpenChange, onClose, onSuccess } =
    useCreateLicenseDriverDisclosureSingleton();

  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [frontImageURL, setFrontImageURL] = useState<string | null>(null);
  const [backImageURL, setBackImageURL] = useState<string | null>(null);

  const [scanning, setScanning] = useState(false);
  const { uploadImage } = useFetchUploadImgSingleton();
  const { saveLicenseDriver } = useFetchSaveLicenseDriverSwrSingleton();
  const { scanLicenseDriver } = useFetchScanLicenseDriverSwrSingleton();

  const revokePreview = (url: string | null) => {
    if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
  };

  const uploadToCloud = async (frontFile: File, backFile: File) => {
    try {
      if (frontImageURL && backImageURL) {
        return [frontImageURL, backImageURL];
      }
      const [frontResult, backResult] = await Promise.all([
        uploadImage(frontFile),
        uploadImage(backFile),
      ]);
      setFrontImageURL(frontResult);
      setBackImageURL(backResult);
      return [frontResult, backResult];
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleScan = async () => {
    if (!frontFile || !backFile) return;
    try {
      setScanning(true);
      const [frontResult, backResult] = await uploadToCloud(
        frontFile,
        backFile
      );

      const res = await scanLicenseDriver({
        frontImageUrl: frontResult,
        backImageUrl: backResult,
      });
      if (res.isSuccess) {
        console.log("Scan License Driver Data:", res);
        showToast("Quét GPLX thành công!", "success");
        formik.setValues({
          licenseNumber: res.data.licenseNumber,
          fullName: res.data.fullName,
          dateOfBirth: res.data.dateOfBirth,
          nationality: res.data.nationality,
          address: res.data.address,
          licenseClass: res.data.licenseClass,
          beginingDate: res.data.beginingDate,
          expiresDate: "9999-12-31",
          classificationOfMotorVehicles: res.data.classificationOfMotorVehicles,
          frontImageUrl: frontResult,
          backImageUrl: backResult,
        });
      } else {
        showToast(res.message || "Quét GPLX thất bại!", "error");
      }
    } catch (error) {
      console.error("Error uploading images:", error.response);
      showToast("Quét CCCD thất bại!", "error");
    } finally {
      setScanning(false);
    }
  };

  useEffect(
    () => () => {
      revokePreview(frontPreview);
      revokePreview(backPreview);
    },
    [frontPreview, backPreview]
  );

  const formik = useFormik({
    initialValues: {
      licenseNumber: "",
      fullName: "",
      dateOfBirth: "",
      nationality: "",
      address: "",
      licenseClass: "",
      beginingDate: "",
      expiresDate: "",
      classificationOfMotorVehicles: "",
      frontImageUrl: "",
      backImageUrl: "",
    },
    validationSchema: Yup.object({
      licenseNumber: Yup.string().required("Số GPLX là bắt buộc"),
      fullName: Yup.string().required("Họ và tên là bắt buộc"),
      dateOfBirth: Yup.string().required("Ngày sinh là bắt buộc"),
      nationality: Yup.string().required("Quốc tịch là bắt buộc"),
      address: Yup.string().required("Địa chỉ thường trú là bắt buộc"),
      licenseClass: Yup.string().required("Loại GPLX là bắt buộc"),
      beginingDate: Yup.string().required("Ngày cấp là bắt buộc"),
      //expiresDate: Yup.string().required("Ngày hết hạn là bắt buộc"),
      classificationOfMotorVehicles: Yup.string().required(
        "Hạng phương tiện là bắt buộc"
      ),
      frontImageUrl: Yup.string().required("Vui lòng tải ảnh mặt trước"),
      backImageUrl: Yup.string().required("Vui lòng tải ảnh mặt sau"),
    }),

    validate: () => {
      const errors: any = {};
      if (!frontFile) {
        errors.frontImageUrl = "Vui lòng tải ảnh mặt trước";
      }
      if (!backFile) {
        errors.backImageUrl = "Vui lòng tải ảnh mặt sau";
      }
    },

    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      if (!frontImageURL || !backImageURL) {
        const [frontResult, backResult] = await uploadToCloud(
          frontFile!,
          backFile!
        );
        values.frontImageUrl = frontResult;
        values.backImageUrl = backResult;
      }

      try {
        const res = await saveLicenseDriver({
          licenseNumber: values.licenseNumber,
          fullName: values.fullName,
          dateOfBirth: values.dateOfBirth,
          nationality: values.nationality,
          address: values.address,
          licenseClass: Number(values.licenseClass),
          beginingDate: values.beginingDate,
          expiresDate: "9999-12-31",
          classificationOfMotorVehicles: values.classificationOfMotorVehicles,
          frontImagePath: values.frontImageUrl,
          backImagePath: values.backImageUrl,
        });
        if (res.isSuccess) {
          onSuccess();
          showToast("Lưu thông tin GPLX thành công!", "success");
          onClose();
        } else {
          showToast(res.message || "Lưu thông tin GPLX thất bại!", "error");
        }
      } catch (error) {
        console.error("Save ID Card error:", error.response.data.message);
        showToast("Lưu thông tin GPLX thất bại!", "error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const onPickFront = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || !f.type.startsWith("image/")) return;
    revokePreview(frontPreview);
    const url = URL.createObjectURL(f);
    setFrontFile(f);
    setFrontPreview(url);
    formik.setFieldValue("frontImageUrl", url);
    formik.setFieldTouched("frontImageUrl", true);
  };

  const onPickBack = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || !f.type.startsWith("image/")) return;
    revokePreview(backPreview);
    const url = URL.createObjectURL(f);
    setBackFile(f);
    setBackPreview(url);
    formik.setFieldValue("backImageUrl", url);
    formik.setFieldTouched("backImageUrl", true);
  };

  const clearFront = () => {
    revokePreview(frontPreview);
    setFrontFile(null);
    setFrontPreview(null);
    formik.setFieldValue("frontImageUrl", "");
    formik.setFieldTouched("frontImageUrl", true);
  };

  const clearBack = () => {
    revokePreview(backPreview);
    setBackFile(null);
    setBackPreview(null);
    formik.setFieldValue("backImageUrl", "");
    formik.setFieldTouched("backImageUrl", true);
  };

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
    >
      <ModalContent>
        <ModalHeader>Chỉnh sửa giấy phép lái xe</ModalHeader>
        <ModalBody>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                  Ảnh mặt trước
                </label>
                <div
                  className={`relative aspect-video w-full overflow-hidden rounded-lg border border-dashed ${
                    formik.touched.frontImageUrl && formik.errors.frontImageUrl
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-gray-50 dark:bg-gray-900`}
                >
                  {frontPreview ? (
                    <>
                      <Image
                        src={frontPreview}
                        alt="Mặt trước GPLX"
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
                        accept="image/png,image/jpeg"
                        onChange={onPickFront}
                        onBlur={() =>
                          formik.setFieldTouched("frontImageUrl", true)
                        }
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                {!formik.isValid && !frontPreview ? (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.frontImageUrl}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                  Ảnh mặt sau
                </label>
                <div
                  className={`relative aspect-video w-full overflow-hidden rounded-lg border border-dashed ${
                    formik.touched.backImageUrl && formik.errors.backImageUrl
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-gray-50 dark:bg-gray-900`}
                >
                  {backPreview ? (
                    <>
                      <Image
                        src={backPreview}
                        alt="Mặt sau GPLX"
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
                        accept="image/png,image/jpeg"
                        onChange={onPickBack}
                        onBlur={() =>
                          formik.setFieldTouched("backImageUrl", true)
                        }
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                {!formik.isValid && !backPreview ? (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.backImageUrl}
                  </p>
                ) : null}
              </div>

              <MyButton
                kind="green"
                shape="pill"
                onPress={handleScan}
                isDisabled={!frontFile || !backFile}
                isLoading={scanning}
                className="w-full"
              >
                Quét thông tin
              </MyButton>
            </div>

            <Form
              className="space-y-1"
              id="identify-card-form"
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              <Input
                label="Số GPLX"
                value={formik.values.licenseNumber}
                onValueChange={(v) => formik.setFieldValue("licenseNumber", v)}
                isInvalid={
                  !!formik.errors.licenseNumber && formik.touched.licenseNumber
                }
                errorMessage={formik.errors.licenseNumber}
                onBlur={() => formik.setFieldTouched("cardNumber", true)}
                size="md"
                variant="bordered"
              />

              <Input
                label="Họ và tên"
                value={formik.values.fullName}
                onValueChange={(v) => formik.setFieldValue("fullName", v)}
                isInvalid={!!formik.errors.fullName && formik.touched.fullName}
                errorMessage={formik.errors.fullName}
                onBlur={() => formik.setFieldTouched("fullName", true)}
                variant="bordered"
                size="md"
              />

              <div className="grid grid-cols-2 gap-4">
                <DatePicker
                  label="Ngày sinh"
                  placeholderValue={parseDate("2000-01-01")}
                  showMonthAndYearPickers
                  value={
                    formik.values.dateOfBirth
                      ? parseDate(formik.values.dateOfBirth)
                      : undefined
                  }
                  onChange={(v) =>
                    formik.setFieldValue("dateOfBirth", v ? v.toString() : "")
                  }
                  isInvalid={
                    !!formik.errors.dateOfBirth && formik.touched.dateOfBirth
                  }
                  errorMessage={formik.errors.dateOfBirth}
                  variant="bordered"
                />
                <Input
                  label="Quốc tịch"
                  value={formik.values.nationality}
                  onValueChange={(v) => formik.setFieldValue("nationality", v)}
                  isInvalid={
                    !!formik.errors.nationality && formik.touched.nationality
                  }
                  errorMessage={formik.errors.nationality}
                  onBlur={() => formik.setFieldTouched("nationality", true)}
                  variant="bordered"
                />
              </div>

              <Input
                label="Địa chỉ"
                value={formik.values.address}
                onValueChange={(v) => formik.setFieldValue("address", v)}
                isInvalid={!!formik.errors.address && formik.touched.address}
                errorMessage={formik.errors.address}
                onBlur={() => formik.setFieldTouched("address", true)}
                variant="bordered"
              />

              <Select
                label="Hạng bằng"
                selectedKeys={
                  formik.values.licenseClass
                    ? new Set([String(formik.values.licenseClass)])
                    : new Set()
                }
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0];
                  formik.setFieldValue("licenseClass", key);
                }}
                errorMessage={formik.errors.licenseClass}
                onBlur={() => formik.setFieldTouched("licenseClass", true)}
                variant="bordered"
              >
                {classLicenseOptions.map((option) => (
                  <SelectItem key={option.value}>{option.label}</SelectItem>
                ))}
              </Select>

              <DatePicker
                label="Ngày trúng tuyển"
                placeholderValue={parseDate("2021-01-01")}
                showMonthAndYearPickers
                value={
                  formik.values.beginingDate
                    ? parseDate(formik.values.beginingDate)
                    : undefined
                }
                onChange={(v) =>
                  formik.setFieldValue("beginingDate", v ? v.toString() : "")
                }
                isInvalid={
                  !!formik.errors.beginingDate && formik.touched.beginingDate
                }
                errorMessage={formik.errors.beginingDate}
                variant="bordered"
              />

              {/* <DatePicker
                label="Ngày hết hạn"
                value={
                  formik.values.expiresDate
                    ? parseDate(formik.values.expiresDate)
                    : undefined
                }
                onChange={(v) =>
                  formik.setFieldValue("expiresDate", v ? v.toString() : "")
                }
                isInvalid={
                  !!formik.errors.expiresDate && formik.touched.expiresDate
                }
                errorMessage={formik.errors.expiresDate}
                variant="bordered"
              /> */}

              <Textarea
                label="Loại phương tiện"
                value={formik.values.classificationOfMotorVehicles}
                onValueChange={(v) =>
                  formik.setFieldValue("classificationOfMotorVehicles", v)
                }
                isInvalid={
                  !!formik.errors.classificationOfMotorVehicles &&
                  formik.touched.classificationOfMotorVehicles
                }
                errorMessage={formik.errors.classificationOfMotorVehicles}
                onBlur={() =>
                  formik.setFieldTouched("classificationOfMotorVehicles", true)
                }
                variant="bordered"
              />
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

          <MyButton
            kind="green"
            shape="pill"
            onPress={() => formik.submitForm()}
            isLoading={formik.isSubmitting}
          >
            Lưu thông tin
          </MyButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateLicenseDriverModal;
