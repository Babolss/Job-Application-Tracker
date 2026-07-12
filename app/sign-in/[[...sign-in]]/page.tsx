import { SignIn } from "@clerk/nextjs";
 import { neobrutalism } from '@clerk/ui/themes'

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn
        appearance={{
          theme: neobrutalism,
          
        }}
      />
    </div>
  );
}