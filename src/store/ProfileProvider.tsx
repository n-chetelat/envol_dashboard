"use client";

import React, { useState, createContext, useContext } from "react";
import { create } from "zustand";
import { ProfileWithProfileTypes } from "@/libs/types";

type ProfileStoreCreateProps = {
  profile: ProfileWithProfileTypes;
  setProfile: (profile: ProfileWithProfileTypes) => void;
};

const createStore = (profile: ProfileWithProfileTypes) => {
  return create<ProfileStoreCreateProps>((set) => {
    return {
      profile,
      setProfile(profile: ProfileWithProfileTypes) {
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
  profile: ProfileWithProfileTypes;
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createStore(profile));
  return (
    <ProfileContext.Provider value={store}>{children}</ProfileContext.Provider>
  );
};
