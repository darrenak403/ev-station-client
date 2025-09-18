"use client";
import React, { useState } from "react";
import { Alert, Input } from "@heroui/react";
import { EyeIcon } from "@phosphor-icons/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppButton } from "../styled";
import Link from "next/link";
import { postMutationFetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user?: unknown;
  message: string;
  isSuccess: boolean;
}

export function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState<"success" | "danger">("success");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
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
      confirmPassword: Yup.string()
        .required("Xác nhận mật khẩu là bắt buộc")
        .oneOf([Yup.ref("password")], "Mật khẩu không khớp"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await postMutationFetcher<AuthResponse, LoginRequest>(
          "/api/v1/auth/register",
          {
            arg: {
              email: values.email,
              password: values.password,
            },
          }
        );
        console.log(result.message);

        if (result.message === "Email is already in use.") {
          setAlertMessage("Email đã được sử dụng!");
          setAlertColor("danger");
          setShowAlert(true);
          return;
        }

        if (result.isSuccess) {
          //localStorage.setItem("accessToken", result.token);
          setAlertMessage("Đăng ký thành công! Bạn có thể đăng nhập!");
          setAlertColor("success");
          setShowAlert(true);

          setTimeout(() => {
            setShowAlert(false);
            router.push("/auth/sign-in");
          }, 1000);
        }
      } catch (error) {
        console.error("Đăng ký thất bại:", error);
        setAlertMessage("Đăng ký thất bại!");
        setAlertColor("danger");
        setShowAlert(true);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-8 ">
      <div className="flex w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-10 bg-gray-50">
          <div className="w-full max-w-md">
            {showAlert && (
              <Alert
                color={alertColor}
                className="fixed top-16 right-0 z-50 w-auto max-w-sm"
              >
                {alertMessage}
              </Alert>
            )}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h1 className="text-2xl font-bold text-center mb-1 text-gray-900">
                Đăng ký
              </h1>
              <p className="text-gray-500 text-center mb-6 text-sm">
                Chào mừng bạn đến với chúng tôi
              </p>
              <div className="flex flex-col gap-4">
                <Input
                  label="Email"
                  value={formik.values.email}
                  onValueChange={(value) =>
                    formik.setFieldValue("email", value)
                  }
                  isInvalid={!!formik.errors.email && formik.touched.email}
                  errorMessage={formik.errors.email}
                  onBlur={() => formik.setFieldTouched("email")}
                  size="md"
                  variant="bordered"
                  classNames={{
                    input: "text-sm",
                    inputWrapper: "h-12",
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
                  autoComplete="new-password"
                  size="md"
                  variant="bordered"
                  classNames={{
                    input: "text-sm",
                    inputWrapper: "h-12",
                  }}
                  endContent={
                    <EyeIcon
                      className={`cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 ${
                        showPassword
                          ? "text-blue-500"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                      size={18}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  }
                />
                <Input
                  className="relative"
                  label="Xác nhận mật khẩu"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onValueChange={(value) =>
                    formik.setFieldValue("confirmPassword", value)
                  }
                  isInvalid={
                    !!formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                  }
                  errorMessage={formik.errors.confirmPassword}
                  onBlur={() => formik.setFieldTouched("confirmPassword")}
                  autoComplete="new-password"
                  size="md"
                  variant="bordered"
                  classNames={{
                    input: "text-sm",
                    inputWrapper: "h-12",
                  }}
                  endContent={
                    <EyeIcon
                      className={`cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 ${
                        showPassword
                          ? "text-blue-500"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                      size={18}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  }
                />
                <AppButton
                  isLoading={formik.isSubmitting}
                  isDisabled={!formik.isValid}
                  onPress={() => formik.submitForm()}
                  kind="primary"
                  className="w-full mt-3 h-12 text-base font-semibold"
                  size="md"
                >
                  Đăng ký
                </AppButton>
                <div className="text-center mt-4">
                  <span className="text-gray-600 text-xs">
                    Đã có tài khoản?{" "}
                  </span>
                  <Link
                    href="/auth/sign-in"
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                  >
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-blue-500 flex items-center justify-center p-12">
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mb-4">
              Chào mừng bạn!
            </h2>
            <p className="text-blue-100 text-base max-w-md mx-auto">
              Đăng ký để tiếp tục sử dụng dịch vụ của chúng tôi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
