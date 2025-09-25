"use client";
import React, { useState } from "react";
import { Alert, Input } from "@heroui/react";
import { EyeIcon } from "@phosphor-icons/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MyButton } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFetchRegisterSwrSingleton } from "@/hook/singleton/swrs/useFetchRegisterSwr";

export function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState<"success" | "danger">("success");
  const { register, loading } = useFetchRegisterSwrSingleton();

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
        const result = await register({
          email: values.email,
          password: values.password,
        });
        if (result.isSuccess) {
          setAlertMessage(result.message);
          setAlertColor("success");
          setShowAlert(true);
          setTimeout(() => {
            router.push("/auth/sign-in");
          }, 1500);
        } else {
          setAlertMessage(result.message || "Đăng ký thất bại!");
          setAlertColor("danger");
          setShowAlert(true);
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
    <div className="min-h-screen flex items-center justify-center p-12 bg-green-100">
      <div className="flex w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-16 bg-gray-50">
          <div className="w-full max-w-xl">
            {showAlert && (
              <Alert
                hideIconWrapper
                color={alertColor}
                className="fixed top-4 right-4 z-50 w-auto max-w-md"
              >
                {alertMessage}
              </Alert>
            )}

            <div className="bg-white rounded-2xl shadow-xl p-12">
              <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
                Đăng ký
              </h1>
              <p className="text-gray-500 text-center mb-8 text-base">
                Chào mừng bạn đến với chúng tôi
              </p>

              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-6">
                  <Input
                    label="Email"
                    value={formik.values.email}
                    onValueChange={(value) => formik.setFieldValue("email", value)}
                    isInvalid={!!formik.errors.email && formik.touched.email}
                    errorMessage={formik.errors.email}
                    onBlur={() => formik.setFieldTouched("email")}
                    autoComplete="email"
                    size="lg"
                    variant="bordered"
                    classNames={{
                      input: "text-lg",
                      inputWrapper: "h-16",
                    }}
                  />

                  <Input
                    className="relative"
                    label="Mật khẩu"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onValueChange={(value) => formik.setFieldValue("password", value)}
                    isInvalid={!!formik.errors.password && formik.touched.password}
                    errorMessage={formik.errors.password}
                    onBlur={() => formik.setFieldTouched("password")}
                    autoComplete="new-password"
                    size="lg"
                    variant="bordered"
                    classNames={{
                      input: "text-lg",
                      inputWrapper: "h-16",
                    }}
                    endContent={
                      <EyeIcon
                        className={`cursor-pointer absolute right-6 top-1/2 transform -translate-y-1/2 ${
                          showPassword ? "text-green-600" : "text-gray-400 hover:text-gray-600"
                        }`}
                        size={20}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    }
                  />

                  <Input
                    className="relative"
                    label="Xác nhận mật khẩu"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.confirmPassword}
                    onValueChange={(value) => formik.setFieldValue("confirmPassword", value)}
                    isInvalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
                    errorMessage={formik.errors.confirmPassword}
                    onBlur={() => formik.setFieldTouched("confirmPassword")}
                    autoComplete="new-password"
                    size="lg"
                    variant="bordered"
                    classNames={{
                      input: "text-lg",
                      inputWrapper: "h-16",
                    }}
                    endContent={
                      <EyeIcon
                        className={`cursor-pointer absolute right-6 top-1/2 transform -translate-y-1/2 ${
                          showPassword ? "text-green-600" : "text-gray-400 hover:text-gray-600"
                        }`}
                        size={20}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    }
                  />

                  <MyButton
                    isLoading={formik.isSubmitting || loading}
                    isDisabled={
                      !formik.isValid ||
                      !formik.values.email ||
                      !formik.values.password ||
                      !formik.values.confirmPassword
                    }
                    onPress={() => formik.submitForm()}
                    kind="green"
                    size="lg"
                    shape="pill"
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white"
                  >
                    Đăng ký
                  </MyButton>

                  <div className="text-center mt-2">
                    <span className="text-gray-600 text-sm">Đã có tài khoản?{" "}</span>
                    <Link href="/auth/sign-in" className="text-green-700 hover:text-green-900 text-sm font-medium">
                      Đăng nhập
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-green-600 flex items-center justify-center p-20">
          <div className="text-center">
            <h2 className="text-white text-4xl font-bold mb-6">Chào mừng!</h2>
            <p className="text-green-100 text-lg max-w-xl mx-auto">
              Đăng ký để tiếp tục sử dụng dịch vụ của chúng tôi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
