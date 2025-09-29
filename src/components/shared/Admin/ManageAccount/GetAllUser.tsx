"use client";

import React, { JSX, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Spinner,
  Input,
} from "@heroui/react";
import { useFetchGetAllUsersSwrSingleton } from "@/hook/singleton/swrs/fetchManageAccount/useFetchGetAllUsersSwr";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { ApiUser } from "@/hook/singleton/swrs/fetchManageAccount/useFetchGetAllUsersSwr";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "ACTIONS", uid: "actions" },
  { name: "STATUS", uid: "status" },
];

const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M2.5 18.3333H17.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
  </svg>
);

const DeleteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M8.60834 13.75H11.3833"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.91669 10.4167H12.0834"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export default function ManageAccountTable(): JSX.Element {
  const { users, loading, error } = useFetchGetAllUsersSwrSingleton();
  const [query, setQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<
    "all" | "renter" | "staff" | "admin"
  >("all");

  const renderCell = React.useCallback(
    (user: ApiUser, columnKey: string): React.ReactNode => {
      switch (columnKey) {
        case "name": {
          const avatarSrc = user.avatarUrl;
          if (avatarSrc && avatarSrc.startsWith("http")) {
            return (
              <div className="flex items-center gap-4">
                <Image
                  src={encodeURI(avatarSrc)}
                  alt={user.fullName || user.email}
                  className="h-10 w-10 rounded-full object-cover"
                  width={50}
                  height={50}
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-1xl font-medium truncate">
                    {user.fullName || user.email}
                  </span>
                  <span className="text-1xl text-default-400 truncate">
                    {user.email}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <User
              avatarProps={{ radius: "lg", src: avatarSrc }}
              description={user.email}
              name={user.fullName || user.email}
            >
              {user.email}
            </User>
          );
        }
        case "role":
          return (
            <div className="flex flex-col">
              <span className="text-1xl font-medium">
                {user.roleName ?? "—"}
              </span>
            </div>
          );
        case "actions":
          return (
            <div className="flex items-center gap-3 justify-center">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        case "status":
          return (
            <div className="flex items-center justify-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-white">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-300" />
                <span>Active</span>
              </span>
            </div>
          );
        default:
          return null;
      }
    },
    []
  );

  const colsCount = columns.length;

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative w-full sm:w-[60%]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 da">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="11" cy="11" r={6} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>

              <Input
                value={query}
                onChange={(e) => setQuery((e as React.ChangeEvent<HTMLInputElement>).target.value)}
                placeholder="Search users by name or email..."
                className="w-full pl-10 pr-12 h-11 rounded-lg dark:bg-slate-900"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                type="button"
                onClick={() => setActiveTab("all")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`cursor-pointer text-1xl font-bold relative overflow-visible px-3 py-1.5 rounded-full transition-colors duration-150 ${
                  activeTab === "all" ? "text-gray-900" : "text-gray-600"
                }`}
              >
                <AnimatePresence initial={false}>
                  {activeTab === "all" && (
                    <motion.span
                      layoutId="tab-pill"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      className="absolute inset-0 rounded-full bg-gray-100 z-0 "
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">All</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => setActiveTab("renter")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`cursor-pointer relative overflow-visible px-3 py-1.5 rounded-full text-1xl font-bold transition-colors duration-150 ${
                  activeTab === "renter" ? "text-emerald-900" : "text-gray-600"
                }`}
              >
                <AnimatePresence initial={false}>
                  {activeTab === "renter" && (
                    <motion.span
                      layoutId="tab-pill"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      className="cursor-pointer absolute inset-0 rounded-full bg-emerald-100 z-0 text-1xl font-bold"
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">Renter</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => setActiveTab("staff")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`cursor-pointer relative overflow-visible px-3 py-1.5 rounded-full text-1xl font-bold transition-colors duration-150 ${
                  activeTab === "staff" ? "text-sky-900" : "text-gray-600"
                }`}
              >
                <AnimatePresence initial={false}>
                  {activeTab === "staff" && (
                    <motion.span
                      layoutId="tab-pill"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      className="absolute inset-0 rounded-full bg-sky-100 z-0"
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">Staff</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => setActiveTab("admin")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`cursor-pointer text-1xl font-bold relative overflow-visible px-3 py-1.5 rounded-full transition-colors duration-150 ${
                  activeTab === "admin" ? "text-rose-900" : "text-gray-600"
                }`}
              >
                <AnimatePresence initial={false}>
                  {activeTab === "admin" && (
                    <motion.span
                      layoutId="tab-pill"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      className="absolute inset-0 rounded-full bg-rose-100 z-0"
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">Admin</span>
              </motion.button>
            </div>
          </div>
        </div>
        <div className="w-full bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Tổng:{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-500">
                  {users.length}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <Table
              className="w-full border-collapse"
              aria-label="Users table with API"
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={
                      column.uid === "actions" || column.uid === "status"
                        ? "center"
                        : "start"
                    }
                  >
                    <span className="block text-xs tracking-wider uppercase text-gray-600 dark:text-gray-300 px-4 py-3 bg-gray-50 dark:bg-transparent">
                      {column.name}
                    </span>
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody
                items={loading || error || users.length === 0 ? [null] : users}
              >
                {(item: ApiUser | null) => {
                  if (loading) {
                    return (
                      <TableRow key="loading" className="h-16">
                        <TableCell colSpan={colsCount}>
                          <div className="w-full flex items-center justify-center py-8">
                            <Spinner size="md" />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  }
                  if (error) {
                    return (
                      <TableRow key="error" className="h-16">
                        <TableCell colSpan={colsCount}>
                          <span className="text-red-500">{error}</span>
                        </TableCell>
                      </TableRow>
                    );
                  }
                  if (users.length === 0) {
                    return (
                      <TableRow key="empty" className="h-16">
                        <TableCell colSpan={colsCount}>
                          <span className="text-gray-400">
                            Không có người dùng
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  }

                  const user = item as ApiUser;
                  return (
                    <TableRow
                      key={user.id}
                      className="h-16 hover:bg-gray-50 dark:hover:bg-slate-800"
                    >
                      {(columnKey) => (
                        <TableCell className="align-middle py-4 px-4">
                          {renderCell(user, String(columnKey))}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                }}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
