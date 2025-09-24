"use client";
import React from 'react'
import { useAppSelector } from '@/redux/hooks';

export default function AdminDashboardPage() {
  const fullName = useAppSelector((state) => state.auth.data?.user?.fullName);

  return (
    <div>Welcome to the admin dashboard, {fullName}!</div>
  )
}

