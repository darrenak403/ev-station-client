"use client";
import Link from "next/link";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { ThemeToggle } from "../../modules/SwithTheme/theme-toggle";
import { MyButton } from "../../styled";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";

export function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // ✅ Lấy auth state từ Redux
  const authState = useSelector((state: RootState) => state.auth);
  const isLoggedIn = !!(authState.accessToken || authState.refreshToken);
  const userId = authState.data?.user?.id;
  const userRole = authState.data?.user?.roleName;
  const userFullName = authState.data?.user?.fullName;

  console.log("Header - Auth Info:", {
    isLoggedIn,
    userId,
    userRole,
    userFullName,
  });

  const handleLogout = () => {
    dispatch(clearAuth());
    router.push("/auth/sign-in");
  };

  return (
    <Navbar isBordered className="bg-background/95 backdrop-blur">
      <NavbarContent>
        <NavbarBrand>
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <span className="text-xl font-bold text-white">E</span>
            </div>
            <span className="text-xl font-bold text-primary">EcoRide</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-6" justify="center">
        <NavbarItem>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Trạm thuê
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Xe điện
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Cách thức
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Giá cả
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <MyButton 
            href="#" 
            kind="primary"
            size="sm"
            variantKind="outline"
            shape="pill"
          >
            Tìm trạm
          </MyButton>
        </NavbarItem>
        
        {isLoggedIn ? (
          <>
            {/* Hiển thị tên user nếu có */}
            {userFullName && (
              <NavbarItem className="hidden md:flex">
                <span className="text-sm text-foreground-600">
                  Xin chào, {userFullName}
                </span>
              </NavbarItem>
            )}
            
            {/* Nút profile theo role */}
            <NavbarItem className="hidden md:flex">
              <Link href={
                userRole === "Admin" ? "/admin/dashboard" :
                userRole === "Teacher" ? "/teacher" :
                userRole === "Renter" ? "/user/profile" :
                "/"
              }>
                <MyButton 
                  kind="primary"
                  size="sm"
                  variantKind="outline"
                  shape="pill"
                >
                  Profile
                </MyButton>
              </Link>
            </NavbarItem>
            
            {/* Nút logout */}
            <NavbarItem>
              <MyButton 
                variant="bordered" 
                size="sm" 
                onPress={handleLogout}
                kind="red"
                shape="pill"
                variantKind="solid"
              >
                Đăng xuất
              </MyButton>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Link href="/auth/sign-in">
              <MyButton as="button" kind="primary" size="sm" shape="pill" variantKind="solid">
                Đăng nhập
              </MyButton>
            </Link>
          </NavbarItem>
        )}
        
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
        <NavbarMenuToggle className="md:hidden" />
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="#stations" className="w-full">
            Trạm thuê
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#vehicles" className="w-full">
            Xe điện
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#how-it-works" className="w-full">
            Cách thức
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#pricing" className="w-full">
            Giá cả
          </Link>
        </NavbarMenuItem>
        
        {/* Mobile menu */}
        <NavbarMenuItem>
          {isLoggedIn ? (
            <>
              {userFullName && (
                <div className="text-sm text-foreground-600 mb-2">
                  Xin chào, {userFullName}
                </div>
              )}
              <Link href={
                userRole === "Admin" ? "/admin/dashboard" :
                userRole === "Teacher" ? "/teacher" :
                userRole === "Renter" ? "/user/profile" :
                "/"
              } className="w-full mb-2 block">
                <MyButton as="button" variant="bordered" size="sm" kind="primary" className="w-full">
                  Profile
                </MyButton>
              </Link>
              <MyButton 
                variant="bordered" 
                size="sm" 
                onPress={handleLogout}
                className="w-full"
                kind="red"
              >
                Đăng xuất
              </MyButton>
            </>
          ) : (
            <Link href="/auth/sign-in" className="w-full">
              <MyButton as="a" variant="bordered" size="sm" kind="primary" className="w-full">
                Đăng nhập
              </MyButton>
            </Link>
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
