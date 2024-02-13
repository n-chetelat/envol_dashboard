"use client";
import { Button } from "@mui/material";
import { logout } from "@/actions/auth";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button variant="contained" onClick={handleLogout}>
      Log Out
    </Button>
  );
}
