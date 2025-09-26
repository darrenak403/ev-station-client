"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ThemeToggle } from "../../modules/SwithTheme/theme-toggle";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const authState = useSelector((state: RootState) => state.auth);
  const accessToken = authState.accessToken;
  const isLoggedIn = !!accessToken;
  const user = authState.data?.user;
  const avatarUrl = user?.avatarUrl;
  const role = user?.roleName;

  const goProfile = () => router.push("/profile");

  const [accountOpen, setAccountOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const panelMotion = {
    initial: { opacity: 0, y: -6, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -6, scale: 0.98 },
    transition: { duration: 0.14 },
  };

  // helper to mark active links
  const isActive = (href: string) => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return (
      pathname === href ||
      pathname.startsWith(href + "/") ||
      pathname.startsWith(href)
    );
  };

  const baseLinkClass =
    "font-semibold text-1xl text-foreground-600 hover:text-green-600";
  const baseLinkClassSm =
    "font-semibold text-sm text-foreground-600 hover:text-green-600";
  const activeClass = (sizeClass: string) =>
    sizeClass
      .replace("text-foreground-600", "text-green-600")
      .replace("hover:text-green-600", "text-green-600");

  return (
    <Navbar
      isBordered
      className="bg-white/95 backdrop-blur py-0 px-6 dark:bg-slate-900"
    >
      {role !== "Admin" && role !== "Staff" && (
        <NavbarContent justify="start" className="pl-0">
          <NavbarBrand>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-500">
                <span className="text-lg font-bold text-white">T</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-semibold text-foreground">
                  THDV-Booking
                </span>
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>
      )}

      {role !== "Staff" && role !== "Admin" && (
        <NavbarContent justify="center" className="ml-30 flex gap-6">
          <NavbarItem>
            <Link href="/info/aboutUs" className="relative">
              <motion.span
                className={
                  isActive("/info/aboutUs")
                    ? activeClass(baseLinkClass)
                    : baseLinkClass
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Về Chúng Tôi
              </motion.span>
              <AnimatePresence>
                {isActive("/info/aboutUs") && (
                  <motion.span
                    layoutId="header-underline"
                    className="absolute left-0 right-0 bottom-[-6px] h-1 rounded-full bg-green-600"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/info/contact" className="relative">
              <motion.span
                className={
                  isActive("/info/contact")
                    ? activeClass(baseLinkClass)
                    : baseLinkClass
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Liên Hệ
              </motion.span>
              <AnimatePresence>
                {isActive("/info/contact") && (
                  <motion.span
                    layoutId="header-underline"
                    className="absolute left-0 right-0 bottom-[-6px] h-1 rounded-full bg-green-600"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          </NavbarItem>
          {!isLoggedIn && <NavbarItem>|</NavbarItem>}

          {isLoggedIn && (
            <>
              <NavbarItem>
                <Link href="/bookingCar" className="relative">
                  <motion.span
                    className={
                      isActive("/bookingCar")
                        ? activeClass(baseLinkClass)
                        : baseLinkClass
                    }
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  >
                    Đặt Xe
                  </motion.span>
                  <AnimatePresence>
                    {isActive("/bookingCar") && (
                      <motion.span
                        layoutId="header-underline"
                        className="absolute left-0 right-0 bottom-[-6px] h-1 rounded-full bg-green-600"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/historyBooking" className="relative">
                  <motion.span
                    className={
                      isActive("/historyBooking")
                        ? activeClass(baseLinkClass)
                        : baseLinkClass
                    }
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  >
                    Chuyến Xe Của Tôi
                  </motion.span>
                  <AnimatePresence>
                    {isActive("/historyBooking") && (
                      <motion.span
                        layoutId="header-underline"
                        className="absolute left-0 right-0 bottom-[-6px] h-1 rounded-full bg-green-600"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              </NavbarItem>
              <NavbarItem className="ml-10">|</NavbarItem>
            </>
          )}
        </NavbarContent>
      )}
      {role === "Staff" && isLoggedIn && (
        <NavbarContent justify="center" className="flex gap-10">
          <NavbarItem>
            <Link href="/staff/dashboard" className="relative">
              <motion.span
                className={
                  isActive("/staff/dashboard")
                    ? activeClass(baseLinkClass)
                    : baseLinkClass
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Thống Kê
              </motion.span>
              <AnimatePresence>
                {isActive("/staff/dashboard") && (
                  <motion.span
                    layoutId="header-underline"
                    className="absolute left-0 right-0 bottom-[-6px] h-1 rounded-full bg-green-600"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link href="/staff/verifyCustomer" className="relative">
              <motion.span
                className={
                  isActive("/staff/verifyCustomer")
                    ? activeClass(baseLinkClass)
                    : baseLinkClass
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Xác Thực KH
              </motion.span>
              <AnimatePresence>
                {isActive("/staff/verifyCustomer") && (
                  <motion.span
                    layoutId="header-underline"
                    className="absolute left-0 right-0 bottom-[-6px] h-1 rounded-full bg-green-600"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link href="/staff/stationCar" className="relative">
              <motion.span
                className={
                  isActive("/staff/stationCar")
                    ? activeClass(baseLinkClass)
                    : baseLinkClass
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Quản Lý Xe Tại Điểm
              </motion.span>
              <AnimatePresence>
                {isActive("/staff/stationCar") && (
                  <motion.span
                    layoutId="header-underline"
                    className="absolute left-0 right-0 bottom-[-6px] h-1 rounded-full bg-green-600"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link href="/staff/handovers" className="relative">
              <motion.span
                className={
                  isActive("/staff/handovers")
                    ? activeClass(baseLinkClass)
                    : baseLinkClass
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Giao - Nhận Xe
              </motion.span>
              <AnimatePresence>
                {isActive("/staff/handovers") && (
                  <motion.span
                    layoutId="header-underline"
                    className="absolute left-0 right-0 bottom-[-6px] h-1 rounded-full bg-green-600"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link href="/staff/payments" className="relative">
              <motion.span
                className={
                  isActive("/staff/payments")
                    ? activeClass(baseLinkClass)
                    : baseLinkClass
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Quản Lý Thanh Toán
              </motion.span>
              <AnimatePresence>
                {isActive("/staff/payments") && (
                  <motion.span
                    layoutId="header-underline"
                    className="absolute left-0 right-0 bottom-[-6px] h-1 rounded-full bg-green-600"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          </NavbarItem>

          <NavbarItem > |</NavbarItem>
        </NavbarContent>
      )}

      {role === "Admin" && isLoggedIn && (
        <NavbarContent justify="center" className="flex gap-10">
          <NavbarItem className="justify-center">
            <Link href="/admin/dashboard" className="relative">
              <motion.span
                className={
                  isActive("/admin/dashboard")
                    ? activeClass(baseLinkClass)
                    : baseLinkClass
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Thống Kê
              </motion.span>
              <AnimatePresence>
                {isActive("/admin/dashboard") && (
                  <motion.span
                    layoutId="header-underline"
                    className="absolute left-0 right-0 bottom-[-6px] h-1 rounded-full bg-green-600"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/admin/manageAccount" className="relative">
              <motion.span
                className={
                  isActive("/admin/manageAccount")
                    ? activeClass(baseLinkClass)
                    : baseLinkClass
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Quản Lý Tài Khoản
              </motion.span>
              <AnimatePresence>
                {isActive("/admin/manageAccount") && (
                  <motion.span
                    layoutId="header-underline"
                    className="absolute left-0 right-0 bottom-[-6px] h-1 rounded-full bg-green-600"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/admin/fleet" className="relative">
              <motion.span
                className={
                  isActive("/admin/fleet")
                    ? activeClass(baseLinkClass)
                    : baseLinkClass
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Quản Lý Xe & Điểm Thuê
              </motion.span>
              <AnimatePresence>
                {isActive("/admin/fleet") && (
                  <motion.span
                    layoutId="header-underline"
                    className="absolute left-0 right-0 bottom-[-6px] h-1 rounded-full bg-green-600"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/admin/forcast" className="relative">
              <motion.span
                className={
                  isActive("/admin/forcast")
                    ? activeClass(baseLinkClass)
                    : baseLinkClass
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Gợi ý nâng cấp đội xe bằng AI
              </motion.span>
              <AnimatePresence>
                {isActive("/admin/forcast") && (
                  <motion.span
                    layoutId="header-underline"
                    className="absolute left-0 right-0 bottom-[-6px] h-1 rounded-full bg-green-600"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          </NavbarItem>

          <NavbarItem> |</NavbarItem>
        </NavbarContent>
      )}

      {/* right area */}
      <NavbarContent justify="end" className="flex gap-4 items-center ml-5">
        {!isLoggedIn ? (
          <>
            <NavbarItem>
              <Link
                href="/auth/sign-up"
                className={
                  isActive("/auth/sign-up")
                    ? activeClass(baseLinkClassSm)
                    : baseLinkClassSm
                }
              >
                Đăng Ký
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/auth/sign-in">
                <button
                  className={`cursor-pointer font-semibold px-4 py-1 rounded-md border border-foreground-800 text-1xl hover:bg-green-500 hover:text-white transition ${
                    isActive("/auth/sign-in")
                      ? "bg-transparent text-green-600"
                      : ""
                  }`}
                >
                  Đăng nhập
                </button>
              </Link>
            </NavbarItem>
          </>
        ) : (
          <div ref={containerRef} className="flex items-center gap-4">
            <NavbarItem>
              <button
                aria-label="Notifications"
                onClick={() => {
                  setNotifOpen((s) => !s);
                  setAccountOpen(false);
                }}
                className="cursor-pointer p-2 rounded-md relative "
                title="Thông báo"
              >
                <Icon icon="mdi:bell-outline" width="30" height="30" />
                <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium leading-none text-white bg-red-500 rounded-full">
                  3
                </span>
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    {...panelMotion}
                    key="notif"
                    className="absolute right-5 mt-0 w-80 bg-white shadow-lg rounded-md border z-50 dark:bg-slate-800 dark:border-slate-700"
                  >
                    <div className="p-3 border-b">
                      <div className="font-medium">Thông báo</div>
                    </div>
                    <div className="max-h-64 overflow-auto">
                      <div className="p-3 hover:bg-gray-50 cursor-pointer dark:hover:bg-slate-700">
                        Không có thông báo mới
                      </div>
                    </div>
                    <div className="p-2 border-t text-center">
                      <button
                        className="cursor-pointer text-sm text-green-600 hover:underline dark:text-green-400 font-medium"
                        onClick={() => {
                          setNotifOpen(false);
                          router.push("/notifications");
                        }}
                      >
                        Xem tất cả
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </NavbarItem>

            <NavbarItem>
              <div className="flex items-center gap-2 relative">
                <motion.button
                  onClick={() => {
                    setAccountOpen((s) => !s);
                    setNotifOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-md p-2 w-12"
                  title="Tài khoản"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt="avatar"
                      width={48}
                      height={48}
                      className="rounded-full cursor-pointer absolute"
                    />
                  ) : (
                    <div className="rounded-full cursor-pointer absolute h-12 w-12 bg-green-500 flex items-center justify-center text-white font-medium">
                      {user?.fullName?.split(" ").slice(-1)[0]?.[0] ?? "U"}
                    </div>
                  )}

                  <motion.span
                    className="relative cursor-pointer inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-100 border border-gray-200 text-gray-600 top-4 left-8"
                    animate={{ rotate: accountOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <Icon icon="mdi:chevron-down" width="18" height="18" />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {accountOpen && (
                    <motion.div
                      {...panelMotion}
                      key="account"
                      className="absolute right-0 top-full mt-2 w-64 bg-white shadow-lg rounded-md border z-50 dark:bg-slate-800 dark:border-slate-700"
                    >
                      <div className="flex items-center gap-3 p-3 border-b">
                        {avatarUrl ? (
                          <Image
                            src={avatarUrl}
                            alt="avatar"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
                            {user?.fullName?.split(" ").slice(-1)[0]?.[0] ??
                              "U"}
                          </div>
                        )}
                        <div className="flex flex-col min-w-0">
                          <span className="text-md font-semibold truncate">
                            Hi, {user?.fullName?.split(" ")[0] ?? "User"}!
                          </span>
                          <span className="text-sm text-foreground-500 truncate">
                            {user?.email}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col p-2 gap-1">
                        <motion.button
                          onClick={() => {
                            setAccountOpen(false);
                            goProfile();
                          }}
                          className="cursor-pointer flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 text-1xl dark:text-white dark:hover:bg-slate-700"
                          aria-label="Trang cá nhân"
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <Icon
                            icon="mdi:account-circle-outline"
                            width="18"
                            height="18"
                          />
                          <span>Trang cá nhân</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </NavbarItem>
          </div>
        )}

        <NavbarItem>
          <span className="ml-5">
            <ThemeToggle />
          </span>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
