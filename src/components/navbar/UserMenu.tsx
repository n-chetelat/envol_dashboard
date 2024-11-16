"use client";

import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { useClerk } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { LogOut } from "@/libs/icons";

export default function UserMenu() {
  const t = useTranslations("home");
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Menu as={Fragment}>
      <MenuButton className="inline-flex justify-center rounded-full focus:outline-none">
        <div className="rounded-full border-4 border-lilac-dark transition-colors duration-200 hover:border-violet">
          <Image
            src={"/default-avatar.svg"}
            alt="User avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-1 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg">
          <div className="p-1">
            <MenuItem key="userMenu-signOut">
              {({ focus }) => (
                <button
                  className={`${
                    focus ? "bg-violet text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md p-2 text-sm`}
                  onClick={handleSignOut}
                >
                  <LogOut
                    className={`${
                      focus ? "text-white" : "text-gray-500"
                    } mr-2 h-5 w-5`}
                    aria-hidden="true"
                  />
                  {t("signOut")}
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
