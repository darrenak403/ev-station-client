"use client";
import React, { useState } from "react";
import { Input } from "@heroui/react";
import {MyButton} from "@/components";
import { Alert } from "@heroui/react";
import { postMutationFetcher } from "@/lib/fetcher";

interface IdentityCardData {
  cardNumber: string;
  fullName: string;
  sex: string;
  nationality: string;
  dateOfBirth: string;
  placeOfOrigin: string;
  placeOfResidence: string;
  createDate: string;
  dayOfExpiry: string;
}

interface IdentityCardScanResponse {
  isSuccess: boolean;
  data: IdentityCardData;
}

export function Footer() {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState<IdentityCardData | null>(null);
  const [error, setError] = useState("");
  
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "EV-Station");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dcmms8d19/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    console.log("Cloudinary response:", data);
    console.log("Secure URL:", data.secure_url);
    return data.secure_url;
  };

  const handleUploadAndScan = async () => {
    setError("");
    setLoading(true);
    setCardData(null);
    try {
      if (!frontImage || !backImage) {
        setError("Vui lòng chọn đủ 2 ảnh!");
        setLoading(false);
        return;
      }
      
      // Gọi API scan trước với file trực tiếp
      const formData = new FormData();
      formData.append("frontImage", frontImage);
      formData.append("backImage", backImage);
      
      const scanRes = await postMutationFetcher<
        IdentityCardScanResponse,
        FormData
      >("/api/v1/identity-cards/scan-url", {
        arg: formData,
      });
      
      // Kiểm tra isSuccess
      if (scanRes.isSuccess) {
        // Upload lên Cloudinary sau khi scan thành công
        const [frontUrl, backUrl] = await Promise.all([
          uploadToCloudinary(frontImage),
          uploadToCloudinary(backImage),
        ]);
        console.log("Front URL:", frontUrl);
        console.log("Back URL:", backUrl);
        
        // Hiển thị dữ liệu
        setCardData(scanRes.data);
      } else {
        setError("Quét thông tin thất bại!");
      }
    } catch (error) {
      console.error(error);
      setError("Có lỗi xảy ra, vui lòng thử lại!");
    }
    setLoading(false);
  };

  function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const date = dateStr.split("T")[0];
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Quét CCCD</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <div className="mb-4">
        <label className="block mb-1">Ảnh mặt trước</label>
        <Input
          type="file"
          accept="image/*"
          onChange={e => setFrontImage(e.target.files?.[0] || null)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Ảnh mặt sau</label>
        <Input
          type="file"
          accept="image/*"
          onChange={e => setBackImage(e.target.files?.[0] || null)}
        />
      </div>
      <MyButton
        isLoading={loading}
        isDisabled={!frontImage || !backImage}
        onPress={handleUploadAndScan}
        kind="primary"
        className="w-full"
      >
        Quét thông tin
      </MyButton>
      {cardData && (
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <div><b>Số thẻ:</b> {cardData.cardNumber}</div>
          <div><b>Họ tên:</b> {cardData.fullName}</div>
          <div><b>Giới tính:</b> {cardData.sex}</div>
          <div><b>Quốc tịch:</b> {cardData.nationality}</div>
          <div><b>Ngày sinh:</b> {formatDate(cardData.dateOfBirth)}</div>
          <div><b>Nguyên quán:</b> {cardData.placeOfOrigin}</div>
          <div><b>Nơi cư trú:</b> {cardData.placeOfResidence}</div>
          <div><b>Ngày cấp:</b> {formatDate(cardData.createDate)}</div>
          <div><b>Ngày hết hạn:</b> {formatDate(cardData.dayOfExpiry)}</div>
        </div>
      )}
    </div>
  );
}
