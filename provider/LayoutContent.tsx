"use client";

import { Footer, Header } from "@/components";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/auth/sign-in" || pathname === "/auth/sign-up";
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.data?.user;
  const role = user?.roleName;
  const isLoggedIn = !!authState.accessToken;

  const showFooter =
    !isAuthPage &&
    ((!isLoggedIn && pathname === "/") || (isLoggedIn && role === "Renter"));

  return (
    <div className=" ">
      {!isAuthPage && <Header />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
