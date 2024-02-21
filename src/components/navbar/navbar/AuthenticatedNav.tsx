"use client";

import { useState, useEffect } from "react";
import { User } from "firebase/auth";

type AuthenticatedNavProps = {
  children: React.ReactNode;
  currentUser: User | null;
};

export default function AuthenticatedNav({
  children,
  currentUser,
}: AuthenticatedNavProps) {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [currentUser]);

  return <>{show ? <div>{children}</div> : null}</>;
}
