"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { deleteProfile } from "@/actions/profile";
import { useRouter } from "@/libs/navigation";
import { useProfile } from "@/store/ProfileProvider";
import Button from "@/components/buttons/Button";
import ConfirmationDialog from "@/components/modals/ConfirmationDialog";

export default function DeleteProfileForm() {
  const t = useTranslations("profile");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const profile = useProfile()((state) => state.profile);
  const router = useRouter();

  const handleDeleteProfile = async () => {
    setLoading(true);
    try {
      await deleteProfile(profile?.id);
      router.replace("/");
    } catch (error) {
      console.error("Error deleting profile:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <p className="mb-4">{t("deleteProfileWarning")}</p>

      <Button
        isSubmitting={loading}
        onClick={() => setIsDialogOpen(true)}
        buttonType="alert"
        className="p-2"
      >
        {t("deleteProfile")}
      </Button>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDeleteProfile}
        title={t("deleteProfileConfrmationTitle")}
        message={t("deleteProfileConfrmation")}
      />
    </>
  );
}
