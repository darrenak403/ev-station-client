"use client";
import React, { useState } from "react";
import { Input } from "@heroui/react";
import { MyButton } from "@/components";
import { Alert } from "@heroui/react";
import { postMutationFetcher } from "@/lib/fetcher";
import { useAppSelector } from "@/redux/hooks";

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
  message?: string;
}

export default function ProfilePage() {
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const userRole = useAppSelector((state) => state.auth.data?.user?.roleName);
  const userId = useAppSelector((state) => state.auth.data?.user?.id);
  const fullName = useAppSelector((state) => state.auth.data?.user?.fullName);

  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState<IdentityCardData | null>(null);
  const [error, setError] = useState("");

  const uploadToCloudinary = async (file: File, folder = ""): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "EV-Station");
    if (folder) formData.append("folder", folder);
    const res = await fetch("https://api.cloudinary.com/v1_1/dcmms8d19/image/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload to Cloudinary failed");
    const data = await res.json();
    return data.secure_url;
  };

  const handleUploadAndScan = async () => {
    setError("");
    setLoading(true);
    setCardData(null);

    try {
      if (!accessToken) {
        if (refreshToken) setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        return;
      }

      if (userRole !== "Renter") {
        setError("Bạn không có quyền sử dụng chức năng quét CCCD. Vui lòng liên hệ admin!");
        return;
      }

      if (!frontImage || !backImage) {
        setError("Vui lòng chọn đủ 2 ảnh!");
        return;
      }

      const folderName = userId ? `user-${userId}` : "temp";
      const [frontUrl, backUrl] = await Promise.all([
        uploadToCloudinary(frontImage, folderName),
        uploadToCloudinary(backImage, folderName),
      ]);

      console.log("Uploaded to Cloudinary:", { frontUrl, backUrl });

      const payload = {
        frontImageUrl: frontUrl,
        backImageUrl: backUrl,
      };

      const scanRes = await postMutationFetcher<IdentityCardScanResponse, typeof payload>(
        "/api/v1/identity-cards/scan-url",
        { arg: payload }
      );

      console.log("Scan response:", scanRes);

      if (scanRes.isSuccess) {
        setCardData(scanRes.data);
      } else {
        setError(scanRes.message || "Quét thông tin thất bại!");
      }
    } catch (error) {
      console.error("Scan error:", error);
      setError((error as Error).message || "Đã có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
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

      {/* Debug / info */}
      <div className="mb-3 text-sm text-foreground-500">
        Vai trò: {userRole ?? "Chưa xác định"} {fullName ? `• name: ${fullName}` : ""}
      </div>

      {error && (
        <Alert color="danger" className="mb-4">
          {error}
        </Alert>
      )}

      <div className="mb-4">
        <label className="block mb-1">Ảnh mặt trước</label>
        <Input type="file" accept="image/*" onChange={(e) => setFrontImage(e.target.files?.[0] || null)} />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Ảnh mặt sau</label>
        <Input type="file" accept="image/*" onChange={(e) => setBackImage(e.target.files?.[0] || null)} />
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
