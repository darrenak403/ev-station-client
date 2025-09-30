"use client";
import React, { useState } from "react";
import { Alert, Input, Divider } from "@heroui/react";
import { EyeIcon } from "@phosphor-icons/react";
import { useFormik } from "formik";
import { MyButton } from "@/components";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import type { CredentialResponse } from "@react-oauth/google";
import { useFetchLoginSwrSingleton } from "@/hook/singleton/swrs/fetchAuth/useFetchLoginSwr";
import { useFetchLoginGoogleSingleton } from "@/hook/singleton/swrs/fetchAuth/useFetchLoginGoogleSwr";
import { motion, AnimatePresence } from "framer-motion";
import { hashPasswordSHA256 } from "../../../../type/hashPassword";
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState<"success" | "danger">("success");
  const [processing, setProcessing] = useState(false);
  const { login } = useFetchLoginSwrSingleton();
  const { loginWithGoogle, loading: googleLoading } =
    useFetchLoginGoogleSingleton();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email là bắt buộc")
        .email("Email không hợp lệ"),
      password: Yup.string()
        .required("Mật khẩu là bắt buộc")
        .min(8, "Mật khẩu phải ít nhất 8 ký tự")
        .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ hoa")
        .matches(/[a-z]/, "Mật khẩu phải có ít nhất 1 chữ thường")
        .matches(/[0-9]/, "Mật khẩu phải có ít nhất 1 số"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setProcessing(true);
      setSubmitting(true);
      const hashPassword = await hashPasswordSHA256(values.password);
      // delay 2s before calling API
      await new Promise((r) => setTimeout(r, 2000));
      try {
        const result = await login({
          email: values.email,
          password: hashPassword,
        });

        if (result.isSuccess) {
          setAlertMessage(result.message);
          setAlertColor("success");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 2000);
          setTimeout(() => {
            switch (result.data.user?.roleName) {
              case "Admin":
                router.push("/admin/dashboard");
                break;
              case "Staff":
                router.push("/staff/dashboard");
                break;
              case "Renter":
                router.push("/");
                break;
              default:
                router.push("/");
            }
          }, 3000);
        } else {
          setAlertMessage(result.message);
          setAlertColor("danger");
          setShowAlert(true);
        }
      } catch (error) {
        console.error("Login error:", error);
        setAlertMessage("Đăng nhập thất bại!");
        setAlertColor("danger");
        setShowAlert(true);
      } finally {
        setProcessing(false);
        setSubmitting(false);
      }
    },
  });

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      showAlertMsg("Không lấy được idToken!", "danger");
      return;
    }

    try {
      const result = await loginWithGoogle(idToken);

      if (result.isSuccess) {
        setAlertMessage(result.message);
        setAlertColor("success");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
        setTimeout(() => {
          switch (result.data.user?.roleName) {
            case "Admin":
              router.push("/admin/dashboard");
              break;
            case "Staff":
              router.push("/staff/dashboard");
              break;
            case "Renter":
              router.push("/");
              break;
            default:
              router.push("/");
          }
        }, 3000);
      } else {
        setAlertMessage(result.message);
        setAlertColor("danger");
        setShowAlert(true);
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const msg =
        apiError.response?.data?.message ||
        apiError.message ||
        "Đăng nhập Google thất bại!";
      showAlertMsg(msg, "danger");
    }
  };

  const showAlertMsg = (msg: string, color: "success" | "danger") => {
    setAlertMessage(msg);
    setAlertColor(color);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-12 bg-green-100 dark:bg-gray-900">
      <div className="flex w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-16 bg-gray-50 dark:bg-gray-800">
          <div className="w-full max-w-xl">
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
                  <Alert
                    hideIconWrapper
                    color={alertColor}
                    className="shadow-lg" 
                  >
                    {alertMessage}
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="bg-white rounded-2xl shadow-xl p-12 dark:bg-gray-900"
            >
              <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
                Đăng nhập
              </h1>
              <p className="text-gray-500 text-center mb-8 text-base dark:text-gray-400">
                Chào mừng bạn trở lại
              </p>
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-6">
                  <Input
                    label="Email"
                    value={formik.values.email}
                    onValueChange={(value) =>
                      formik.setFieldValue("email", value)
                    }
                    isInvalid={!!formik.errors.email && formik.touched.email}
                    errorMessage={formik.errors.email}
                    onBlur={() => formik.setFieldTouched("email")}
                    autoComplete="email"
                    size="lg"
                    variant="bordered"
                    classNames={{
                      input: "text-lg",
                      inputWrapper: "h-16",
                      label:
                        "text-lg font-medium text-gray-900 dark:text-gray-100",
                    }}
                  />
                  <Input
                    className="relative"
                    label="Mật khẩu"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onValueChange={(value) =>
                      formik.setFieldValue("password", value)
                    }
                    isInvalid={
                      !!formik.errors.password && formik.touched.password
                    }
                    errorMessage={formik.errors.password}
                    onBlur={() => formik.setFieldTouched("password")}
                    autoComplete="current-password"
                    size="lg"
                    variant="bordered"
                    classNames={{
                      input: "text-lg",
                      inputWrapper: "h-16",
                      label:
                        "text-lg font-medium text-gray-900 dark:text-gray-100",
                    }}
                    endContent={
                      <EyeIcon
                        className={`cursor-pointer absolute right-6 top-1/2 transform -translate-y-1/2 ${
                          showPassword
                            ? "text-green-600"
                            : "text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-600"
                        }`}
                        size={20}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    }
                  />
                  {processing ? (
                    <MyButton
                      isDisabled={true}
                      kind="green"
                      size="lg"
                      shape="pill"
                      className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white dark:from-green-600 dark:to-green-700 hover:brightness-105 active:brightness-90 transition-all duration-200 dark:text-gray-100"
                    >
                      Đang Đăng Nhập...
                    </MyButton>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MyButton
                        type="submit"
                        isLoading={formik.isSubmitting}
                        isDisabled={
                          !formik.isValid ||
                          !formik.values.email ||
                          !formik.values.password
                        }
                        kind="green"
                        size="lg"
                        shape="pill"
                        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white dark:from-green-600 dark:to-green-700 hover:brightness-105 active:brightness-90 transition-all duration-200 dark:text-gray-100"
                      >
                        Đăng nhập
                      </MyButton>
                    </motion.div>
                  )}
                  <div className="text-center mt-2">
                    <Link
                      href="#"
                      className="text-green-700 hover:text-green-900 text-sm dark:text-green-400 dark:hover:text-green-600 font-medium"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                </div>
              </form>
              <div className="flex items-center gap-4 my-6">
                <Divider className="flex-1" />
                <span className="text-gray-400 text-sm dark:text-gray-400">
                  hoặc
                </span>
                <Divider className="flex-1" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1 dark:text-gray-300">
                  <AnimatePresence>
                    {googleLoading ? (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                      >
                        <MyButton
                          isLoading
                          isDisabled
                          kind="green"
                          className="w-full h-11 text-base border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:brightness-95 active:brightness-90 transition-all duration-200 px-3"
                          size="lg"
                          shape="square"
                          variantKind="outline"
                        >
                          Đang đăng nhập Google...
                        </MyButton>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <GoogleLogin
                          onSuccess={handleGoogleLogin}
                          onError={() =>
                            showAlertMsg("Lỗi đăng nhập Google!", "danger")
                          }
                          theme="outline"
                          size="large"
                          text="signin_with"
                          shape="rectangular"
                          logo_alignment="left"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="text-center mt-6">
                <span className="text-gray-600 text-sm dark:text-gray-400">
                  Chưa có tài khoản?{" "}
                </span>
                <Link
                  href="/auth/sign-up"
                  className="text-green-700 hover:text-green-900 text-sm font-medium dark:text-green-400 dark:hover:text-green-600"
                >
                  Đăng ký
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="flex-1 bg-green-600 flex items-center justify-center p-20 dark:bg-green-700">
          <div className="text-center">
            <h2 className="text-white text-4xl font-bold mb-6 dark:text-green-100">
              Chào mừng trở lại!
            </h2>
            <p className="text-green-100 text-lg max-w-xl mx-auto dark:text-green-200">
              Đăng nhập để tiếp tục sử dụng dịch vụ của chúng tôi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
