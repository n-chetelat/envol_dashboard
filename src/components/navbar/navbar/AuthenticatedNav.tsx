"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

type AuthenticatedNavProps = {
  children: React.ReactNode;
};

export default function AuthenticatedNav({ children }: AuthenticatedNavProps) {
  const [show, setShow] = useState<boolean>(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [currentUser]);

  return (
    <>
      {show ? (
        <div>
          {children}
          <p>{`${currentUser?.email}`}</p>
        </div>
      ) : (
        "No user"
      )}
    </>
  );
}
