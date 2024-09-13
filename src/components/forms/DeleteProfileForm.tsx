"use client";
import { useState } from "react";
import Button from "@/components/forms/Button";
import ConfirmationDialog from "@/components/modals/ConfirmationDialog";
import { useTranslations } from "next-intl";
import { deleteProfile } from "@/queries/profile";
import { useProfile } from "@/store/ProfileProvider";
import { useRouter } from "@/libs/navigation";

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
