"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { serverWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../user-avatar";

export const MembersModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const { server } = data as { server: serverWithMembersWithProfiles };

  const isModalOpen = isOpen && type === "members";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Gerenciar Membros
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            {server?.members?.length} membros
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar
                src={member.profile.imageUrl}
                alt={`${member.name} image`}
              />
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
