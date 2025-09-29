"use client";

import CreateUserModal from "./ManageAccount/CreateUser";
import DetailsUserModal from "./ManageAccount/DetailsUser";
import UpdateUserModal from "./ManageAccount/UpdateUser";

export default function ModalsRoot() {
  // chỉ render modal; modals dùng disclosure singleton bên trong
  return (
    <>
      <CreateUserModal />
      <DetailsUserModal />
      <UpdateUserModal />
    </>
  );
}
