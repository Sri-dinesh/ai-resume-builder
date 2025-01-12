"use client";

import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

interface CreateResumeButtonProps {
  canCreate: boolean | number | "";
}

export default function CreateResumeButton({
  canCreate,
}: CreateResumeButtonProps) {
  const premiumModal = usePremiumModal();

  const isCreatable = Boolean(canCreate); // Convert to boolean here

  if (isCreatable) {
    return (
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New resume
        </Link>
      </Button>
    );
  }

  // if (canCreate) {
  //   return (
  //     <Button asChild className="mx-auto flex w-fit gap-2">
  //       <Link href="/editor">
  //         <PlusSquare className="size-5" />
  //         New resume
  //       </Link>
  //     </Button>
  //   );
  // }

  return (
    <Button
      onClick={() => premiumModal.setOpen(true)}
      className="mx-auto flex w-fit gap-2"
    >
      <PlusSquare className="size-5" />
      New resume
    </Button>
  );
}
