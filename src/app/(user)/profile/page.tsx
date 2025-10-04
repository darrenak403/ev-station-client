"use client";
import React from "react";
import { AccountInfo, IdentifyCard } from "@/components";
import { LicenseDriver } from "@/components/shared/Profile/PersonalInformation/LicenseDriver";

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <AccountInfo />
            <IdentifyCard />
            <LicenseDriver />
        </div>
    )
}