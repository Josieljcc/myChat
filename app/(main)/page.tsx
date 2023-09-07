import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-full flex items-center justify-center">
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  );
}
