import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center py-24">
      <SignUp
        signInUrl={"/sign-in"}
        appearance={{
          variables: {
            colorPrimary: "#39316D",
            borderRadius: "0",
          },
        }}
      />
    </div>
  );
}
