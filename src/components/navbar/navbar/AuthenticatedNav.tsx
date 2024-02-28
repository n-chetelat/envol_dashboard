"use client";

import { useSession } from "next-auth/react";

type AuthenticatedNavProps = {
  children: React.ReactNode;
};

export default function AuthenticatedNav({ children }: AuthenticatedNavProps) {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <div>
          {children}
          <p>Signed in as {session?.user?.email}</p>
        </div>
      ) : (
        "No user"
      )}
    </>
  );
}
