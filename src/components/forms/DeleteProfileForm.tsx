"use client";
import { useState } from "react";
import Button from "@/components/forms/Button";
import { useTranslations } from "next-intl";
import { deleteProfile } from "@/queries/profile";
import { useProfile } from "@/store/ProfileProvider";
import { useRouter } from "@/libs/navigation";
import { useClerk } from "@clerk/nextjs";

export default function DeleteProfileForm() {
  const t = useTranslations("profile");
  const [loading, setLoading] = useState(false);
  const profile = useProfile()((state) => state.profile);
  const router = useRouter();
  const { signOut } = useClerk();

  const handleDeleteProfile = async () => {
    setLoading(true);
    await deleteProfile(profile?.id);
    // TODO send a request to delete the user
    setLoading(false);
    signOut();
  };

  return (
    <>
      <p className="mb-4">
        Clicking this button will delete your profile from Envol and all of your
        information. This action is irreversible.
      </p>

      <Button
        isValid={true}
        isSubmitting={loading}
        onClick={handleDeleteProfile}
        buttonType="alert"
        className="p-2"
      >
        {t("deleteProfile")}
      </Button>
    </>
  );
}
