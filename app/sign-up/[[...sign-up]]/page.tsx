import { SignUp } from "@clerk/nextjs";
 import { dark } from '@clerk/ui/themes'

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp
        appearance={{
          theme: dark,
          
          elements: {
            formButtonPrimary: "bg-red text-white hover:bg-gray-800",
          },
        }}
      />
    </div>
  );
}
