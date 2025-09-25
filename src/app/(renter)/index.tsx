import React from 'react'
import ProtectedRoute from "@/libs/ProtectedRoute";

const UserLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>   
      <ProtectedRoute allowedRoles={["Renter"]}>
        <main>{children}</main>
      </ProtectedRoute>
    </div>
  )
}

export default UserLayout

