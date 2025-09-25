"use client";
import React from 'react'
import { useAppSelector } from '@/redux/hooks';

export default function StaffDashboard() {
  const fullName = useAppSelector((state) => state.auth.data?.user?.fullName);

  return (
    <div>Welcome to the staff dashboard, {fullName}!</div>
  )
}

