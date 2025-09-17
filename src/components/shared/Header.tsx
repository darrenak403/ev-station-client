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
import { ThemeToggle } from "../modules/SwithTheme/theme-toggle";
import { AppButton } from "../styled";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if accessToken exists in localStorage
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    window.location.href = "/";
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
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Trạm thuê
          </a>
        </NavbarItem>
        <NavbarItem>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Xe điện
          </a>
        </NavbarItem>
        <NavbarItem>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Cách thức
          </a>
        </NavbarItem>
        <NavbarItem>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Giá cả
          </a>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <AppButton variant="light" size="sm" href="#" kind="secondary">
            Tìm trạm
          </AppButton>
        </NavbarItem>
        
        {isLoggedIn ? (
          <NavbarItem>
            <AppButton 
              variant="bordered" 
              size="sm" 
              kind="third"
              onPress={handleLogout}
            >
              Đăng xuất
            </AppButton>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Link href="/auth/sign-in" passHref>
              <AppButton as="a" variant="bordered" size="sm" kind="primary">
                Đăng nhập
              </AppButton>
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
          <a href="#stations" className="w-full">
            Trạm thuê
          </a>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <a href="#vehicles" className="w-full">
            Xe điện
          </a>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <a href="#how-it-works" className="w-full">
            Cách thức
          </a>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <a href="#pricing" className="w-full">
            Giá cả
          </a>
        </NavbarMenuItem>
        
        {/* Mobile menu auth button */}
        <NavbarMenuItem>
          {isLoggedIn ? (
            <AppButton 
              variant="bordered" 
              size="sm" 
              kind="secondary"
              onPress={handleLogout}
              className="w-full"
            >
              Đăng xuất
            </AppButton>
          ) : (
            <Link href="/auth/sign-in" className="w-full">
              <AppButton as="a" variant="bordered" size="sm" kind="primary" className="w-full">
                Đăng nhập
              </AppButton>
            </Link>
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
