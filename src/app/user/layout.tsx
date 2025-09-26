import {Header, Footer} from "@/components";
import React from "react";
import ProtectedRoute from "@/lib/ProtectedRoute";

const UserLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <Header />
      <ProtectedRoute allowedRoles={["Renter"]}>
        <main>{children}</main>
      </ProtectedRoute>
      <Footer />
    </div>
  );
};

export default UserLayout;
