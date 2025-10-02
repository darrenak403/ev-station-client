"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MyButton } from "@/components/styled";
import {
  Alert,
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
} from "@heroui/react";
import { UploadSimpleIcon, XCircleIcon } from "@phosphor-icons/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { parseDate } from "@internationalized/date";
import {
  useFetchScanIDCardSwrSingleton,
  useFetchUploadImgSingleton,
  useUpdateIDCardDisclosureSingleton,
  useFetchUpdateIDCardSwrSingleton,
} from "@/hook";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";

export const UpdateIdCardModal = () => {
  const { isOpen, onOpenChange, onClose, onSuccess, initialData } =
    useUpdateIDCardDisclosureSingleton();

  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [frontImageURL, setFrontImageURL] = useState<string | null>(null);
  const [backImageURL, setBackImageURL] = useState<string | null>(null);

  const [scanning, setScanning] = useState(false);
  const { uploadImage } = useFetchUploadImgSingleton();
  const { scanIDCard } = useFetchScanIDCardSwrSingleton();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const { updateIDCard } = useFetchUpdateIDCardSwrSingleton();
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState<"success" | "danger">("success");
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.data?.user;

  useEffect(() => {
    if (isOpen && initialData) {
      formik.setValues({
        cardNumber: initialData.cardNumber || "",
        fullName: initialData.fullName || "",
        sex: initialData.sex || "",
        nationality: initialData.nationality || "",
        dateOfBirth: initialData.dateOfBirth || "",
        placeOfOrigin: initialData.placeOfOrigin || "",
        placeOfResidence: initialData.placeOfResidence || "",
        createDate: initialData.createDate || "",
        dayOfExpiry: initialData.dayOfExpiry || "",
        frontImageUrl: initialData.frontImagePath || "",
        backImageUrl: initialData.backImagePath || "",
      });
      setFrontPreview(initialData.frontImagePath || null);
      setBackPreview(initialData.backImagePath || null);
      setFrontImageURL(initialData.frontImagePath || null);
      setBackImageURL(initialData.backImagePath || null);
    }
  }, [isOpen, initialData]);

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

      const res = await scanIDCard({
        frontImageUrl: frontResult,
        backImageUrl: backResult,
      });
      if (res.isSuccess) {
        showAlertMsg("Quét CCCD thành công!", "success");
        formik.setValues({
          cardNumber: res.data.cardNumber || "",
          fullName: res.data.fullName || "",
          sex: res.data.sex || "",
          nationality: res.data.nationality || "",
          dateOfBirth: res.data.dateOfBirth
            ? res.data.dateOfBirth.toString()
            : "",
          placeOfOrigin: res.data.placeOfOrigin || "",
          placeOfResidence: res.data.placeOfResidence || "",
          createDate: res.data.createDate ? res.data.createDate.toString() : "",
          dayOfExpiry: res.data.dayOfExpiry
            ? res.data.dayOfExpiry.toString()
            : "",
          frontImageUrl: frontResult,
          backImageUrl: backResult,
        });
      } else {
        showAlertMsg(res.message, "danger");
      }
    } catch (error) {
      console.error("Error uploading images:", error.response.message);
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
      cardNumber: "",
      fullName: "",
      sex: "",
      nationality: "",
      dateOfBirth: "",
      placeOfOrigin: "",
      placeOfResidence: "",
      createDate: "",
      dayOfExpiry: "",
      frontImageUrl: "",
      backImageUrl: "",
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .required("Số CCCD là bắt buộc")
        .matches(/^\d{9,12}$/, "Số CCCD gồm 9-12 chữ số"),
      fullName: Yup.string().required("Họ và tên là bắt buộc"),
      sex: Yup.string()
        .oneOf(["Nam", "Nữ"], "Chọn giới tính hợp lệ")
        .required("Giới tính là bắt buộc"),
      nationality: Yup.string().required("Quốc tịch là bắt buộc"),
      dateOfBirth: Yup.string().required("Ngày sinh là bắt buộc"),
      placeOfOrigin: Yup.string().required("Quê quán là bắt buộc"),
      placeOfResidence: Yup.string().required("Địa chỉ thường trú là bắt buộc"),
      createDate: Yup.string().required("Ngày cấp là bắt buộc"),
      dayOfExpiry: Yup.string().nullable(),
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
        const res = await updateIDCard(
          {
            cardNumber: values.cardNumber,
            fullName: values.fullName,
            sex: values.sex,
            nationality: values.nationality,
            dateOfBirth: values.dateOfBirth,
            placeOfOrigin: values.placeOfOrigin,
            placeOfResidence: values.placeOfResidence,
            createDate: values.createDate,
            dayOfExpiry: values.dayOfExpiry,
            frontImagePath: values.frontImageUrl,
            backImagePath: values.backImageUrl,
          },
          user?.id
        );
        if (res.isSuccess) {
          onSuccess();
          showAlertMsg("Lưu thông tin CCCD thành công!", "success");
          onClose();
        } else {
          showAlertMsg(res.message, "danger");
        }
      } catch (error) {
        console.error("Save ID Card error:", error.response.data.message);
        showAlertMsg("Lưu thông tin CCCD thất bại!", "danger");
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

  const showAlertMsg = (msg: string, color: "success" | "danger") => {
    setAlertMessage(msg);
    setAlertColor(color);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
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
        <ModalHeader>Chỉnh sửa căn cước công dân</ModalHeader>
        <ModalBody>
          <AnimatePresence>
            {showAlert && (
              <motion.div
                key={alertMessage}
                className="fixed top-4 right-4 z-50 w-auto max-w-md"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              >
                <Alert hideIconWrapper color={alertColor} className="shadow-lg">
                  {alertMessage}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
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
                label="Số CCCD"
                readOnly
                value={formik.values.cardNumber}
                onValueChange={(v) => formik.setFieldValue("cardNumber", v)}
                isInvalid={
                  !!formik.errors.cardNumber && formik.touched.cardNumber
                }
                errorMessage={formik.errors.cardNumber}
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
                <Select
                  label="Giới tính"
                  selectedKeys={
                    formik.values.sex ? new Set([formik.values.sex]) : new Set()
                  }
                  onSelectionChange={(keys) => {
                    const v = Array.from(keys as Set<string>)[0] ?? "";
                    formik.setFieldValue("sex", v);
                    formik.setFieldTouched("sex", true);
                  }}
                  errorMessage={formik.errors.sex as string}
                  variant="bordered"
                >
                  <SelectItem key="Nam">Nam</SelectItem>
                  <SelectItem key="Nữ">Nữ</SelectItem>
                </Select>

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
                label="Quê quán"
                value={formik.values.placeOfOrigin}
                onValueChange={(v) => formik.setFieldValue("placeOfOrigin", v)}
                isInvalid={
                  !!formik.errors.placeOfOrigin && formik.touched.placeOfOrigin
                }
                errorMessage={formik.errors.placeOfOrigin}
                onBlur={() => formik.setFieldTouched("placeOfOrigin", true)}
                variant="bordered"
              />

              <Input
                label="Địa chỉ thường trú"
                value={formik.values.placeOfResidence}
                onValueChange={(v) =>
                  formik.setFieldValue("placeOfResidence", v)
                }
                isInvalid={
                  !!formik.errors.placeOfResidence &&
                  formik.touched.placeOfResidence
                }
                errorMessage={formik.errors.placeOfResidence}
                onBlur={() => formik.setFieldTouched("placeOfResidence", true)}
                variant="bordered"
              />

              <DatePicker
                label="Ngày cấp"
                placeholderValue={parseDate("2021-01-01")}
                showMonthAndYearPickers
                value={
                  formik.values.createDate
                    ? parseDate(formik.values.createDate)
                    : undefined
                }
                onChange={(v) =>
                  formik.setFieldValue("createDate", v ? v.toString() : "")
                }
                isInvalid={
                  !!formik.errors.createDate && formik.touched.createDate
                }
                errorMessage={formik.errors.createDate}
                variant="bordered"
              />

              <DatePicker
                label="Ngày hết hạn"
                value={
                  formik.values.dayOfExpiry
                    ? parseDate(formik.values.dayOfExpiry)
                    : undefined
                }
                onChange={(v) =>
                  formik.setFieldValue("dayOfExpiry", v ? v.toString() : "")
                }
                isInvalid={
                  !!formik.errors.dayOfExpiry && formik.touched.dayOfExpiry
                }
                errorMessage={formik.errors.dayOfExpiry}
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

export default UpdateIdCardModal;
