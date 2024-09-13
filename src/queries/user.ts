"use server";

import { currentUser, clerkClient } from "@clerk/nextjs/server";

export async function addSecondaryEmail(newEmail: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    // Check if the email already exists
    const existingEmails = user.emailAddresses.map((e) => e.emailAddress);
    if (existingEmails.includes(newEmail)) {
      throw new Error("Email already exists");
    }

    // Add the new email
    await clerkClient.emailAddresses.createEmailAddress({
      userId: user.id,
      emailAddress: newEmail,
      primary: false,
      verified: false,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to add secondary email:", error);
    throw error;
  }
}
