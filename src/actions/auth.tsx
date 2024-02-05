"use server";

export async function LogInUser(formData: FormData) {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  console.log("action!");
}
