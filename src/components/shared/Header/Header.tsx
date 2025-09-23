"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
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

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if accessToken exists in localStorage
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);
 
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
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
        
        {/* Mobile menu auth button */}
        <NavbarMenuItem>
          {isLoggedIn ? (
            <MyButton 
              variant="bordered" 
              size="sm" 
              onPress={handleLogout}
              className="w-full"
            >
              Đăng xuất
            </MyButton>
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
