"use client";
import React, { useState } from "react";
import { Alert, Input, Divider } from "@heroui/react";
import {  EyeIcon, GoogleLogo } from "@phosphor-icons/react";
import { useFormik } from "formik";
import { AppButton } from "@/components";
import Link from "next/link";
import * as Yup from "yup";


export function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    
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
        onSubmit: async() => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
        },
    });

    const handleGoogleLogin = () => {
        console.log("Google login clicked");
    };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 ">
        <div className="flex w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex-1 flex items-center justify-center p-10 bg-gray-50">
                <div className="w-full max-w-md">
                    {showAlert && (
                        <Alert color="success" className="fixed top-16 right-0 z-50 w-auto max-w-sm">
                            Đăng nhập thành công!
                        </Alert>
                    )}
                    
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h1 className="text-2xl font-bold text-center mb-1 text-gray-900">
                            Đăng nhập
                        </h1>
                        <p className="text-gray-500 text-center mb-6 text-sm">
                            Chào mừng bạn trở lại
                        </p>
                        
                        <div className="flex flex-col gap-4">
                           <Input                               
                                label="Email" 
                                value={formik.values.email}
                                onValueChange={(value) => formik.setFieldValue("email", value)}
                                isInvalid={!!formik.errors.email && formik.touched.email}
                                errorMessage={formik.errors.email}
                                onBlur={() => formik.setFieldTouched("email")}
                                size="md"
                                variant="bordered"
                                classNames={{
                                    input: "text-sm",
                                    inputWrapper: "h-12"
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
                                size="md"
                                variant="bordered"
                                classNames={{
                                    input: "text-sm",
                                    inputWrapper: "h-12"
                                }}
                                endContent={
                                    <EyeIcon 
                                        className={`cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 ${showPassword ? "text-blue-500" : "text-gray-400 hover:text-gray-600"}`}
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
                                Đăng nhập
                            </AppButton>
                            
                            <div className="text-center mt-2">
                                <a href="#" className="text-blue-600 hover:text-blue-800 text-xs">
                                    Quên mật khẩu?
                                </a>
                            </div>

                            <div className="flex items-center gap-4 my-4">
                                <Divider className="flex-1" />
                                <span className="text-gray-400 text-xs">hoặc</span>
                                <Divider className="flex-1" />
                            </div>

                            <AppButton
                                kind="secondary"
                                variant="bordered"
                                size="md"
                                className="w-full h-12 text-sm font-medium"
                                startContent={<GoogleLogo size={18} />}
                                onPress={handleGoogleLogin}
                            >
                                Đăng nhập với Google
                            </AppButton>

                            <div className="text-center mt-4">
                                <span className="text-gray-600 text-xs">
                                    Chưa có tài khoản?{" "}
                                </span>
                                <Link href="/auth/sign-up" className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                                    Đăng ký
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex-1 bg-blue-500 flex items-center justify-center p-12">
                <div className="text-center">
                    <h2 className="text-white text-2xl font-bold mb-4">
                        Chào mừng trở lại!
                    </h2>
                    <p className="text-blue-100 text-base max-w-md mx-auto">
                        Đăng nhập để tiếp tục sử dụng dịch vụ của chúng tôi
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}
