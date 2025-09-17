"use client";
import React, { useState } from "react";
import { Alert, Button, Input } from "@heroui/react";
import {  EyeIcon } from "@phosphor-icons/react";
import { useFormik } from "formik";
import * as Yup from "yup";


export function SignUp() {
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
  return (
    <div>
        {showAlert && (
            <Alert color="success" className="mb-4">Đăng ký thành công!</Alert>
        )}
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-primary text-center mb-2">Đăng ký</h2>
            <Input label = "Email" value = {formik.values.email}
                onValueChange = {(value) => formik.setFieldValue("email", value)}
                isInvalid={
                    !!formik.errors.email
                    && formik.touched.email
                }
                errorMessage={formik.errors.email}
                onBlur={() => {
                    formik.setFieldTouched("email");
                }}
               />
            <Input label = "Mật khẩu" type = {showPassword ? "text" : "password"} value = {formik.values.password}
                onValueChange={(value) => formik.setFieldValue("password", value)}
                isInvalid={
                    !!formik.errors.password
                    && formik.touched.password
                }
                errorMessage={formik.errors.password}
                onBlur={() => {
                    formik.setFieldTouched("password");
                }}
                autoComplete="new-password"
                endContent={
                    <EyeIcon size={20} onClick={() => setShowPassword(!showPassword)} />
                } />
            <Button isLoading={formik.isSubmitting} isDisabled={!formik.isValid} onPress={() => formik.submitForm()}  size="md">Đăng ký</Button>
        </div>
    </div>
  );
}
