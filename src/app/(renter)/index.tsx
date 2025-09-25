import React from 'react'
import ProtectedRoute from "@/libs/ProtectedRoute";

const RenterLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>   
      <ProtectedRoute allowedRoles={["Renter"]}>
        <main>{children}</main>
      </ProtectedRoute>
    </div>
  )
}

export default RenterLayout

