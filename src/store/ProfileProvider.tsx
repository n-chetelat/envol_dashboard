"use client";

import React, { useState, createContext, useContext } from "react";
import { create } from "zustand";
import { Profile } from "@/libs/types";

type ProfileStoreCreateProps = {
  profile: Profile;
  setProfile: (profile: Profile) => void;
};

const createStore = (profile: Profile) => {
  return create<ProfileStoreCreateProps>((set) => {
    return {
      profile,
      setProfile(profile: Profile) {
        set({ profile });
      },
    };
  });
};

const ProfileContext = createContext<ReturnType<typeof createStore> | null>(
  null,
);

export const useProfile = () => {
  if (!ProfileContext) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return useContext(ProfileContext)!;
};

export const ProfileProvider = ({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createStore(profile));
  return (
    <ProfileContext.Provider value={store}>{children}</ProfileContext.Provider>
  );
};
