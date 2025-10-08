"use client";
import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import {
  useFetchUpdateProfileSwrSingleton,
  useFetchUploadImgSingleton,
  useUpdateAvatarDisclosureSingleton,
} from "@/hook";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider,
} from "@heroui/react";
import getCroppedImg from "@/libs/CropImage";
import { MyButton } from "@/components/styled/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { showToast } from "@/libs";

export const UpdateAvatarModal = () => {
  const { onClose, isOpen } = useUpdateAvatarDisclosureSingleton();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [loading, setLoading] = useState(false);

  const { uploadImage } = useFetchUploadImgSingleton();
  const { updateProfile } = useFetchUpdateProfileSwrSingleton();

  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.data?.user;

  const readFile = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl as string);
    }
  };

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      setLoading(true);
      const croppedImageFile = await getCroppedImg(imageSrc, croppedAreaPixels);
      const url = await uploadImage(croppedImageFile!);
      const response = await updateProfile(
        {
          email: user?.email || "",
          fullName: user?.fullName || "",
          avatarUrl: url || "",
        },
        user?.id || ""
      );
      if (response.isSuccess) {
        showToast("Cập nhật ảnh đại diện thành công", "success");
        handleClose();
      } else {
        showToast("Cập nhật ảnh đại diện thất bại", "error");
      }
    } catch (e) {
      console.error(e.data?.message || "Cập nhật ảnh đại diện thất bại", e);
      showToast("Cập nhật ảnh đại diện thất bại", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setImageSrc(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    onClose();
  };

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={handleClose}
      size="xl"
    >
      <ModalContent>
        <ModalHeader>Cập nhật ảnh đại diện</ModalHeader>
        <ModalBody>
          <div className="flex flex-col items-center gap-4">
            <input
              type="file"
              onChange={onFileChange}
              accept="image/*"
              className="hidden"
              id="avatar-upload-input"
            />
            <label htmlFor="avatar-upload-input" className="">
              <MyButton as="span" kind="green" shape="pill">
                Chọn ảnh từ máy tính
              </MyButton>
            </label>
            <>
              <div className="relative w-full h-80 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  cropShape="round"
                  showGrid={false}
                />
              </div>
              <div className="w-full max-w-xs flex flex-col gap-2">
                <label className="text-sm">Phóng to</label>
                <Slider
                  value={zoom}
                  onChange={setZoom}
                  minValue={1}
                  maxValue={3}
                  step={0.1}
                  aria-label="Zoom"
                />
              </div>
            </>
          </div>
        </ModalBody>
        <ModalFooter>
          <MyButton kind="gray" shape="pill" onClick={handleClose}>
            Hủy
          </MyButton>
          <MyButton
            kind="green"
            shape="pill"
            onClick={handleSave}
            isDisabled={!imageSrc}
            isLoading={loading}
          >
            Cập nhật
          </MyButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateAvatarModal;
