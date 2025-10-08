"use client";

import CreateUserModal from "./ManageAccount/CreateUser";
import DetailsUserModal from "./ManageAccount/DetailsUser";
import UpdateUserModal from "./ManageAccount/UpdateUser";
import CreateIdCardModal from "./ManageIDCard/CreateIDCard";
import UpdateIdCardModal from "./ManageIDCard/UpdateIDCard";
import CreateLicenseDriverModal from "./ManageLicenseDriver/CreateLicenseDriver";
import UpdateLicenseDriverModal from "./ManageLicenseDriver/UpdateLicenseDriver";
import UpdateAvatarModal from "./ManageProfile/UpdateAvatar";

export default function ModalsRoot() {
  // chỉ render modal; modals dùng disclosure singleton bên trong
  return (
    <>
      <CreateUserModal />
      <DetailsUserModal />
      <UpdateUserModal />
      <CreateIdCardModal />
      <UpdateIdCardModal />
      <CreateLicenseDriverModal />
      <UpdateLicenseDriverModal />
      <UpdateAvatarModal />
    </>
  );
}
